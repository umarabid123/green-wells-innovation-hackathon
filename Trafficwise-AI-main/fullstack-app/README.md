# TrafficWise AI - Full Stack Application

A comprehensive traffic management and urban planning solution for Pakistani cities, converted from Streamlit to a full-stack architecture.

## 🏛️ Architecture

- **Frontend**: Next.js 14 (React) with TypeScript and TailwindCSS
- **Backend**: FastAPI (Python) with async support
- **Optional Server**: Node.js for additional server-side functionality
- **AI Services**: Google Gemini API, OpenAI API, Local RAG, Offline Mode
- **Maps**: Leaflet with OpenStreetMap for interactive traffic visualization

## 📁 Project Structure

```
fullstack-app/
├── frontend/          # Next.js React application
│   ├── src/
│   │   ├── app/       # Next.js App Router
│   │   ├── components/ # React components
│   │   ├── services/  # API services
│   │   ├── types/     # TypeScript definitions
│   │   └── lib/       # Utilities
│   ├── package.json
│   └── README.md
├── backend/           # FastAPI Python backend
│   ├── main.py        # FastAPI app entry point
│   ├── models/        # Pydantic models
│   ├── services/      # Business logic
│   ├── requirements.txt
│   └── README.md
├── nodejs-server/     # Optional Node.js server
├── start-dev.sh       # Unix development startup script
├── start-dev.bat      # Windows development startup script
└── README.md         # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

#### Windows
```cmd
# Double-click or run in command prompt
start-dev.bat
```

#### Linux/Mac
```bash
# Make executable and run
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Manual Setup

#### Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## 🌟 Features

### 🤖 AI-Powered Chat Interface
- **Multiple AI Services**: 
  - Google Gemini API (free tier available)
  - OpenAI API (subscription required)
  - Local RAG (simulation mode)
  - Offline Mode (rule-based responses)
- **Pakistani Context**: Specialized responses for local traffic conditions
- **Real-time Responses**: Instant AI-powered traffic advice
- **Chat History**: Session-based conversation memory

### 🗺️ Interactive Traffic Map
- **Real-time Data**: Live traffic visualization for major Pakistani cities
- **Color-coded Markers**: Traffic levels from light to very heavy
- **Detailed Popups**: City-specific information, peak hours, alternative routes
- **Highway Visualization**: Major motorways and highways displayed
- **Mobile Responsive**: Works on all device sizes

### ⚙️ Advanced Configuration
- **AI Service Selection**: Easy switching between AI providers
- **API Key Management**: Secure key input with validation
- **Model Selection**: Choose from available AI models
- **Temperature Control**: Adjust AI response creativity (0.0-1.0)
- **Map Toggle**: Show/hide interactive elements

### 📱 Modern UI/UX
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **TailwindCSS**: Modern, utility-first styling
- **TypeScript**: Full type safety and developer experience
- **Loading States**: Smooth user experience with progress indicators
- **Error Handling**: Comprehensive error messages and recovery

## 🛣️ Pakistani Cities & Routes

### Major Cities Coverage
- **Karachi** - Economic hub with complex traffic patterns
- **Lahore** - Cultural capital with heritage area considerations
- **Islamabad** - Well-planned capital with government zone traffic
- **Rawalpindi** - Twin city integration and commercial areas
- **Faisalabad** - Industrial center with textile district focus
- **Peshawar** - Historic city with old town navigation challenges
- **Multan** - Regional center with manageable traffic flow

### Highway Systems
- **Motorways**: M-1 (Islamabad-Peshawar), M-2 (Islamabad-Lahore), M-3, M-4
- **National Highways**: N-5 (Grand Trunk Road), N-25, N-35
- **Regional Routes**: Provincial highways and connecting roads
- **Urban Networks**: City-specific route optimization

### Traffic Intelligence
- **Peak Hour Analysis**: Morning (7-9 AM), Evening (5-7 PM), Friday prayers
- **Weather Impact**: Monsoon season, winter fog, summer heat considerations
- **Cultural Events**: Religious holidays, wedding seasons, festivals
- **Real-time Updates**: Current conditions and alternative suggestions

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
# Google Gemini API (optional - users can provide via frontend)
GOOGLE_GEMINI_API_KEY=your_gemini_key

# OpenAI API (optional - users can provide via frontend)
OPENAI_API_KEY=your_openai_key

# FastAPI Configuration
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
FASTAPI_RELOAD=true

# CORS Origins
CORS_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000"]
```

#### Frontend (.env.local)
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=false
```

## 📊 API Endpoints

### Health & Status
- `GET /` - Basic health check
- `GET /health` - Detailed system status

### AI Chat Services
- `POST /chat` - Send message to AI service
  ```json
  {
    "message": "Best route from Lahore to Islamabad?",
    "service_type": "google_gemini",
    "api_key": "optional_api_key",
    "config": {
      "model": "gemini-1.5-flash",
      "temperature": 0.7
    }
  }
  ```

### Traffic Data
- `GET /traffic/cities` - Get all Pakistani cities traffic data
- `POST /traffic/route` - Get route suggestions between cities
- `GET /traffic/highways` - Get major highway information

### Configuration
- `POST /config/ai` - Save AI service configuration
- `GET /config/ai` - Get current AI configuration

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Install test dependencies (if added)
pip install pytest pytest-asyncio

# Run tests (when implemented)
pytest

# Test specific endpoints
python -m pytest tests/test_api.py -v
```

### Frontend Testing
```bash
cd frontend
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Manual Testing Checklist

