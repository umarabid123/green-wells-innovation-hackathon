import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";

export const Hero = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <Heading level={1}>
            <span className="text-primary">TrafficWise</span>
            <br />
            Urban Planner
          </Heading>
          
          <Text variant="large" className="text-muted-foreground max-w-2xl mx-auto">
            Transform your city's mobility with AI-powered traffic intelligence. Make data-driven decisions for smarter urban planning and optimized transportation systems.
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button size="lg" className="gap-2">
            Explore Traffic Data
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
