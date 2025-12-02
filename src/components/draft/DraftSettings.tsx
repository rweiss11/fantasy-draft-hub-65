import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Users, Shuffle, Trophy, Target, Play } from "lucide-react";

interface DraftSettingsProps {
  numTeams: number;
  setNumTeams: (value: number) => void;
  userSlot: number;
  setUserSlot: (value: number) => void;
  isSnake: boolean;
  setIsSnake: (value: boolean) => void;
  isPPR: boolean;
  setIsPPR: (value: boolean) => void;
  claudeApiKey: string;
  setClaudeApiKey: (value: string) => void;
  onStartDraft: () => void;
  isRunning: boolean;
}

export default function DraftSettings({
  numTeams,
  setNumTeams,
  userSlot,
  setUserSlot,
  isSnake,
  setIsSnake,
  isPPR,
  setIsPPR,
  claudeApiKey,
  setClaudeApiKey,
  onStartDraft,
  isRunning,
}: DraftSettingsProps) {
  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="h-5 w-5 text-primary" />
            Draft Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Number of Teams */}
          <div className="space-y-2">
            <Label
              htmlFor="numTeams"
              className="flex items-center gap-2 text-sm"
            >
              <Users className="h-4 w-4 text-muted-foreground" />
              Number of Teams
            </Label>
            <Input
              id="numTeams"
              type="number"
              value={numTeams}
              onChange={(e) => setNumTeams(Number(e.target.value))}
              min={4}
              max={16}
              className="bg-secondary border-border"
            />
          </div>

          {/* Draft Slot */}
          <div className="space-y-2">
            <Label
              htmlFor="userSlot"
              className="flex items-center gap-2 text-sm"
            >
              <Target className="h-4 w-4 text-muted-foreground" />
              Your Draft Position
            </Label>
            <Input
              id="userSlot"
              type="number"
              value={userSlot}
              onChange={(e) => setUserSlot(Number(e.target.value))}
              min={1}
              max={numTeams}
              className="bg-secondary border-border"
            />
          </div>

          <Separator />

          {/* Snake Draft Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shuffle className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="snake" className="text-sm cursor-pointer">
                Snake Draft
              </Label>
            </div>
            <Switch id="snake" checked={isSnake} onCheckedChange={setIsSnake} />
          </div>

          {/* PPR Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="ppr" className="text-sm cursor-pointer">
                PPR Scoring
              </Label>
            </div>
            <Switch id="ppr" checked={isPPR} onCheckedChange={setIsPPR} />
          </div>

          <Separator />

          {/* Claude API Key */}
          <div className="space-y-2">
            <Label
              htmlFor="claudeApiKey"
              className="text-sm"
            >
              Claude API Key (Optional - for AI Commentary)
            </Label>
            <Input
              id="claudeApiKey"
              type="password"
              value={claudeApiKey}
              onChange={(e) => setClaudeApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="bg-secondary border-border font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Get your key from console.anthropic.com
            </p>
          </div>

          <Separator />

          <Button
            onClick={onStartDraft}
            disabled={isRunning}
            className="w-full h-12 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-glow"
          >
            <span className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start Draft
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
