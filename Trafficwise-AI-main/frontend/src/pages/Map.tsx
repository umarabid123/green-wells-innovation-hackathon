import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map as MapIcon, Layers, ZoomIn, ZoomOut, Navigation, Filter } from "lucide-react";

const Map = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Heading level={1}>Interactive Traffic Map</Heading>
            <Text variant="large" className="text-muted-foreground max-w-2xl mx-auto">
              Visualize real-time traffic data on an interactive map with multiple layers and filters
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative bg-muted h-[600px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                      <div>
                        <Heading level={3}>Map View</Heading>
                        <Text variant="muted">Interactive map would be rendered here</Text>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button size="icon" variant="secondary">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="text-sm">
                        Last updated: 2 seconds ago
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Map Layers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Traffic Flow", "Congestion Zones", "Incidents", "Speed Cameras", "Public Transit"].map((layer) => (
                    <label key={layer} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{layer}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Text variant="small" className="font-medium mb-2">Time Range</Text>
                    <select className="w-full p-2 rounded-md border bg-background">
                      <option>Last Hour</option>
                      <option>Last 6 Hours</option>
                      <option>Last 24 Hours</option>
                    </select>
                  </div>
                  <div>
                    <Text variant="small" className="font-medium mb-2">Status</Text>
                    <select className="w-full p-2 rounded-md border bg-background">
                      <option>All</option>
                      <option>Heavy Traffic</option>
                      <option>Moderate Traffic</option>
                      <option>Clear Roads</option>
                    </select>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <Text variant="small">Heavy Traffic</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <Text variant="small">Moderate Traffic</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <Text variant="small">Clear Roads</Text>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Map;
