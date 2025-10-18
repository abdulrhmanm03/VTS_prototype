"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Building2, Users, CheckCircle2, Network, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(1);

  const handleNext = () => setStage((s) => Math.min(s + 1, 5));
  const handleBack = () => setStage((s) => Math.max(s - 1, 1));

  const [orgData, setOrgData] = useState({
    name: "",
    industry: "",
    size: "",
    region: "global",
    domains: [] as string[],
    ipRanges: [] as string[],
    cloudProviders: [] as string[],
    integrations: [] as string[],
  });
  const steps = [
    { name: "Organization Info", icon: Building2 },
    { name: "Asset Discovery", icon: Network },
    { name: "Security Integrations", icon: Shield },
    { name: "Security Team", icon: Users },
    { name: "Review & Launch", icon: CheckCircle2 },
  ];
  const integrations = [
    { name: "Splunk", category: "SIEM", logo: "🔍" },
    { name: "Microsoft Sentinel", category: "SIEM", logo: "🛡️" },
    { name: "QRadar", category: "SIEM", logo: "📊" },
    { name: "CrowdStrike", category: "EDR", logo: "🦅" },
    { name: "Palo Alto", category: "Firewall", logo: "🔥" },
    { name: "ServiceNow", category: "ITSM", logo: "🎫" },
    { name: "Jira", category: "Ticketing", logo: "📋" },
    { name: "Slack", category: "Communication", logo: "💬" },
  ];

  return (
    <div className="flex flex-col gap-10 p-6 min-h-screen text-white">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          Welcome to Churchill
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Let’s complete your setup in a few simple steps.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center space-x-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const active = idx + 1 <= stage;
          return (
            <div key={idx} className="flex items-center space-x-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all ${
                  active
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`text-sm ${
                  active ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
              {idx < 4 && (
                <div
                  className={`w-8 h-0.5 transition-all ${
                    idx + 1 < stage ? "bg-blue-500/80" : "bg-gray-600/50"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active Stage Form */}
      <Card
        className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md 
        hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300 max-w-3xl mx-auto w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10 p-8 space-y-6">
          {stage === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gray-200">
                  Organization Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">
                    Organization Name *
                  </label>
                  <Input placeholder="Enter organization name" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Industry *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Primary Region *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Global</SelectItem>
                      <SelectItem value="healthcare">UAE</SelectItem>
                      <SelectItem value="technology">GCC</SelectItem>
                      <SelectItem value="education">Mena</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">
                    Organization Size *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1–50 employees</SelectItem>
                      <SelectItem value="medium">51–500 employees</SelectItem>
                      <SelectItem value="large">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Card className="bg-transparent border-none shadow-none">
                    <h3 className="text-lg font-semibold text-blue-300 mb-4">
                      Compliance Requirements
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "ISO 27001",
                        "NIST CSF",
                        "GDPR",
                        "PCI DSS",
                        "SOC 2",
                        "HIPAA",
                      ].map((item) => (
                        <Toggle
                          key={item}
                          className="w-full py-2 px-4 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 data-[state=on]:bg-blue-600 data-[state=on]:text-white shadow-md backdrop-blur-sm transition-all duration-200 text-sm font-medium"
                          aria-label={item}
                        >
                          {item}
                        </Toggle>
                      ))}
                    </div>
                  </Card>
                </div>
              </CardContent>
            </>
          )}

          {stage === 2 && (
            <>
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-200">
                    Asset Discovery
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Define your organization’s digital footprint for continuous
                    monitoring
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Tabs defaultValue="domains" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-transparent border border-slate-700 rounded-xl text-gray-300">
                      <TabsTrigger value="domains">Domains</TabsTrigger>
                      <TabsTrigger value="ip">IP Ranges</TabsTrigger>
                      <TabsTrigger value="cloud">Cloud Assets</TabsTrigger>
                      <TabsTrigger value="supply-chain">
                        Supply Chain
                      </TabsTrigger>
                    </TabsList>

                    {/* DOMAINS */}
                    <TabsContent value="domains" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Primary Domains</Label>
                        <Input
                          placeholder="example.com (press Enter to add)"
                          className="bg-slate-900 border-slate-700 text-gray-200"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const value = (e.target as HTMLInputElement)
                                .value;
                              if (value) {
                                setOrgData({
                                  ...orgData,
                                  domains: [...orgData.domains, value],
                                });
                                (e.target as HTMLInputElement).value = "";
                              }
                            }
                          }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {orgData.domains.map((domain, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-blue-500/20 text-blue-400"
                          >
                            {domain}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-slate-700 hover:border-blue-500"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Domain List (CSV)
                      </Button>
                    </TabsContent>

                    {/* IP RANGES */}
                    <TabsContent value="ip" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          IP Ranges / CIDR Blocks
                        </Label>
                        <Input
                          placeholder="192.168.1.0/24 (press Enter to add)"
                          className="bg-slate-900 border-slate-700 text-gray-200"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const value = (e.target as HTMLInputElement)
                                .value;
                              if (value) {
                                setOrgData({
                                  ...orgData,
                                  ipRanges: [...orgData.ipRanges, value],
                                });
                                (e.target as HTMLInputElement).value = "";
                              }
                            }
                          }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {orgData.ipRanges.map((ip, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-purple-500/20 text-purple-400"
                          >
                            {ip}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    {/* CLOUD PROVIDERS */}
                    <TabsContent value="cloud" className="space-y-4 mt-4">
                      <Label className="text-gray-300">
                        Cloud Service Providers
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "AWS",
                          "Azure",
                          "Google Cloud",
                          "Oracle Cloud",
                          "Alibaba Cloud",
                          "IBM Cloud",
                        ].map((provider) => (
                          <Card
                            key={provider}
                            className="bg-slate-900/40 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer rounded-xl"
                          >
                            <CardContent className="p-4 flex items-center justify-between text-gray-300">
                              <span>{provider}</span>
                              <Checkbox
                                checked={orgData.cloudProviders.includes(
                                  provider
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setOrgData({
                                      ...orgData,
                                      cloudProviders: [
                                        ...orgData.cloudProviders,
                                        provider,
                                      ],
                                    });
                                  } else {
                                    setOrgData({
                                      ...orgData,
                                      cloudProviders:
                                        orgData.cloudProviders.filter(
                                          (p) => p !== provider
                                        ),
                                    });
                                  }
                                }}
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* SUPPLY CHAIN */}
                    <TabsContent
                      value="supply-chain"
                      className="space-y-4 mt-4"
                    >
                      <Card className="bg-slate-900/40 border border-slate-700 rounded-xl">
                        <CardHeader>
                          <CardTitle className="text-sm text-gray-200">
                            Third-Party Risk Management
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            Add vendors and suppliers for continuous monitoring
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-gray-300">
                              Vendor/Supplier Domain
                            </Label>
                            <Input
                              placeholder="vendor-domain.com"
                              className="bg-slate-900 border-slate-700 text-gray-200"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-gray-300">
                                Risk Level
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-slate-900 border-slate-700 text-gray-200">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="critical">
                                    Critical
                                  </SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-300">
                                Access Level
                              </Label>
                              <Select>
                                <SelectTrigger className="bg-slate-900 border-slate-700 text-gray-200">
                                  <SelectValue placeholder="Select access" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full">
                                    Full Access
                                  </SelectItem>
                                  <SelectItem value="limited">
                                    Limited Access
                                  </SelectItem>
                                  <SelectItem value="readonly">
                                    Read Only
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button className="w-full bg-transparent border border-slate-700 hover:border-blue-500 text-gray-200">
                            Add Vendor
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}

          {stage === 3 && (
            <>
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl font-semibold text-gray-200">
                    Connect Your Security Stack
                  </h3>
                  <p className="text-gray-400">
                    Integrate with your existing tools for unified threat
                    intelligence
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {integrations.map((integration) => (
                    <Card
                      key={integration.name}
                      className={`cursor-pointer transition-all rounded-xl ${
                        orgData.integrations.includes(integration.name)
                          ? "bg-blue-500/10 border border-blue-500"
                          : "bg-slate-900/40 border border-slate-700 hover:border-blue-500"
                      }`}
                      onClick={() => {
                        if (orgData.integrations.includes(integration.name)) {
                          setOrgData({
                            ...orgData,
                            integrations: orgData.integrations.filter(
                              (i) => i !== integration.name
                            ),
                          });
                        } else {
                          setOrgData({
                            ...orgData,
                            integrations: [
                              ...orgData.integrations,
                              integration.name,
                            ],
                          });
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between text-gray-300">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{integration.logo}</span>
                            <div>
                              <div className="font-semibold text-gray-200">
                                {integration.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {integration.category}
                              </div>
                            </div>
                          </div>
                          {orgData.integrations.includes(integration.name) && (
                            <CheckCircle2 className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-transparent border border-slate-700 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-200">
                      API Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">API Endpoint</Label>
                      <Input
                        placeholder="https://api.yourorg.com"
                        className="bg-slate-900 border-slate-700 text-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">API Key</Label>
                      <Input
                        type="password"
                        placeholder="Enter API key"
                        className="bg-slate-900 border-slate-700 text-gray-200"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border border-slate-700 hover:border-blue-500 text-gray-200"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {stage === 4 && (
            <>
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl font-semibold text-gray-200">
                    Setup Your Security Team
                  </h3>
                  <p className="text-gray-400">
                    Define roles and invite team members
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      role: "SOC Analyst",
                      count: 0,
                      description: "Monitor and respond to security alerts",
                    },
                    {
                      role: "Incident Response",
                      count: 0,
                      description: "Handle security incidents and breaches",
                    },
                    {
                      role: "Threat Intelligence",
                      count: 0,
                      description: "Analyze threat landscape and actors",
                    },
                    {
                      role: "Threat Hunter",
                      count: 0,
                      description: "Proactively hunt for threats",
                    },
                    {
                      role: "Security Admin",
                      count: 0,
                      description: "Manage platform and configurations",
                    },
                    {
                      role: "CISO/Executive",
                      count: 0,
                      description: "View executive dashboards and reports",
                    },
                  ].map((team) => (
                    <Card
                      key={team.role}
                      className="bg-slate-900/40 border border-slate-700 hover:border-blue-500 transition-all rounded-xl"
                    >
                      <CardContent className="p-4 space-y-3 text-gray-300">
                        <div>
                          <div className="font-semibold text-gray-200">
                            {team.role}
                          </div>
                          <div className="text-xs text-gray-400">
                            {team.description}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            className="bg-slate-900 border-slate-700 text-gray-200 w-20"
                          />
                          <span className="text-sm text-gray-400">users</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-transparent border border-slate-700 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-200">
                      Invite Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Email address"
                        className="bg-slate-900 border-slate-700 text-gray-200"
                      />
                      <Select>
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-gray-200">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soc">SOC Analyst</SelectItem>
                          <SelectItem value="ir">Incident Response</SelectItem>
                          <SelectItem value="ti">
                            Threat Intelligence
                          </SelectItem>
                          <SelectItem value="th">Threat Hunter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-transparent border border-slate-700 hover:border-blue-500 text-gray-200">
                      Send Invitation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {stage === 5 && (
            <>
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
                  <h3 className="text-2xl font-semibold text-gray-200">
                    Ready to Launch!
                  </h3>
                  <p className="text-gray-400">
                    Review your configuration and start protecting your
                    organization
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-slate-900/40 border border-slate-700 rounded-xl hover:border-blue-500 transition-all">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2 text-gray-200">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        Organization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span>{orgData.name || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Industry:</span>
                        <span>{orgData.industry || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span>{orgData.size || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Region:</span>
                        <span className="uppercase">{orgData.region}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/40 border border-slate-700 rounded-xl hover:border-blue-500 transition-all">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2 text-gray-200">
                        <Network className="w-4 h-4 text-gray-400" />
                        Assets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Domains:</span>
                        <span>{orgData.domains.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Ranges:</span>
                        <span>{orgData.ipRanges.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cloud Providers:</span>
                        <span>{orgData.cloudProviders.length}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/40 border border-slate-700 rounded-xl hover:border-blue-500 transition-all">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2 text-gray-200">
                        <Shield className="w-4 h-4 text-gray-400" />
                        Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                      <div className="text-2xl font-bold text-gray-200">
                        {orgData.integrations.length}
                      </div>
                      <div className="text-xs text-gray-400">
                        Connected tools
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/40 border border-slate-700 rounded-xl hover:border-blue-500 transition-all">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2 text-gray-200">
                        <Users className="w-4 h-4 text-gray-400" />
                        Team
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                      <div className="text-2xl font-bold text-gray-200">
                        Ready
                      </div>
                      <div className="text-xs text-gray-400">
                        Team invitations pending
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 rounded-xl">
                  <CardContent className="p-6 text-center space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200">
                      Initial Scan Configuration
                    </h4>
                    <p className="text-sm text-gray-300">
                      CHURCHILL will perform an initial comprehensive scan of
                      your assets including:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>Attack Surface Discovery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>Vulnerability Assessment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>Dark Web Monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>Threat Intelligence Correlation</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Estimated time: 15–30 minutes
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="bg-white/10 border-none"
              disabled={stage === 1}
              onClick={handleBack}
            >
              Back
            </Button>
            {stage < 5 ? (
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
                onClick={() => router.push("/")}
              >
                <CheckCircle2 className="h-5 w-5" />
                Finish Setup
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
