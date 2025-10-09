"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PatchManagement() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/5 border-none text-white rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Patch Deployment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-2">
            Overall patch coverage: 87%
          </p>
          <Progress value={87} className="h-2" />
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-none text-white rounded-2xl backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle>Pending Patches</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          - WebFramework 2.3.4 (Security Patch)
          <br />
          - OpenSSL 3.1.2 (Critical Update)
          <br />- Linux Kernel 6.1.10 (Privilege Escalation Fix)
        </CardContent>
      </Card>
    </div>
  );
}
