import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation2, Clock, Route as RouteIcon, Zap, TrendingDown, MapPin } from "lucide-react";

const suggestedRoutes = [
  {
    name: "Fastest Route",
    distance: "12.5 km",
    duration: "18 min",
    savings: "7 min",
    traffic: "moderate",
    toll: false,
  },
  {
    name: "Shortest Route",
    distance: "9.8 km",
    duration: "22 min",
    savings: "3 min",
    traffic: "heavy",
    toll: false,
  },
  {
    name: "Eco Route",
    distance: "13.2 km",
    duration: "25 min",
    savings: "15% fuel",
    traffic: "light",
    toll: true,
  },
];

const Routes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Heading level={1}>Smart Route Planning</Heading>
            <Text variant="large" className="text-muted-foreground max-w-2xl mx-auto">
              Find optimized routes based on real-time traffic, distance, and efficiency
            </Text>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Plan Your Route</CardTitle>
              <CardDescription>Enter your starting point and destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Starting Point</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter starting location" className="flex-1" />
                  <Button size="icon" variant="outline">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter destination" className="flex-1" />
                  <Button size="icon" variant="outline">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departure Time</label>
                  <Input type="time" defaultValue="09:00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Type</label>
                  <select className="w-full p-2 rounded-md border bg-background">
                    <option>Car</option>
                    <option>Truck</option>
                    <option>Motorcycle</option>
                  </select>
                </div>
              </div>
              <Button className="w-full" size="lg">
                <Navigation2 className="mr-2 h-4 w-4" />
                Calculate Routes
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Heading level={2}>Suggested Routes</Heading>
            
            <div className="grid gap-4">
              {suggestedRoutes.map((route, index) => (
                <Card key={route.name} className={index === 0 ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <RouteIcon className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>{route.name}</CardTitle>
                            {index === 0 && (
                              <Badge variant="default" className="text-xs">
                                Recommended
                              </Badge>
                            )}
                            {route.toll && (
                              <Badge variant="secondary" className="text-xs">
                                Toll
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {route.distance} • {route.duration}
                          </CardDescription>
                        </div>
                      </div>
                      <Button>Select Route</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Save {route.savings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{route.traffic} traffic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">Lower emissions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation2 className="h-5 w-5 text-primary" />
                  Active Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">142</div>
                <Text variant="muted">Currently navigating</Text>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Avg. Time Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12 min</div>
                <Text variant="muted">Per optimized route</Text>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-primary" />
                  Fuel Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18%</div>
                <Text variant="muted">Average reduction</Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Routes;
