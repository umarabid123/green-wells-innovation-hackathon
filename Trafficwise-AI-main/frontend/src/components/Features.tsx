import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Map, Route, TrendingUp, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Monitor traffic patterns and congestion in real-time with advanced AI algorithms.",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description: "Visualize traffic data on detailed, interactive city maps for better insights.",
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Find the most efficient routes and reduce travel times with intelligent planning.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Models",
    description: "Forecast traffic trends and plan infrastructure improvements proactively.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Process millions of data points instantly for immediate actionable insights.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime for mission-critical operations.",
  },
];

export const Features = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-muted/50">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Powerful Features for Smart Cities
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to transform urban mobility and transportation planning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
