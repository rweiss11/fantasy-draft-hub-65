import React, { useState } from "react";
import { mockPlayers } from "../lib/mockPlayers";
import { useDraftSimulation } from "../hooks/useDraftSimulation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Trophy, RotateCcw } from "lucide-react";
import DraftSettings from "./draft/DraftSettings";
import DraftBoard from "./draft/DraftBoard";
import RosterDisplay from "./draft/RosterDisplay";
import UserPickDialog from "./draft/UserPickDialog";

export default function DraftDashboard() {
  const [numTeams, setNumTeams] = useState(10);
  const [isSnake, setIsSnake] = useState(true);
  const [isPPR, setIsPPR] = useState(true);
  const [userSlot, setUserSlot] = useState(7);

  const {
    isRunning,
    isComplete,
    currentRound,
    currentPick,
    draftRounds,
    availablePlayers,
    userTeam,
    isUserTurn,
    recommendedPlayer,
    startDraft,
    handleUserPick,
    resetDraft,
  } = useDraftSimulation({
    players: mockPlayers,
    numTeams,
    snake: isSnake,
    ppr: isPPR,
    userSlot,
    rounds: 12,
  });

  const showSettings = !isRunning && !isComplete;
  const showDraft = isRunning || isComplete;

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
                {isRunning
                  ? `Round ${currentRound}, Pick ${currentPick}`
                  : isComplete
                    ? "Draft Complete"
                    : "Mock Draft Simulator"}
              </p>
            </div>
            {isRunning && (
              <Badge className="ml-auto animate-pulse" variant="secondary">
                Draft in Progress
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showSettings && (
          <DraftSettings
            numTeams={numTeams}
            setNumTeams={setNumTeams}
            userSlot={userSlot}
            setUserSlot={setUserSlot}
            isSnake={isSnake}
            setIsSnake={setIsSnake}
            isPPR={isPPR}
            setIsPPR={setIsPPR}
            onStartDraft={startDraft}
            isRunning={isRunning}
          />
        )}

        {showDraft && (
          <div className="space-y-6 animate-fade-in">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-accent" />
                  {isComplete ? "Draft Complete" : "Live Draft"}
                </h2>
                <p className="text-muted-foreground">
                  {numTeams} teams · {isSnake ? "Snake" : "Linear"} ·{" "}
                  {isPPR ? "PPR" : "Standard"}
                </p>
              </div>
              {isComplete && (
                <Button
                  variant="outline"
                  onClick={resetDraft}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  New Draft
                </Button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Your Team */}
              <RosterDisplay
                players={userTeam}
                ppr={isPPR}
                userSlot={userSlot}
              />

              {/* Full Draft Board */}
              <div className="lg:col-span-2">
                <DraftBoard
                  rounds={draftRounds}
                  currentRound={currentRound}
                  currentPick={currentPick}
                  userSlot={userSlot}
                  numTeams={numTeams}
                  isSnake={isSnake}
                  ppr={isPPR}
                />
              </div>
            </div>
          </div>
        )}

        {/* User Pick Dialog */}
        <UserPickDialog
          open={isUserTurn}
          round={currentRound}
          pick={currentPick}
          recommendedPlayer={recommendedPlayer}
          availablePlayers={availablePlayers}
          ppr={isPPR}
          onSelect={handleUserPick}
        />
      </main>
    </div>
  );
}
