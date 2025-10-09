"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { from: "user", text: input },
      { from: "bot", text: "I’m your Security Analyst, here to assist. 🔍" },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating button */}
      {!open && (
        <Button
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg bg-blue-500 hover:bg-blue-600"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat window */}
      {open && (
        <Card className="w-80 h-120 flex flex-col rounded-2xl bg-white/5 backdrop-blur-md border-none shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between p-1 border-b border-white/10">
            <div className="flex items-center space-x-2 ml-3">
              <Avatar className="h-6 w-6 border border-blue-500/40 bg-blue-500/20">
                <AvatarFallback className="bg-transparent text-blue-400">
                  <Shield className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
                Security Analyst
              </CardTitle>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-2 space-y-2 overflow-y-auto text-sm hide-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.from === "user"
                    ? "bg-blue-500/80 self-end text-white"
                    : "bg-white/10 border border-white/10 text-gray-200"
                }`}
              >
                {m.text}
              </div>
            ))}
          </CardContent>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your Security Analyst..."
              className="flex-1 bg-white/10 border-none text-white placeholder-gray-400"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
