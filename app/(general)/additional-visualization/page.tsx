"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Settings, RefreshCw, Map } from "lucide-react"

// Hardcoded data for the threat map visualization and the country cards
const threatMapData = [
  { country: 'USA', threats: 245, x: 20, y: 30 },
  { country: 'Russia', threats: 156, x: 50, y: 20 },
  { country: 'China', threats: 189, x: 60, y: 35 },
  { country: 'N. Korea', threats: 89, x: 70, y: 40 },
];

const countryStatsData = [
  { country: 'United States', threats: 245 },
  { country: 'China', threats: 189 },
  { country: 'Russia', threats: 156 },
  { country: 'North Korea', threats: 89 },
  { country: 'Iran', threats: 67 },
];

// Helper function to determine badge color based on threat count
// const getThreatBadgeColor = (threats: number) => {
//   if (threats >= 200) return 'bg-red-500';
//   if (threats >= 150) return 'bg-orange-500';
//   return 'bg-yellow-500';
// };

export default function AdvancedVisualizationsPage() {
  const [activeTab, setActiveTab] = useState("interactive-threat-map");

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Advanced Visualizations</h1>
        <p className="text-muted-foreground">
          Interactive threat maps, correlation graphs, and customizable dashboards
        </p>
      </div>

      {/* Search Bar and Buttons */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search visualizations, data sources..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="interactive-threat-map">Interactive Threat Map</TabsTrigger>
          <TabsTrigger value="ioc-correlation-graph">IOC Correlation Graph</TabsTrigger>
          <TabsTrigger value="attack-timeline">Attack Timeline</TabsTrigger>
          <TabsTrigger value="custom-dashboards">Custom Dashboards</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive-threat-map" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Map className="h-5 w-5" />
                <CardTitle>Global Threat Intelligence Map</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time visualization of global threat activity and attack origins
              </p>
              <div className="relative w-full h-[400px] bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                  {/* Placeholder for the background world map. A real implementation would use a library like react-simple-maps */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/path/to/world-map-image.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                </div>
                {threatMapData.map((item, index) => (
                  <div key={index} className="absolute text-center text-white p-2 rounded-md" style={{ top: `${item.y}%`, left: `${item.x}%`, transform: 'translate(-50%, -50%)' }}>
                    <p className="text-sm font-bold">{item.country}:</p>
                    <p className="text-sm">{item.threats} threats</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-lg border">
                <h3 className="text-sm font-semibold mb-2">Threat Intensity</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span>Critical (200+)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span>High (150-199)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span>Medium (50-99)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 mt-4">
                {countryStatsData.map((item, index) => (
                  <Card key={index} className="text-center p-2">
                    <CardContent className="p-0">
                      <div className="text-xl font-bold">{item.threats}</div>
                      <div className="text-sm text-muted-foreground">{item.country}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}