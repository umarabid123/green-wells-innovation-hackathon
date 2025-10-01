import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import FloatingChat from '@/components/FloatingChat'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TrafficWise AI - Smart Traffic Management',
  description: 'AI-powered traffic management and urban planning for Pakistani cities',
  keywords: 'traffic, Pakistan, AI, urban planning, Karachi, Lahore, Islamabad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" storageKey="traffic-wise-theme" enableSystem>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <Navigation />
            
            <main className="flex-1 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-700/50 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.15)_1px,transparent_0)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="relative z-10">
                {children}
              </div>
            </main>
            
            <footer className="relative bg-gray-900 text-gray-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
              <div className="relative max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Brand */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">🚦</div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">TrafficWise AI</h3>
                        <p className="text-gray-400 text-sm font-medium">Smart Traffic Solutions</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed font-normal">
                      Revolutionizing urban transportation with AI-powered traffic management and route optimization.
                    </p>
                  </div>
                  
                  {/* Cities */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-4 tracking-wide">Covered Cities</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 font-medium">
                      <div>🏙️ Karachi</div>
                      <div>🏛️ Lahore</div>
                      <div>🌟 Islamabad</div>
                      <div>🏭 Faisalabad</div>
                      <div>🌊 Multan</div>
                      <div>🚀 More Soon</div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="text-center md:text-right">
                    <h4 className="text-lg font-semibold text-white mb-4 tracking-wide">AI Features</h4>
                    <div className="space-y-2 text-sm text-gray-400 font-medium">
                      <div>🤖 Google Gemini AI</div>
                      <div>🧠 OpenAI Integration</div>
                      <div>📊 Real-time Analytics</div>
                      <div>🗺️ Interactive Maps</div>
                      <div>🛣️ Route Optimization</div>
                      <div>📱 Mobile Responsive</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                  <p className="text-sm text-gray-400 font-normal tracking-wide">
                    © 2025 TrafficWise AI. Powered by cutting-edge AI technology for smart cities.
                  </p>
                  <div className="flex justify-center items-center space-x-4 mt-4 text-xs text-gray-500 font-light tracking-wider">
                    <span>🌍 Smart Cities</span>
                    <span>•</span>
                    <span>⚡ Powered by AI</span>
                    <span>•</span>
                    <span>🌟 Open Source</span>
                  </div>
                </div>
              </div>
            </footer>

            {/* Floating Chat */}
            <FloatingChat />

            {/* Toast container */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'backdrop-blur-sm',
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                },
              }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}