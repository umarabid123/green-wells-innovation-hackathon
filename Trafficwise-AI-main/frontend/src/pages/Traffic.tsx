import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Clock, MapPin } from "lucide-react";

const trafficData = [
  {
    location: "Downtown District",
    status: "heavy",
    vehicles: 1247,
    avgSpeed: "15 km/h",
    delay: "+12 min",
  },
  {
    location: "Highway 101 North",
    status: "moderate",
    vehicles: 856,
    avgSpeed: "45 km/h",
    delay: "+5 min",
  },
  {
    location: "City Center Bridge",
    status: "clear",
    vehicles: 324,
    avgSpeed: "60 km/h",
    delay: "On time",
  },
  {
    location: "Industrial Zone",
    status: "moderate",
    vehicles: 592,
    avgSpeed: "38 km/h",
    delay: "+3 min",
  },
];

const Traffic = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "heavy":
        return "destructive";
      case "moderate":
        return "secondary";
      case "clear":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "heavy":
        return AlertTriangle;
      case "moderate":
        return Activity;
      case "clear":
        return CheckCircle2;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Heading level={1}>Real-Time Traffic Monitoring</Heading>
            <Text variant="large" className="text-muted-foreground max-w-2xl mx-auto">
              Monitor live traffic conditions across the city with AI-powered analytics and predictions
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Active Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28</div>
                <Text variant="muted">Monitored areas</Text>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Total Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,019</div>
                <Text variant="muted">Currently tracked</Text>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Avg. Delay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7 min</div>
                <Text variant="muted">City-wide average</Text>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Heading level={2}>Live Traffic Conditions</Heading>
              <Button variant="outline">
                Refresh Data
              </Button>
            </div>

            <div className="grid gap-4">
              {trafficData.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                return (
                  <Card key={item.location}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                          <div>
                            <CardTitle>{item.location}</CardTitle>
                            <CardDescription>
                              {item.vehicles} vehicles • {item.avgSpeed} average speed
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(item.status)} className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Delay: {item.delay}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Traffic;
