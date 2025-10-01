'use client';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export default function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="card-gradient p-6 h-full transform group-hover:scale-105 transition-all duration-300">
        {/* Icon */}
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
          <span className="text-2xl text-white">{icon}</span>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
        
        {/* Hover effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
      </div>
    </div>
  );
}