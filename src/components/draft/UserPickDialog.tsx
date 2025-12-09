import React from "react";
import { Player } from "../../lib/mockPlayers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Check, Search } from "lucide-react";
import { Input } from "../ui/input";

interface UserPickDialogProps {
  open: boolean;
  round: number;
  pick: number;
  recommendedPlayer: Player | null;
  availablePlayers: Player[];
  ppr: boolean;
  onSelect: (player: Player) => void;
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

export default function UserPickDialog({
  open,
  round,
  pick,
  recommendedPlayer,
  availablePlayers,
  ppr,
  onSelect,
}: UserPickDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPlayers = availablePlayers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScore = (player: Player) => {
    const points = ppr ? player.projectedPointsPPR : player.projectedPoints;
    return points.toFixed(1);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Round {round}, Pick {pick}: Your Turn!
          </DialogTitle>
          <DialogDescription>
            {recommendedPlayer
              ? `Draft ${recommendedPlayer.name} (${recommendedPlayer.team} - ${recommendedPlayer.position})?`
              : "Select a player from the available list"}
          </DialogDescription>
        </DialogHeader>

        {recommendedPlayer && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Recommended Pick:
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={`${getPositionClass(recommendedPlayer.position)} border-0 font-semibold`}
                >
                  {recommendedPlayer.position}
                </Badge>
                <div>
                  <p className="font-semibold">{recommendedPlayer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {recommendedPlayer.team} · {getScore(recommendedPlayer)} pts
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onSelect(recommendedPlayer)}
                className="gradient-primary"
              >
                <Check className="h-4 w-4 mr-2" />
                Draft
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary"
            />
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer"
                  onClick={() => onSelect(player)}
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={`${getPositionClass(player.position)} border-0 font-semibold text-xs`}
                    >
                      {player.position}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{player.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {player.team}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {getScore(player)} pts
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
