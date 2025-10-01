'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Smart Route Planning',
    description: 'Get optimal route suggestions and real-time traffic guidance for your journey.',
    href: '/routes',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MapPinIcon,
    title: 'Real-Time Traffic Maps',
    description: 'Monitor live traffic conditions, congestion patterns, and optimal routes across your city.',
    href: '/traffic',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ChartBarIcon,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into traffic patterns, peak hours, and urban mobility trends.',
    href: '/analytics',
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: ClockIcon,
    title: 'Predictive Analysis',
    description: 'Forecast traffic conditions and plan ahead with our machine learning models.',
    href: '/predictions',
    color: 'from-orange-500 to-red-500'
  }
];

const stats = [
  { label: 'Cities Monitored', value: '50+', icon: MapPinIcon },
  { label: 'Active Users', value: '10K+', icon: UserGroupIcon },
  { label: 'Data Points', value: '1M+', icon: ChartBarIcon },
  { label: 'Uptime', value: '99.9%', icon: ShieldCheckIcon },
];

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-slate-200 dark:stroke-slate-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="hero-pattern"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  TrafficWise
                </span>
                <br />
                <span className="text-slate-700 dark:text-slate-300">Urban Planner</span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-8 text-xl leading-8 text-slate-600 dark:text-slate-400"
              variants={fadeInUp}
            >
              Transform your city's mobility with AI-powered traffic intelligence. 
              Make data-driven decisions for smarter urban planning and optimized transportation systems.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
              variants={fadeInUp}
            >
              <Link href="/traffic">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                >
                  Explore Traffic Data
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowDemo(true)}
                className="px-8 py-4 text-lg font-semibold border-2"
              >
                <PlayIcon className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features for Smart Cities
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Everything you need to optimize urban traffic flow and make informed planning decisions
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={feature.href}>
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                      Explore Feature
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-slate-900 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Cities Worldwide
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join the growing network of smart cities using TrafficWise for better urban mobility
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              className="text-4xl font-bold text-slate-900 dark:text-white mb-6"
              variants={fadeInUp}
            >
              Ready to Transform Your City's Traffic?
            </motion.h2>
            
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-400 mb-12"
              variants={fadeInUp}
            >
              Start optimizing your urban transportation system today with AI-powered insights
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link href="/analytics">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  View Analytics Dashboard
                </Button>
              </Link>
              
              <Link href="/traffic">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2"
                >
                  View Traffic Maps
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      <Modal
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        title="TrafficWise Demo"
      >
        <div className="p-6">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <PlayIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Demo video coming soon</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">What you'll see:</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• AI-powered traffic analysis in action</li>
              <li>• Real-time map visualizations</li>
              <li>• Predictive routing capabilities</li>
              <li>• Urban planning insights</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
