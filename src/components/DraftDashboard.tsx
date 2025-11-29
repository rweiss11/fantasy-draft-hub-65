import React, { useState } from "react";
import { mockPlayers, Player } from "../lib/mockPlayers";
import { runDraft, DraftResult } from "../lib/draftEngine";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Trophy, Users, Shuffle, Target, Play, RotateCcw } from "lucide-react";

const getPositionClass = (position: string) => {
  const classes: Record<string, string> = {
    QB: "pos-qb bg-pos-qb",
    RB: "pos-rb bg-pos-rb",
    WR: "pos-wr bg-pos-wr",
    TE: "pos-te bg-pos-te",
    K: "pos-k bg-pos-k",
    DEF: "pos-def bg-pos-def",
  };
  return classes[position] || "";
};

interface PlayerCardProps {
  player: Player;
  round: number;
  showRound?: boolean;
}

const PlayerCard = ({ player, round, showRound = true }: PlayerCardProps) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors animate-fade-in">
    {showRound && (
      <span className="text-xs font-mono text-muted-foreground w-8">
        R{round}
      </span>
    )}
    <Badge
      variant="outline"
      className={`${getPositionClass(player.position)} border-0 font-semibold text-xs px-2`}
    >
      {player.position}
    </Badge>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-sm truncate">{player.name}</p>
      <p className="text-xs text-muted-foreground">{player.team}</p>
    </div>
  </div>
);

export default function DraftDashboard() {
  const [numTeams, setNumTeams] = useState(10);
  const [isSnake, setIsSnake] = useState(true);
  const [isPPR, setIsPPR] = useState(true);
  const [userSlot, setUserSlot] = useState(7);
  const [draftResult, setDraftResult] = useState<DraftResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartDraft = () => {
    setIsRunning(true);
    setTimeout(() => {
      const result = runDraft({
        players: mockPlayers,
        numTeams,
        snake: isSnake,
        ppr: isPPR,
        userSlot,
        rounds: 12,
      });
      setDraftResult(result);
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    setDraftResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Fantasy Draft Hub</h1>
              <p className="text-sm text-muted-foreground">
                Mock Draft Simulator
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!draftResult ? (
          /* Settings Panel */
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
                  <Switch
                    id="snake"
                    checked={isSnake}
                    onCheckedChange={setIsSnake}
                  />
                </div>

                {/* PPR Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="ppr" className="text-sm cursor-pointer">
                      PPR Scoring
                    </Label>
                  </div>
                  <Switch
                    id="ppr"
                    checked={isPPR}
                    onCheckedChange={setIsPPR}
                  />
                </div>

                <Separator />

                <Button
                  onClick={handleStartDraft}
                  disabled={isRunning}
                  className="w-full h-12 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-glow"
                >
                  {isRunning ? (
                    <span className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Running Draft...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Start Draft
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Panel */
          <div className="space-y-6 animate-fade-in">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-accent" />
                  Draft Complete
                </h2>
                <p className="text-muted-foreground">
                  {numTeams} teams · {isSnake ? "Snake" : "Linear"} ·{" "}
                  {isPPR ? "PPR" : "Standard"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                New Draft
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Your Team */}
              <Card className="lg:col-span-1 shadow-card border-primary/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-1.5 rounded-md gradient-primary">
                      <Users className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Your Team
                    <Badge variant="secondary" className="ml-auto">
                      Pick #{userSlot}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-2">
                      {draftResult.userTeam.map((player, idx) => (
                        <PlayerCard
                          key={player.id}
                          player={player}
                          round={idx + 1}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Full Draft Board */}
              <Card className="lg:col-span-2 shadow-card border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shuffle className="h-5 w-5 text-muted-foreground" />
                    Full Draft Board
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {draftResult.rounds.map((round, rIdx) => (
                        <div key={rIdx} className="space-y-2">
                          <div className="flex items-center gap-2 sticky top-0 bg-card py-2">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              Round {rIdx + 1}
                            </Badge>
                            <Separator className="flex-1" />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {round.map((pick, pIdx) => (
                              <div
                                key={`${rIdx}-${pIdx}`}
                                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                                  pIdx === userSlot - 1 ||
                                  (isSnake &&
                                    rIdx % 2 === 1 &&
                                    pIdx === numTeams - userSlot)
                                    ? "bg-primary/10 border border-primary/30"
                                    : "bg-secondary/30 hover:bg-secondary/50"
                                }`}
                                style={{
                                  animationDelay: `${pIdx * 30}ms`,
                                }}
                              >
                                <span className="text-xs font-mono text-muted-foreground w-6">
                                  {pIdx + 1}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`${getPositionClass(pick.position)} border-0 font-semibold text-xs px-1.5`}
                                >
                                  {pick.position}
                                </Badge>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">
                                    {pick.name}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {pick.team}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
