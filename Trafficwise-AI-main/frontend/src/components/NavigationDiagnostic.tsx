'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavigationDiagnostic() {
  const pathname = usePathname();

  const pages = [
    { name: 'Home', path: '/', status: 'active' },
    { name: 'Map', path: '/map', status: 'ready' },
    { name: 'Routes', path: '/routes', status: 'ready' },
    { name: 'Traffic', path: '/traffic', status: 'ready' },
    { name: 'Analytics', path: '/analytics', status: 'ready' },
    { name: 'About', path: '/about', status: 'pending' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        🔧 Navigation Diagnostic
      </h3>
      
      <div className="space-y-3">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Current page: <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{pathname}</span>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Page Status:</h4>
          {pages.map((page) => (
            <div key={page.path} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  page.status === 'active' ? 'bg-green-500' :
                  page.status === 'ready' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">{page.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  page.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                  page.status === 'ready' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                }`}>
                  {page.status}
                </span>
                <Link 
                  href={page.path}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Test →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">🚀 Quick Navigation Test</h4>
          <div className="flex flex-wrap gap-2">
            {pages.filter(p => p.status !== 'pending').map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  pathname === page.path
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60'
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}