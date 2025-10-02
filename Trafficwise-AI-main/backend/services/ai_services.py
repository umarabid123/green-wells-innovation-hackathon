"""
AI Services for handling different AI providers
"""

import requests
import json
import asyncio
from typing import Optional
import logging

from models.ai_models import AIServiceType, AIConfig

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.timeout = 30
    
    async def get_response(
        self, 
        message: str, 
        service_type: AIServiceType, 
        api_key: Optional[str] = None,
        config: Optional[AIConfig] = None
    ) -> str:
        """Get AI response based on service type"""
        
        if service_type == AIServiceType.GOOGLE_GEMINI:
            return await self.chat_with_gemini(message, api_key, config)
        elif service_type == AIServiceType.OPENAI:
            return await self.chat_with_openai(message, api_key, config)
        elif service_type == AIServiceType.LOCAL_RAG:
            return await self.local_rag_response(message)
        else:  # OFFLINE
            return await self.offline_traffic_response(message)
    
    async def chat_with_gemini(
        self, 
        user_message: str, 
        api_key: str, 
        config: Optional[AIConfig] = None
    ) -> str:
        """Chat with Google Gemini API"""
        
        model = config.model if config and config.model else "gemini-1.5-flash"
        temperature = config.temperature if config and config.temperature else 0.7
        
        enhanced_prompt = f"""You are a traffic and urban planning expert for Pakistan. Help with the following query: {user_message}

Consider Pakistani context including:
- Local traffic patterns and peak hours (7-9 AM, 5-8 PM)
- Public transport systems (Metro Bus, Orange Line, BRT)
- Weather impacts (monsoon season July-Sept, fog Dec-Feb)
- Cultural and religious events affecting traffic (Friday prayers, Ramadan, Eid)
- Infrastructure challenges and ongoing development projects
- Major cities: Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar
- Highway systems: Motorways (M-1, M-2, M-3), GT Road, National Highways

Provide practical, actionable advice specific to Pakistani traffic conditions.
"""
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": enhanced_prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": temperature,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            },
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        }
        
        headers = {
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=self.timeout)
            
            if response.status_code == 400:
                error_detail = response.json()
                return f"❌ Gemini API Error 400: {error_detail.get('error', {}).get('message', 'Bad request - check your API key and request format')}"
            elif response.status_code == 403:
                return "❌ API Error 403: Invalid API key or insufficient permissions. Please check your Gemini API key."
            elif response.status_code == 429:
                return "❌ Rate Limit: Too many requests. Please wait a moment and try again."
            elif response.status_code == 404:
                return f"❌ Model not found: {model}. Try using 'gemini-pro' or 'gemini-1.5-flash'"
            
            response.raise_for_status()
            response_data = response.json()
            
            if 'candidates' in response_data and len(response_data['candidates']) > 0:
                candidate = response_data['candidates'][0]
                if 'content' in candidate and 'parts' in candidate['content']:
                    return candidate['content']['parts'][0]['text']
                else:
                    return "❌ Unexpected response format from Gemini API"
            else:
                return "❌ No response generated. The content might have been blocked by safety filters."
                
        except requests.exceptions.Timeout:
            return "❌ Request timed out. Please try again."
        except requests.exceptions.RequestException as e:
            return f"❌ Connection Error: {str(e)}"
        except json.JSONDecodeError:
            return "❌ Invalid response format from Gemini API"
        except Exception as e:
            return f"❌ Unexpected Error: {str(e)}"
    
    async def chat_with_openai(
        self, 
        user_message: str, 
        api_key: str, 
        config: Optional[AIConfig] = None
    ) -> str:
        """Chat with OpenAI API"""
        
        temperature = config.temperature if config and config.temperature else 0.7
        max_tokens = config.max_tokens if config and config.max_tokens else 1000
        
        enhanced_prompt = f"""As a traffic and urban planning expert for Pakistan, help with: {user_message}
        
Consider Pakistani context including major cities, traffic patterns, public transport, and cultural factors."""
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": enhanced_prompt}],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=self.timeout
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except Exception as e:
            return f"❌ OpenAI Error: {str(e)}"
    
    async def local_rag_response(self, user_message: str) -> str:
        """Simulate RAG-based response using local knowledge base"""
        
        offline_response = await self.offline_traffic_response(user_message)
        
        return f"""📚 **RAG-Enhanced Response:**

Based on local traffic knowledge base for your query: "{user_message}"

This would typically use:
- Local traffic pattern data
- Historical congestion information  
- Weather impact analysis
- Event-based traffic predictions

**To implement full RAG:**
1. Use vector database (Pinecone, Weaviate)
2. Embed traffic documents with sentence-transformers
3. Retrieve relevant documents
4. Generate response with local LLM

**Current simulation:** Offline rule-based response with Pakistan context.

{offline_response}"""
    
    async def offline_traffic_response(self, user_message: str) -> str:
        """Provide offline traffic responses using rule-based logic"""
        
        user_message_lower = user_message.lower()
        
        # Route suggestions
        if any(word in user_message_lower for word in ['route', 'road', 'path', 'way']):
            return """🛣️ **Route Planning Tips for Pakistan:**

**Major Cities Routes:**
- **Lahore to Islamabad**: Use Motorway M-2 (3.5 hours) - fastest option
- **Karachi to Lahore**: M-9 to M-2 Motorway (18-20 hours) - avoid GT Road
- **Islamabad to Peshawar**: M-1 Motorway (2 hours) - safer than GT Road

**Peak Hours to Avoid:**
- Morning: 7:00-9:30 AM
- Evening: 4:30-7:30 PM
- Friday: 12:00-2:00 PM (Jumma prayers)

**Monsoon Season (July-September):**
- Check weather before traveling
- Avoid underpass areas in Karachi, Lahore
- Keep emergency kit in car"""

        elif any(word in user_message_lower for word in ['congestion', 'traffic jam', 'heavy traffic']):
            return """🚦 **Congestion Management:**

**Most Congested Areas:**
- Karachi: Shahrah-e-Faisal, I.I. Chundrigar Road
- Lahore: Mall Road, Canal Road, Ring Road
- Islamabad: Blue Area, Margalla Road during office hours

**Solutions:**
1. **Use Apps**: Google Maps, Careem for real-time traffic
2. **Alternative Transport**: Metro Bus (Lahore, Rawalpindi, Islamabad)
3. **Time Management**: Travel 30 minutes earlier/later
4. **Carpooling**: Share rides during peak hours"""

        elif any(word in user_message_lower for word in ['public transport', 'metro', 'bus']):
            return """🚌 **Public Transport in Pakistan:**

**Metro Systems:**
- **Lahore**: Orange Line Metro Train + Metro Bus
- **Rawalpindi-Islamabad**: Metro Bus Service
- **Karachi**: Green Line BRT (operational)

**Benefits:**
- Cost-effective (Rs. 15-40 per ride)
- Dedicated lanes avoid traffic
- Air-conditioned comfort
- Environmentally friendly

**Tips:**
- Buy rechargeable cards for convenience
- Avoid peak hours if possible
- Check route maps on official apps"""

        else:
            return """🚦 **TrafficWise Pakistan - General Tips:**

**Smart Travel:**
- Use GPS navigation (Google Maps, Waze)
- Check traffic conditions before leaving
- Keep fuel tank at least half full
- Carry emergency contact numbers

**Safety First:**
- Follow speed limits (120 km/h on motorways)
- Use seat belts always
- Avoid using phone while driving
- Keep vehicle documents updated

**Cultural Considerations:**
- Prayer times affect traffic flow
- Ramadan timings change traffic patterns
- Wedding seasons (winter) increase congestion

How can I help you with specific route or traffic planning?"""