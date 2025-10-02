# 🚗💨 TrafficWise AI - TomTom Integration Setup Guide

## Overview
This guide walks you through setting up TomTom API integration for real-time traffic data in your TrafficWise AI application.

## 🔧 Quick Setup (You're Almost There!)

### 1. Backend Setup

#### Install Dependencies
```bash
cd fullstack-app/backend
pip install -r requirements.txt
```

#### Configure Environment
Your TomTom API key is already configured in `.env.local`:
```bash
TOMTOM_API_KEY=itaP2OCG0L5DTAbMkdFhRXh0yhHfWgqU
```

#### Start Backend Server
```bash
# From the backend directory
python main.py

# Or with uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: `http://localhost:8000`

### 2. Frontend Setup

#### Install Dependencies
```bash
cd fullstack-app/frontend
npm install
```

#### Configure Environment
Copy the environment template and add your TomTom API key:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_TOMTOM_API_KEY=itaP2OCG0L5DTAbMkdFhRXh0yhHfWgqU
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

#### Start Frontend Server
```bash
npm run dev
```

The frontend will be available at: `http://localhost:3000`

## 🌟 Features Implemented

### Backend Features
- ✅ **Real-time Traffic Flow**: Get current traffic speeds and conditions for Pakistani cities
- ✅ **Traffic Incidents**: Monitor accidents, road closures, and construction
- ✅ **Route Planning**: Calculate routes with real-time traffic delays
- ✅ **Place Search**: Find locations within Pakistani cities
- ✅ **Dashboard API**: Comprehensive traffic overview for each city

### Frontend Features
- ✅ **Interactive Maps**: Enhanced map component with TomTom integration
- ✅ **Real-time Updates**: Auto-refreshing traffic data every 5 minutes
- ✅ **Traffic Visualization**: Color-coded traffic levels and incident markers
- ✅ **Pakistani Cities**: Full support for 15 major Pakistani cities
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile

## 🎯 Available API Endpoints

### Backend Endpoints
```
GET  /                           - Health check
GET  /health                     - Detailed health status
GET  /api/traffic/cities         - Get supported Pakistani cities
GET  /api/traffic/flow/{city}    - Get real-time traffic flow
GET  /api/traffic/incidents/{city} - Get traffic incidents
GET  /api/traffic/route          - Get route with traffic
GET  /api/traffic/search         - Search places in cities
GET  /api/traffic/dashboard/{city} - Complete traffic dashboard
```

### Example API Usage
```bash
# Get traffic flow for Karachi
curl http://localhost:8000/api/traffic/flow/Karachi

# Get traffic incidents for Lahore
curl http://localhost:8000/api/traffic/incidents/Lahore

# Get route from Karachi to Lahore
curl "http://localhost:8000/api/traffic/route?origin=24.8607,67.0011&destination=31.5204,74.3587"
```

## 🗺️ Supported Pakistani Cities

- **Major Cities**: Karachi, Lahore, Islamabad, Rawalpindi
- **Provincial Capitals**: Peshawar, Quetta  
- **Industrial Centers**: Faisalabad, Sialkot, Gujranwala
- **Regional Hubs**: Multan, Hyderabad, Bahawalpur, Sargodha, Sukkur, Larkana

## 🔍 Testing the Integration

### 1. Test Backend API
```bash
# Check if backend is running
curl http://localhost:8000/health

# Get supported cities
curl http://localhost:8000/api/traffic/cities

# Test traffic flow for Karachi
curl http://localhost:8000/api/traffic/flow/Karachi
```

### 2. Test Frontend
1. Open `http://localhost:3000/map`
2. Select different Pakistani cities from the dropdown
3. Toggle traffic layer to see real-time data
4. Check for live data indicators and incident markers

## 🚨 Troubleshooting

### Common Issues

#### Backend Issues
1. **TomTom API errors**: Verify your API key is correct and has sufficient quota
2. **CORS errors**: Check that frontend URL is in allowed origins
3. **Import errors**: Ensure all dependencies are installed with `pip install -r requirements.txt`

#### Frontend Issues
1. **Environment variables**: Make sure `.env.local` exists with correct values
2. **API connection**: Verify backend is running on `http://localhost:8000`
3. **Build errors**: Try `npm run build` to check for TypeScript errors

### Debugging Commands
```bash
# Check backend logs
python main.py

# Check frontend logs
npm run dev

# Test TomTom API directly
curl "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=YOUR_API_KEY&point=24.8607,67.0011"
```

## 📊 Performance Optimization

### Backend Optimizations
- ✅ Async HTTP requests for TomTom API calls
- ✅ Concurrent data fetching for multiple cities
- ✅ Error handling and fallback responses
- ✅ Request timeout configuration (30 seconds)

### Frontend Optimizations
- ✅ Auto-refresh intervals (5 minutes) to prevent API quota exhaustion
- ✅ Loading states and error handling
- ✅ Cached city coordinates to reduce API calls
- ✅ Responsive design for optimal mobile experience

## 🔐 Security Considerations

### API Key Management
- ✅ Backend API key stored in environment variables
- ✅ Frontend public key for client-side maps (if needed)
- ⚠️ **Note**: TomTom API key is included in frontend bundles - consider backend-only calls for production

### Rate Limiting
- TomTom free tier: 2,500 requests/day
- Production recommendation: Implement caching and request pooling

## 🚀 Deployment Considerations

### Backend Deployment
```bash
# Production environment variables
ENVIRONMENT=production
TOMTOM_API_KEY=your_production_key
HOST=0.0.0.0
PORT=8000
```

### Frontend Deployment
```bash
# Production build
npm run build
npm start

# Environment variables for production
NEXT_PUBLIC_TOMTOM_API_KEY=your_production_key
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_ENVIRONMENT=production
```

## 🎉 Next Steps

1. **Test the Integration**: Start both servers and test the map page
2. **Customize Features**: Add more Pakistani cities or enhance the UI
3. **Monitor Usage**: Track TomTom API usage to stay within limits
4. **Scale Up**: Consider upgrading TomTom plan for production use

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify API keys and environment configuration
3. Test individual endpoints with curl commands
4. Check TomTom API documentation for specific error codes

---

**Happy mapping! 🚗🇵🇰**