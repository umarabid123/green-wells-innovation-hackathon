import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, Lightbulb, Mail, Linkedin, Twitter } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Heading level={1}>About TrafficWise AI</Heading>
            <Text variant="large" className="text-muted-foreground">
              We're revolutionizing urban mobility through artificial intelligence and data analytics, 
              helping cities worldwide optimize their transportation systems and reduce congestion.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <Text>
                  To empower cities with intelligent traffic management solutions that reduce congestion, 
                  improve air quality, and enhance the quality of life for urban residents through 
                  data-driven decision making.
                </Text>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <Text>
                  A world where urban transportation is seamlessly integrated, efficiently managed, 
                  and environmentally sustainable, enabling smarter cities and better communities 
                  for future generations.
                </Text>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto space-y-6">
              <Heading level={2} className="text-center">Our Story</Heading>
              <Text className="text-center">
                Founded in 2020, TrafficWise AI emerged from a simple observation: cities were struggling 
                with increasing traffic congestion despite traditional traffic management approaches. 
                Our team of engineers, data scientists, and urban planners came together with a vision 
                to leverage artificial intelligence and machine learning to solve this growing challenge.
              </Text>
              <Text className="text-center">
                Today, we work with over 50 cities worldwide, processing billions of data points daily 
                to provide real-time traffic intelligence and predictive analytics. Our platform has 
                helped reduce average commute times by 15% and decreased urban emissions by 12% in 
                the cities we serve.
              </Text>
            </div>
          </div>

          <div className="space-y-8">
            <Heading level={2} className="text-center">Our Values</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>People First</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    We believe technology should serve people. Every solution we develop is designed 
                    with the end user in mind, ensuring accessibility and real-world impact.
                  </Text>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    We're committed to delivering the highest quality solutions, continuously improving 
                    our algorithms and staying at the forefront of AI innovation.
                  </Text>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    We constantly push boundaries, exploring new technologies and methodologies to 
                    solve complex urban mobility challenges.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Heading level={2}>Get in Touch</Heading>
              <Text variant="large" className="text-muted-foreground">
                Interested in learning more about how TrafficWise AI can help your city? 
                We'd love to hear from you.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Sales
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
              <div className="flex gap-4 justify-center pt-6">
                <Button size="icon" variant="ghost">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <Text variant="muted">Cities Served</Text>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15%</div>
              <Text variant="muted">Time Saved</Text>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12%</div>
              <Text variant="muted">Emissions Reduced</Text>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1B+</div>
              <Text variant="muted">Data Points/Day</Text>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