#### ✅ AI Services
- [ ] Google Gemini API with valid key works
- [ ] OpenAI API with valid key works  
- [ ] Local RAG returns simulated responses
- [ ] Offline mode works without internet
- [ ] Error handling for invalid API keys
- [ ] Temperature slider affects response variation

#### ✅ Chat Interface
- [ ] Messages send and receive properly
- [ ] Loading states display during API calls
- [ ] Chat history maintains during session
- [ ] Clear chat functionality works
- [ ] Quick suggestion buttons work
- [ ] Message formatting displays correctly

#### ✅ Traffic Map
- [ ] Map loads with Pakistani cities
- [ ] City markers show correct traffic levels
- [ ] Popups display detailed city information
- [ ] Highway routes are visible
- [ ] Map is responsive on mobile devices
- [ ] Legend shows traffic level meanings

#### ✅ Configuration
- [ ] AI service switching works
- [ ] API key input validates properly
- [ ] Model selection updates for Gemini
- [ ] Temperature slider updates values
- [ ] Map toggle shows/hides map
- [ ] Settings persist during session

#### ✅ Responsive Design
- [ ] Mobile layout works on phones
- [ ] Tablet layout adapts properly
- [ ] Desktop layout utilizes space well
- [ ] Navigation works on all screen sizes
- [ ] Text remains readable on all devices

## 🚀 Deployment

### Development
```bash
# Backend
cd backend && uvicorn main:app --reload

# Frontend  
cd frontend && npm run dev
```

### Production

#### Docker Deployment
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - FASTAPI_HOST=0.0.0.0
      - FASTAPI_PORT=8000
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend
```

#### Cloud Deployment

**Backend (Railway/Heroku/DigitalOcean)**
```bash
# Install dependencies and start
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Frontend (Vercel/Netlify)**
```bash
# Build and deploy
npm run build
npm run start
```

### Environment-Specific Configuration

#### Development
- CORS allows localhost origins
- Debug logging enabled
- Hot reload for rapid development

#### Production
- Restricted CORS origins
- Optimized builds
- Error logging and monitoring
- HTTPS enforcement

## 🔒 Security

### API Key Management
- Keys stored only in browser session
- Never persisted to local storage
- Server-side validation for external APIs
- No server-side key storage

### Data Privacy
- No user data collection or storage
- Chat history exists only in browser session
- No tracking or analytics by default
- GDPR-compliant design

### Network Security
- HTTPS ready for production
- CORS properly configured
- Input validation on all endpoints
- Request rate limiting (configurable)

## 🎯 Usage Examples

### Chat Queries
```
"What's the fastest route from Karachi to Lahore?"
"How to avoid traffic in Islamabad during peak hours?"
"Public transport options in Rawalpindi?"
"Cost comparison between motorway and GT Road?"
"Weather impact on Peshawar traffic today?"
```

### Route Planning
- Get turn-by-turn directions
- Compare multiple route options
- Estimate travel time and costs
- Find alternative routes during congestion
- Check real-time traffic conditions

### Traffic Analysis
- View city-by-city traffic levels
- Understand peak hour patterns
- Plan travel around cultural events
- Get weather-related traffic advice
- Access emergency contact information

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Follow the Quick Start guide
4. Create a feature branch
5. Make your changes
6. Test thoroughly
7. Submit a pull request

### Code Standards
- **Python**: Follow PEP 8, use type hints
- **TypeScript**: Strict mode enabled, proper typing
- **React**: Functional components with hooks
- **CSS**: TailwindCSS utility classes
- **Documentation**: Update README for new features

### Testing Requirements
- Add tests for new API endpoints
- Test UI components on multiple screen sizes
- Verify accessibility compliance
- Check TypeScript compilation
- Validate API response formats

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check Python version
python --version  # Should be 3.8+

# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### Frontend Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

#### API Connection Issues
- Verify backend is running on port 8000
- Check CORS configuration in backend
- Confirm `NEXT_PUBLIC_API_URL` environment variable
- Test API endpoints directly at http://localhost:8000/docs

#### Map Not Loading
- Check internet connection for tile loading
- Verify Leaflet CSS is included
- Check browser console for JavaScript errors
- Ensure proper map container dimensions

### Performance Issues
- Use browser dev tools to profile performance
- Check network tab for slow API calls
- Monitor memory usage during map interactions
- Consider lazy loading for large datasets

### Debug Mode
Enable debug logging by setting environment variables:
```bash
# Backend
LOG_LEVEL=DEBUG

# Frontend
NEXT_PUBLIC_ENABLE_DEBUG=true
```

## 📈 Future Enhancements

### Planned Features
- [ ] Real-time traffic data integration
- [ ] GPS navigation support
- [ ] Offline map caching
- [ ] Multi-language support (Urdu, English)
- [ ] Voice commands and responses
- [ ] Historical traffic analytics
- [ ] User accounts and preferences
- [ ] Mobile app development

### Technical Improvements
- [ ] Database integration for persistence
- [ ] Advanced caching strategies
- [ ] WebSocket for real-time updates
- [ ] Progressive Web App (PWA) features
- [ ] Advanced AI model fine-tuning
- [ ] Comprehensive test coverage

## 📄 License

See the main project LICENSE file.

## 🙏 Acknowledgments

- **Google Gemini AI** - For advanced AI capabilities
- **OpenStreetMap** - For map data and tiles
- **Pakistani Traffic Authorities** - For traffic pattern insights
- **Open Source Community** - For the amazing tools and libraries

---

**TrafficWise AI** - Making Pakistani traffic smarter, one route at a time! 🚦🇵🇰