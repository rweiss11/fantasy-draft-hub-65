import React from "react";
import { Player } from "../../lib/mockPlayers";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Shuffle } from "lucide-react";

interface DraftBoardProps {
  rounds: Player[][];
  currentRound: number;
  currentPick: number;
  userSlot: number;
  numTeams: number;
  isSnake: boolean;
  ppr: boolean;
}

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

export default function DraftBoard({
  rounds,
  currentRound,
  currentPick,
  userSlot,
  numTeams,
  isSnake,
  ppr,
}: DraftBoardProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const getScore = (player: Player) => {
    const points = ppr ? player.projectedPointsPPR : player.projectedPoints;
    return points.toFixed(1);
  };

  const isUserPick = (roundIdx: number, pickIdx: number) => {
    if (isSnake && roundIdx % 2 === 1) {
      return pickIdx === numTeams - userSlot;
    }
    return pickIdx === userSlot - 1;
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shuffle className="h-5 w-5 text-muted-foreground" />
          Draft Board
          {currentRound > 0 && (
            <Badge variant="outline" className="ml-auto font-mono">
              Round {currentRound} · Pick {currentPick}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4" ref={scrollRef}>
          <div className="space-y-6">
            {rounds.map((round, rIdx) => (
              <div key={rIdx} className="space-y-2">
                <div className="flex items-center gap-2 sticky top-0 bg-card py-2 z-10">
                  <Badge
                    variant={rIdx + 1 === currentRound ? "default" : "outline"}
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
                        isUserPick(rIdx, pIdx)
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/30 hover:bg-secondary/50"
                      }`}
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
                      <span className="text-xs font-mono text-accent">
                        {getScore(pick)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {rounds.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Draft in progress...
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
