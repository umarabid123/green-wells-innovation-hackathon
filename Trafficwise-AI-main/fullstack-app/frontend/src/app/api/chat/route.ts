import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Enhanced system prompt for TrafficWise AI
const SYSTEM_PROMPT = `You are TrafficWise AI, an expert in traffic and urban planning for Pakistan. 
Always answer in short, clear, actionable points with emojis. 
Use Markdown formatting for lists and emphasis. 
Limit answers to 4–6 bullet points unless the user explicitly asks for more detail.

Guidelines:
- Focus on Pakistani cities (Karachi, Lahore, Islamabad, Faisalabad, Rawalpindi, etc.)
- Use **bold** for important information
- Use bullet points (-) for lists
- Include relevant emojis for better readability
- Keep responses concise and actionable
- Provide specific timing advice when relevant
- Mention alternative routes when possible
- Consider local traffic patterns and rush hours

Format your responses with:
- Clear headings (# for main topics)
- Bullet points for key information
- Bold text for emphasis
- Emojis for visual appeal

Always structure responses clearly and avoid long paragraphs.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, api_key } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Try to use OpenAI if API key is provided
    if (api_key) {
      try {
        const openai = new OpenAI({
          apiKey: api_key,
        });

        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        return NextResponse.json({
          response: response,
          service: 'openai'
        });
      } catch (openaiError) {
        console.error('OpenAI API Error:', openaiError);
        // Fall back to local response
        return getLocalResponse(message);
      }
    }

    // Fall back to local response if no API key
    return getLocalResponse(message);

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getLocalResponse(message: string): NextResponse {
  const lowerMessage = message.toLowerCase();
  
  // Enhanced local responses with markdown formatting
  if (lowerMessage.includes('lahore') || lowerMessage.includes('karachi') || lowerMessage.includes('islamabad')) {
    const cityResponses = {
      lahore: `# 🚦 Lahore Traffic Update

**Current Conditions**: Moderate traffic on main routes

- **🛣️ Best Routes**: Ring Road for faster cross-city travel
- **⏰ Peak Hours**: 8-10 AM and 5-7 PM (avoid if possible)  
- **🚗 Alternative Routes**: Canal Road, Jail Road during rush
- **💡 Pro Tip**: Use Waze/Google Maps for real-time updates
- **🅿️ Parking**: Main markets get crowded after 6 PM`,

      karachi: `# 🌊 Karachi Traffic Update

**Current Conditions**: Heavy traffic on major arteries

- **🚨 Avoid**: Shahrah-e-Faisal during 7-10 AM
- **✅ Better Options**: Clifton Bridge, Northern Bypass
- **⏰ Rush Hours**: 8-11 AM and 4-8 PM
- **🛣️ Alternative**: Use Lyari Expressway for north-south travel
- **💰 Fuel Tip**: Plan routes to avoid frequent stops`,

      islamabad: `# 🏛️ Islamabad Traffic Update

**Current Conditions**: Light to moderate traffic

- **🚗 Main Routes**: Expressway and Kashmir Highway
- **✅ Traffic Flow**: Generally smooth outside peak hours
- **⏰ Peak Times**: 8-9 AM and 5-6 PM (government offices)
- **🅿️ Parking**: Centaurus, F-6/7 markets can be busy
- **🌧️ Weather Alert**: Rain causes significant delays`
    };

    for (const [city, response] of Object.entries(cityResponses)) {
      if (lowerMessage.includes(city)) {
        return NextResponse.json({
          response: response,
          service: 'local'
        });
      }
    }
  }
  
  if (lowerMessage.includes('route') || lowerMessage.includes('best way') || lowerMessage.includes('fastest')) {
    return NextResponse.json({
      response: `# 🛣️ Route Planning Guide

**Smart Route Selection**:

- **📱 Check Apps**: Waze, Google Maps for live traffic
- **⏰ Time Strategy**: Leave 30 min earlier/later to avoid rush
- **🌦️ Weather Factor**: Rain increases travel time by 30%
- **🚗 Alternative Routes**: Always have 2-3 backup options
- **💡 Local Knowledge**: Ask locals about shortcuts

**Which specific route do you need help with?**`,
      service: 'local'
    });
  }
  
  if (lowerMessage.includes('traffic') || lowerMessage.includes('congestion') || lowerMessage.includes('jam')) {
    return NextResponse.json({
      response: `# 🚥 Traffic Management Tips

**Peak Traffic Hours in Pakistan**:

- **🌅 Morning Rush**: 7:30-10:00 AM
- **🌆 Evening Rush**: 4:30-8:00 PM  
- **✅ Best Times**: 10 AM-4 PM, after 8 PM
- **📅 Weekends**: Shopping areas busy 4-10 PM
- **🌧️ Rainy Days**: Add 30-50% extra travel time

**💡 Which city or route needs traffic advice?**`,
      service: 'local'
    });
  }

  // Default response
  return NextResponse.json({
    response: `# 🤖 TrafficWise AI Assistant

**I can help you with**:

- **🚦 Traffic Conditions** - Real-time status updates
- **🛣️ Route Planning** - Best paths and alternatives  
- **⏰ Timing Advice** - When to travel for less traffic
- **🅿️ Parking Tips** - Finding spots in busy areas
- **🚌 Public Transport** - Alternative travel options

**💡 Try asking**: *"What's the traffic like in Lahore?"* or *"Best route from Karachi to Airport?"*

*Configure OpenAI API key in settings for enhanced responses.*`,
    service: 'local'
  });
}