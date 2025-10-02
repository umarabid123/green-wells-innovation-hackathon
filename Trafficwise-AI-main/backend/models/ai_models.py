"""
AI service models for request/response handling
"""

from pydantic import BaseModel
from enum import Enum
from typing import Optional

class AIServiceType(str, Enum):
    GOOGLE_GEMINI = "google_gemini"
    OPENAI = "openai"
    LOCAL_RAG = "local_rag"
    OFFLINE = "offline"

class AIConfig(BaseModel):
    service_type: AIServiceType
    model: Optional[str] = "gemini-1.5-flash"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000
    api_key: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    service_type: AIServiceType
    api_key: Optional[str] = None
    config: Optional[AIConfig] = None

class ChatResponse(BaseModel):
    response: str
    service_used: str
    status: str = "success"