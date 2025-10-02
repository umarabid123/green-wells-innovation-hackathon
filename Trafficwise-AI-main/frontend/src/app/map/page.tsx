'use client';

import { useState } from 'react';
import ModernTrafficMap from '@/components/ModernTrafficMap';

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState('Karachi');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/90">
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Real-Time Traffic Map
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              An interactive overview of traffic conditions in major Pakistani cities.
            </p>
          </div>

          <ModernTrafficMap 
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
          />
        </div>
      </main>
    </div>
  );
}