# TrafficWise AI - Next.js Frontend

A modern, responsive React frontend for the TrafficWise AI application, built with Next.js 14, TypeScript, and TailwindCSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running on port 8000 (see backend README)

### Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment setup**
```bash
# Copy environment template
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000 (should be running separately)

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ChatInterface.tsx
│   │   ├── Sidebar.tsx
│   │   └── TrafficMap.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── lib/                # Utilities
├── public/                 # Static files
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 Features

### 🤖 AI Chat Interface
- **Multiple AI Services**: Google Gemini, OpenAI, Local RAG, Offline Mode
- **Real-time Chat**: Instant responses with loading states
- **Message History**: Persistent chat history during session
- **Pakistani Context**: Specialized responses for Pakistani traffic conditions
- **Quick Suggestions**: Pre-built query buttons

### 🗺️ Interactive Traffic Map
- **Live Traffic Data**: Real-time traffic information for Pakistani cities
- **City Markers**: Color-coded traffic levels with detailed popups
- **Highway Routes**: Major motorways and highways visualization
- **Responsive Design**: Works on desktop and mobile devices
- **Leaflet Integration**: High-performance mapping with OpenStreetMap

### ⚙️ Configuration Sidebar
- **AI Service Selection**: Switch between different AI providers
- **API Key Management**: Secure API key input for external services
- **Model Selection**: Choose from available AI models (Gemini Pro/Flash)
- **Temperature Control**: Adjust AI response creativity
- **Map Toggle**: Show/hide interactive map

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Enhanced**: Rich desktop experience with sidebars
- **TailwindCSS**: Modern, utility-first styling
- **Dark Mode Ready**: Prepared for dark mode implementation

## 🌍 Pakistani Cities Coverage

The application provides specialized support for major Pakistani cities:

- **Karachi** - Economic hub with severe congestion management
- **Lahore** - Cultural capital with heritage route considerations  
- **Islamabad** - Well-planned capital with government area traffic
- **Rawalpindi** - Twin city integration with Islamabad
- **Faisalabad** - Industrial center with textile district focus
- **Peshawar** - Historic city with old town navigation
- **Multan** - Regional center with manageable traffic flow

## 🛣️ Traffic Features

### Route Planning
- **Motorway Integration**: M-1, M-2, M-3, M-4 route suggestions
- **Alternative Routes**: Multiple options with time/cost comparison
- **Peak Hour Avoidance**: Smart timing recommendations
- **Toll Calculation**: Cost estimates for motorway travel

### Real-time Information
- **Traffic Levels**: Live congestion data visualization
- **Weather Impact**: Monsoon and fog condition considerations
- **Cultural Events**: Prayer times and festival impact on traffic
- **Emergency Services**: Quick access to emergency numbers

### Public Transport
- **Metro Systems**: Lahore Orange Line, Islamabad Metro Bus
- **BRT Integration**: Karachi Green Line and future expansions
- **Cost Comparison**: Public vs private transport recommendations

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000  # Backend API URL
NEXT_PUBLIC_ENABLE_ANALYTICS=false         # Optional analytics
NEXT_PUBLIC_ENABLE_DEBUG=false             # Debug mode
```

### API Integration
The frontend communicates with the FastAPI backend through:
- **REST API**: Standard HTTP requests with JSON
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Smooth user experience with loading indicators
- **Timeout Management**: 30-second request timeouts

### AI Services Configuration

#### Google Gemini API
- **Models**: gemini-1.5-flash (fast), gemini-1.5-pro (advanced)
- **Rate Limits**: 15 requests/minute, 1M tokens/day (free tier)
- **Setup**: Get API key from https://aistudio.google.com

#### OpenAI API
- **Models**: gpt-3.5-turbo
- **Rate Limits**: Based on subscription plan
- **Setup**: Get API key from https://platform.openai.com

#### Local RAG
- **Features**: Local knowledge base simulation
- **Requirements**: No API key needed
- **Status**: Development simulation mode

#### Offline Mode
- **Features**: Rule-based Pakistani traffic responses
- **Requirements**: No internet connection needed
- **Coverage**: Basic traffic patterns and route suggestions

## 🎯 Usage Examples

### Chat Queries
```
"Best route from Lahore to Islamabad during peak hours?"
"What's the traffic situation in Karachi right now?"
"Public transport options in Rawalpindi?"
"How to avoid congestion on GT Road?"
"Motorway vs National Highway for long distance travel?"
```

### Map Interactions
- Click city markers for detailed traffic information
- View alternative routes and peak hours
- Check highway conditions and toll costs
- Compare different route options

## 🔒 Security & Privacy

- **API Keys**: Stored only in browser session, never persisted
- **HTTPS Ready**: Production configuration for secure connections
- **No User Tracking**: No personal data collection
- **Local Storage**: Only for session preferences

## 📱 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **JavaScript Required**: Application requires JavaScript enabled
- **WebGL Support**: For optimal map performance

## 🚀 Deployment

### Development
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # Code linting
```

### Production Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Static Export
```bash
# For static hosting
npm run build
npm run export
```

## 🧪 Testing

```bash
# Unit tests (when implemented)
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Follow TypeScript and React best practices
4. Test on multiple screen sizes
5. Submit a pull request

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended configuration
- **Prettier**: Code formatting (if configured)
- **Tailwind**: Utility-first CSS approach

## 🐛 Troubleshooting

### Common Issues

#### Map Not Loading
- Check internet connection for OpenStreetMap tiles
- Verify Leaflet CSS is loaded properly
- Check browser console for JavaScript errors

#### API Connection Failed
- Ensure backend is running on correct port (8000)
- Check CORS configuration in backend
- Verify `NEXT_PUBLIC_API_URL` environment variable

#### Build Errors
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Performance Optimization
- Map components are lazy-loaded to avoid SSR issues
- Images are optimized with Next.js Image component
- Bundle analysis available with `npm run analyze`

## 📄 License

See main project LICENSE file.

## 🔗 Related

- **Backend API**: See `../backend/README.md`
- **Full Stack Setup**: See `../README.md`
- **Deployment Guide**: See deployment documentation
