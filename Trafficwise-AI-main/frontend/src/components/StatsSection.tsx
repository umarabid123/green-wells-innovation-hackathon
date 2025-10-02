'use client';

const stats = [
  { label: 'Cities Covered', value: '50+', icon: '🏙️' },
  { label: 'Routes Analyzed', value: '10K+', icon: '🛣️' },
  { label: 'Time Saved (Hours)', value: '5M+', icon: '⏰' },
  { label: 'Happy Users', value: '25K+', icon: '😊' }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join the community of smart commuters who save time every day
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2 group-hover:scale-105 transition-transform duration-200">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}