"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CVEDatabase() {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const openMITRE = () => {
    window.open(
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0001",
      "_blank"
    );
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white/5 backdrop-blur-md border-none text-white rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow">
        <CardContent className="flex justify-between p-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold">CVE-2024-0001</span>
              <Badge className="bg-red-700 text-white">Critical</Badge>
              <span className="text-sm font-semibold">CVSS: 9.8</span>
              <Badge variant="outline">Exploit Available</Badge>
              <Badge variant="secondary">In the Wild</Badge>
            </div>
            <h3 className="text-lg font-semibold mt-1">
              Remote Code Execution in Web Framework
            </h3>
            <p className="text-sm text-gray-400">
              Published: 2024-01-20 · Affected: WebFramework v2.1–2.5 · Patch:
              Available
            </p>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleDetailsClick}>
              Details
            </Button>
            <Button size="sm" onClick={openMITRE}>
              MITRE
            </Button>
          </div>
        </CardContent>

        {showDetails && (
          <CardContent className="bg-white/10 text-gray-300 p-4 mt-2 rounded-b-2xl">
            <p>
              <strong>Description:</strong> This vulnerability allows remote
              attackers to execute arbitrary code on the affected web framework
              versions. Exploits are already available in the wild.
            </p>
            <p>
              <strong>Impact:</strong> Full system compromise, data leakage,
              service disruption.
            </p>
            <p>
              <strong>Remediation:</strong> Apply the latest patch immediately.
              Upgrade to v2.6 or later.
            </p>
            <p>
              <strong>References:</strong> CVE, Vendor Advisory, Security Blogs.
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
