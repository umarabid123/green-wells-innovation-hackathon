"use client"

import {
  MapPinIcon,
  CpuChipIcon,
  ChartBarIcon,
  MapIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-9 w-9 rounded-md bg-blue-600 text-white grid place-items-center text-xs font-bold">
                TW
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">TrafficWise AI</h3>
                <p className="text-slate-400 text-sm">Smart Traffic Solutions</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Revolutionizing urban transportation with AI-powered traffic management and route optimization.
            </p>
          </div>

          {/* Cities */}
          <div className="">
            <h4 className="text-base font-semibold text-white mb-4 tracking-wide">Covered Cities</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> Karachi
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> Lahore
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> Islamabad
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> Faisalabad
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> Multan
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> More Soon
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-start">
            <h4 className="text-base font-semibold text-white mb-4 tracking-wide">AI Features</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center md:justify-start gap-2">
                <CpuChipIcon className="h-4 w-4" /> Google Gemini AI
              </div>
              <div className="flex items-center md:justify-start gap-2">
                <CpuChipIcon className="h-4 w-4" /> OpenAI Integration
              </div>
              <div className="flex items-center md:justify-start gap-2">
                <ChartBarIcon className="h-4 w-4" /> Real-time Analytics
              </div>
              <div className="flex items-center md:justify-start gap-2">
                <MapIcon className="h-4 w-4" /> Interactive Maps
              </div>
              <div className="flex items-center md:justify-start gap-2">
                <ArrowPathIcon className="h-4 w-4" /> Route Optimization
              </div>
              <div className="flex items-center md:justify-start gap-2">
                <DevicePhoneMobileIcon className="h-4 w-4" /> Mobile Responsive
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © 2025 TrafficWise AI. Powered by cutting-edge AI technology for smart cities.
          </p>
          <div className="flex justify-center items-center gap-4 mt-3 text-xs text-slate-500">
            <span>Smart Cities</span>
            <span>•</span>
            <span>AI-Powered</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
