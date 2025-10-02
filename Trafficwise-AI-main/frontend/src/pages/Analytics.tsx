import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, TrendingDown, Activity, Calendar, Download } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Heading level={1}>Traffic Analytics</Heading>
              <Text variant="large" className="text-muted-foreground mt-2">
                Comprehensive insights and data-driven reports
              </Text>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145,892</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.5%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Speed</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.3 km/h</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-3.2%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Congestion Time</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 hrs</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">-8.1%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidents</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">+5</span> from yesterday
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Flow Trends</CardTitle>
                  <CardDescription>Vehicle count over the past 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      <Text variant="muted">Chart visualization would appear here</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Peak Hours Analysis</CardTitle>
                    <CardDescription>Traffic patterns throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { time: "7:00 AM - 9:00 AM", level: "High", percentage: 85 },
                      { time: "12:00 PM - 2:00 PM", level: "Medium", percentage: 62 },
                      { time: "5:00 PM - 7:00 PM", level: "Very High", percentage: 95 },
                      { time: "10:00 PM - 6:00 AM", level: "Low", percentage: 25 },
                    ].map((period) => (
                      <div key={period.time} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{period.time}</span>
                          <span className="text-muted-foreground">{period.level}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${period.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Congestion Zones</CardTitle>
                    <CardDescription>Most affected areas this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { location: "Downtown District", count: 847, change: "+12%" },
                        { location: "City Center Bridge", count: 692, change: "+8%" },
                        { location: "Highway 101 North", count: 581, change: "-3%" },
                        { location: "Industrial Zone", count: 423, change: "+5%" },
                      ].map((zone, index) => (
                        <div key={zone.location} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{zone.location}</div>
                              <div className="text-sm text-muted-foreground">{zone.count} incidents</div>
                            </div>
                          </div>
                          <span className={zone.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}>
                            {zone.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hourly">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Traffic Data</CardTitle>
                  <CardDescription>Detailed breakdown by hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                    <Text variant="muted">Hourly analytics chart</Text>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Traffic Data</CardTitle>
                  <CardDescription>7-day traffic trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                    <Text variant="muted">Weekly analytics chart</Text>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Traffic Data</CardTitle>
                  <CardDescription>30-day comprehensive analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                    <Text variant="muted">Monthly analytics chart</Text>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
