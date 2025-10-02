"use client"

import {
  BoltIcon,
  GlobeAltIcon,
  UsersIcon,
  EnvelopeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"

export default function AboutPage() {
  const team = [
    {
      name: "Alex Chen",
      role: "Lead AI Engineer",
      bio: "Expert in machine learning and traffic optimization algorithms",
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      bio: "Passionate about creating user-centric transportation solutions",
    },
    {
      name: "Mike Rodriguez",
      role: "Data Scientist",
      bio: "Specializes in real-time data processing and predictive analytics",
    },
    {
      name: "Emily Wu",
      role: "UX Designer",
      bio: "Focused on making complex traffic data simple and intuitive",
    },
  ]

  const milestones = [
    {
      year: "2020",
      event: "TrafficWise AI Founded",
      description: "Started with a vision to revolutionize urban mobility",
    },
    { year: "2021", event: "First AI Model Deployed", description: "Launched our first traffic prediction algorithm" },
    { year: "2022", event: "1M+ Users Milestone", description: "Reached our first million active users" },
    { year: "2023", event: "Global Expansion", description: "Extended services to 50+ cities worldwide" },
    { year: "2024", event: "Real-time Integration", description: "Achieved sub-second traffic data processing" },
  ]

  const values = [
    {
      title: "Accuracy",
      description: "We provide the most precise traffic predictions using advanced AI algorithms",
    },
    {
      title: "Speed",
      description: "Real-time data processing ensures you get instant traffic updates",
    },
    {
      title: "Sustainability",
      description: "Helping reduce carbon footprint by optimizing traffic flow",
    },
    {
      title: "Community",
      description: "Building a smarter transportation ecosystem for everyone",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              About <span className="gradient-text">TrafficWise AI</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make urban transportation smarter, faster, and more efficient through the power of
              artificial intelligence and real-time data analytics.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="card-gradient p-12 mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              To revolutionize urban mobility by providing intelligent traffic solutions that save time, reduce stress,
              and contribute to sustainable city development. We believe that smarter traffic management leads to better
              quality of life for everyone.
            </p>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Our <span className="gradient-text">Values</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="card-gradient p-6 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {/* {value.title === "Accuracy" && (
                      <TargetIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    )} */}
                    {value.title === "Speed" && <BoltIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />}
                    {value.title === "Sustainability" && (
                      <GlobeAltIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    )}
                    {value.title === "Community" && (
                      <UsersIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-400 to-secondary-400 rounded-full"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                      <div className="card-gradient p-6">
                        <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{milestone.event}</h3>
                        <p className="text-slate-600">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-white border-4 border-primary-400 rounded-full z-10 shadow-lg"></div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="card-gradient p-6 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    <div className="mx-auto w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 text-xl font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{member.name}</h3>
                  <div className="text-primary-600 font-medium mb-3">{member.role}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-slate-600">Cities Covered</div>
            </div>
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">2.5M+</div>
              <div className="text-slate-600">Happy Users</div>
            </div>
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">15M+</div>
              <div className="text-slate-600">Hours Saved</div>
            </div>
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
              <div className="text-slate-600">Uptime</div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="card-gradient p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Join the Revolution?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Whether you're a city planner, developer, or just curious about our technology, we'd love to hear from
              you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 font-semibold inline-flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5" />
                Contact Us
              </button>
              <button className="px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors font-semibold inline-flex items-center gap-2">
                <WrenchScrewdriverIcon className="w-5 h-5" />
                Developer API
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
