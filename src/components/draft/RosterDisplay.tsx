import React from "react";
import { Player } from "../../lib/mockPlayers";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users } from "lucide-react";

// Roster slot configuration for standard fantasy league
export interface RosterSlot {
  slot: string;
  position: string[];
  isFlex?: boolean;
  isBench?: boolean;
}

export const ROSTER_SLOTS: RosterSlot[] = [
  { slot: "QB", position: ["QB"] },
  { slot: "RB1", position: ["RB"] },
  { slot: "RB2", position: ["RB"] },
  { slot: "WR1", position: ["WR"] },
  { slot: "WR2", position: ["WR"] },
  { slot: "TE", position: ["TE"] },
  { slot: "FLEX", position: ["RB", "WR", "TE"], isFlex: true },
  { slot: "K", position: ["K"] },
  { slot: "DEF", position: ["DEF"] },
  { slot: "BN1", position: ["QB", "RB", "WR", "TE", "K", "DEF"], isBench: true },
  { slot: "BN2", position: ["QB", "RB", "WR", "TE", "K", "DEF"], isBench: true },
  { slot: "BN3", position: ["QB", "RB", "WR", "TE", "K", "DEF"], isBench: true },
];

export interface RosterAssignment {
  slot: string;
  player: Player | null;
  isFlex?: boolean;
  isBench?: boolean;
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

// Assigns players to roster slots intelligently
export function assignPlayersToRoster(players: Player[]): RosterAssignment[] {
  const assignments: RosterAssignment[] = ROSTER_SLOTS.map((slot) => ({
    slot: slot.slot,
    player: null,
    isFlex: slot.isFlex,
    isBench: slot.isBench,
  }));

  const assignedPlayerIds = new Set<string>();

  // First pass: fill required positions (non-flex, non-bench)
  for (const assignment of assignments) {
    if (assignment.isFlex || assignment.isBench) continue;

    const slot = ROSTER_SLOTS.find((s) => s.slot === assignment.slot)!;
    const eligiblePlayer = players.find(
      (p) => slot.position.includes(p.position) && !assignedPlayerIds.has(p.id)
    );

    if (eligiblePlayer) {
      assignment.player = eligiblePlayer;
      assignedPlayerIds.add(eligiblePlayer.id);
    }
  }

  // Second pass: fill FLEX positions
  for (const assignment of assignments) {
    if (!assignment.isFlex) continue;

    const slot = ROSTER_SLOTS.find((s) => s.slot === assignment.slot)!;
    const eligiblePlayer = players.find(
      (p) => slot.position.includes(p.position) && !assignedPlayerIds.has(p.id)
    );

    if (eligiblePlayer) {
      assignment.player = eligiblePlayer;
      assignedPlayerIds.add(eligiblePlayer.id);
    }
  }

  // Third pass: fill bench positions
  for (const assignment of assignments) {
    if (!assignment.isBench) continue;

    const remainingPlayer = players.find(
      (p) => !assignedPlayerIds.has(p.id)
    );

    if (remainingPlayer) {
      assignment.player = remainingPlayer;
      assignedPlayerIds.add(remainingPlayer.id);
    }
  }

  return assignments;
}

interface RosterDisplayProps {
  players: Player[];
  ppr: boolean;
  userSlot: number;
  title?: string;
}

export default function RosterDisplay({
  players,
  ppr,
  userSlot,
  title = "Your Team",
}: RosterDisplayProps) {
  const roster = assignPlayersToRoster(players);

  const getScore = (player: Player) => {
    const points = ppr ? player.projectedPointsPPR : player.projectedPoints;
    return points.toFixed(1);
  };

  const getDisplayPosition = (assignment: RosterAssignment) => {
    if (!assignment.player) return assignment.slot;
    if (assignment.isFlex) {
      return `${assignment.player.position} (FLEX)`;
    }
    if (assignment.isBench) {
      return `${assignment.player.position} (BN)`;
    }
    return assignment.player.position;
  };

  return (
    <Card className="shadow-card border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 rounded-md gradient-primary">
            <Users className="h-4 w-4 text-primary-foreground" />
          </div>
          {title}
          <Badge variant="secondary" className="ml-auto">
            Pick #{userSlot}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {roster.map((assignment, idx) => (
              <div
                key={assignment.slot}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors animate-fade-in ${
                  assignment.isBench
                    ? "bg-muted/30"
                    : "bg-secondary/50 hover:bg-secondary/80"
                }`}
              >
                <span className="text-xs font-mono text-muted-foreground w-8">
                  {assignment.isBench ? "BN" : idx < 9 ? `R${idx + 1}` : ""}
                </span>
                {assignment.player ? (
                  <>
                    <Badge
                      variant="outline"
                      className={`${getPositionClass(assignment.player.position)} border-0 font-semibold text-xs px-2 min-w-[70px] justify-center`}
                    >
                      {getDisplayPosition(assignment)}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {assignment.player.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {assignment.player.team}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-accent">
                      {getScore(assignment.player)} pts
                    </span>
                  </>
                ) : (
                  <>
                    <Badge
                      variant="outline"
                      className="border-dashed text-muted-foreground text-xs px-2 min-w-[70px] justify-center"
                    >
                      {assignment.slot}
                    </Badge>
                    <span className="text-sm text-muted-foreground italic">
                      Empty
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
