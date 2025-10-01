# TrafficWise AI - FastAPI Backend

A Python FastAPI backend for the TrafficWise AI application, providing traffic data and AI chat services for Pakistani cities.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Clone and navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment** (recommended)
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Environment setup**
```bash
# Copy environment template
copy .env.example .env
# Edit .env file with your API keys (optional)
```

5. **Run the server**
```bash
uvicorn main:app --reload
```

The API will be available at:
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **Alternative docs**: http://localhost:8000/redoc

## 📚 API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check

### Chat AI
- `POST /chat` - Chat with AI services (Gemini, OpenAI, Local RAG, Offline)

### Traffic Data
- `GET /traffic/cities` - Get all Pakistani cities traffic data
- `POST /traffic/route` - Get route suggestions between cities
- `GET /traffic/highways` - Get major highway information

### Configuration
- `POST /config/ai` - Save AI service configuration
- `GET /config/ai` - Get current AI configuration

## 🤖 AI Services

### Google Gemini API
- **Models**: gemini-1.5-flash, gemini-1.5-pro, gemini-pro
- **Features**: Fast responses, Pakistan-specific context
- **API Key**: Required (get from https://aistudio.google.com)

### OpenAI API
- **Models**: gpt-3.5-turbo
- **Features**: High-quality responses
- **API Key**: Required (get from https://platform.openai.com)

### Local RAG
- **Features**: Local knowledge base simulation
- **API Key**: Not required
- **Status**: Simulation mode (can be extended with vector databases)

### Offline Mode
- **Features**: Rule-based responses
- **API Key**: Not required
- **Coverage**: Pakistani traffic patterns, routes, public transport

## 🏙️ Pakistani Cities Coverage

- **Karachi** - Economic hub with heavy traffic
- **Lahore** - Cultural capital with peak hour congestion  
- **Islamabad** - Well-planned capital with moderate traffic
- **Rawalpindi** - Twin city with commercial congestion
- **Faisalabad** - Industrial center with textile area traffic
- **Peshawar** - Historic city with old town congestion
- **Multan** - Manageable traffic flow

## 🛣️ Highway Systems

- **Motorways**: M-1 (Islamabad-Peshawar), M-2 (Islamabad-Lahore)
- **National Highways**: N-5, N-25, N-35
- **Historic Routes**: Grand Trunk Road

## 📊 Request/Response Examples

### Chat Request
```json
{
  "message": "Best route from Lahore to Islamabad during peak hours?",
  "service_type": "google_gemini",
  "api_key": "your-api-key",
  "config": {
    "model": "gemini-1.5-flash",
    "temperature": 0.7
  }
}
```

### Route Request
```json
{
  "from_city": "Lahore",
  "to_city": "Islamabad", 
  "avoid_congestion": true
}
```

## 🔧 Development

### Project Structure
```
backend/
├── main.py              # FastAPI app entry point
├── models/              # Pydantic models
│   ├── ai_models.py     # AI service models
│   └── traffic_models.py # Traffic data models
├── services/            # Business logic
│   ├── ai_services.py   # AI service handlers
│   └── traffic_service.py # Traffic data service
├── requirements.txt     # Python dependencies
├── .env.example        # Environment template
└── README.md           # This file
```

### Adding New AI Services
1. Add service type to `AIServiceType` enum in `models/ai_models.py`
2. Implement service handler in `services/ai_services.py`
3. Update `get_response` method routing

### Adding New Cities
1. Update `cities_data` in `services/traffic_service.py`
2. Add route mappings if needed
3. Update documentation

## 🚨 Error Handling

The API includes comprehensive error handling:
- **400**: Bad request (missing API keys, invalid parameters)
- **403**: API key issues
- **429**: Rate limiting
- **500**: Server errors

## 🔒 Security

- API keys are not stored server-side
- CORS configured for frontend domains
- Input validation with Pydantic models
- Request timeout protection

## 📈 Performance

- Async/await for non-blocking operations
- Request timeouts (30 seconds)
- Efficient data structures for city/highway data
- Comprehensive logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## 📝 License

See main project LICENSE file.