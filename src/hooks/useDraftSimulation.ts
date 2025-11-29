import { useState, useCallback, useRef } from "react";
import { Player } from "../lib/mockPlayers";

interface DraftConfig {
  players: Player[];
  numTeams: number;
  snake: boolean;
  ppr: boolean;
  userSlot: number;
  rounds: number;
}

interface DraftState {
  isRunning: boolean;
  isPaused: boolean;
  currentRound: number;
  currentPick: number;
  allTeams: Player[][];
  draftRounds: Player[][];
  availablePlayers: Player[];
  isUserTurn: boolean;
  recommendedPlayer: Player | null;
  isComplete: boolean;
}

// Simple AI logic: pick best available player by projected points
function pickBestAvailable(
  available: Player[],
  ppr: boolean,
  teamRoster: Player[]
): Player {
  // Get position counts on team
  const posCounts = {
    QB: teamRoster.filter((p) => p.position === "QB").length,
    RB: teamRoster.filter((p) => p.position === "RB").length,
    WR: teamRoster.filter((p) => p.position === "WR").length,
    TE: teamRoster.filter((p) => p.position === "TE").length,
    K: teamRoster.filter((p) => p.position === "K").length,
    DEF: teamRoster.filter((p) => p.position === "DEF").length,
  };

  // Filter out positions we have too many of
  const filtered = available.filter((p) => {
    if (p.position === "QB" && posCounts.QB >= 2) return false;
    if (p.position === "RB" && posCounts.RB >= 5) return false;
    if (p.position === "WR" && posCounts.WR >= 5) return false;
    if (p.position === "TE" && posCounts.TE >= 2) return false;
    if (p.position === "K" && posCounts.K >= 1) return false;
    if (p.position === "DEF" && posCounts.DEF >= 1) return false;
    return true;
  });

  const pool = filtered.length > 0 ? filtered : available;

  // Sort by projected points
  const sorted = [...pool].sort((a, b) => {
    const aPoints = ppr ? a.projectedPointsPPR : a.projectedPoints;
    const bPoints = ppr ? b.projectedPointsPPR : b.projectedPoints;
    return bPoints - aPoints;
  });

  // Add some randomness for AI teams (pick from top 3)
  const topN = sorted.slice(0, 3);
  return topN[Math.floor(Math.random() * topN.length)];
}

export function useDraftSimulation(config: DraftConfig) {
  const [state, setState] = useState<DraftState>({
    isRunning: false,
    isPaused: false,
    currentRound: 0,
    currentPick: 0,
    allTeams: [],
    draftRounds: [],
    availablePlayers: [],
    isUserTurn: false,
    recommendedPlayer: null,
    isComplete: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const initDraft = useCallback(() => {
    const allTeams: Player[][] = Array.from(
      { length: config.numTeams },
      () => []
    );
    setState({
      isRunning: true,
      isPaused: false,
      currentRound: 1,
      currentPick: 1,
      allTeams,
      draftRounds: [[]],
      availablePlayers: [...config.players],
      isUserTurn: config.userSlot === 1,
      recommendedPlayer: null,
      isComplete: false,
    });
  }, [config]);

  const getTeamIndexForPick = useCallback(
    (round: number, pick: number) => {
      if (config.snake && round % 2 === 0) {
        return config.numTeams - pick;
      }
      return pick - 1;
    },
    [config.numTeams, config.snake]
  );

  const isUserPickPosition = useCallback(
    (round: number, pick: number) => {
      const teamIndex = getTeamIndexForPick(round, pick);
      return teamIndex === config.userSlot - 1;
    },
    [config.userSlot, getTeamIndexForPick]
  );

  const makePick = useCallback(
    (player: Player) => {
      setState((prev) => {
        const teamIndex = getTeamIndexForPick(prev.currentRound, prev.currentPick);
        const newTeams = [...prev.allTeams];
        newTeams[teamIndex] = [...newTeams[teamIndex], player];

        const newAvailable = prev.availablePlayers.filter(
          (p) => p.id !== player.id
        );

        const newRounds = [...prev.draftRounds];
        const currentRoundPicks = [...(newRounds[prev.currentRound - 1] || [])];
        currentRoundPicks.push(player);
        newRounds[prev.currentRound - 1] = currentRoundPicks;

        // Calculate next pick
        let nextRound = prev.currentRound;
        let nextPick = prev.currentPick + 1;

        if (nextPick > config.numTeams) {
          nextRound++;
          nextPick = 1;
          if (nextRound <= config.rounds) {
            newRounds.push([]);
          }
        }

        const isComplete = nextRound > config.rounds;
        const isNextUserTurn =
          !isComplete && isUserPickPosition(nextRound, nextPick);

        return {
          ...prev,
          allTeams: newTeams,
          availablePlayers: newAvailable,
          draftRounds: newRounds,
          currentRound: nextRound,
          currentPick: nextPick,
          isUserTurn: isNextUserTurn,
          recommendedPlayer: null,
          isComplete,
          isRunning: !isComplete,
        };
      });
    },
    [config.numTeams, config.rounds, getTeamIndexForPick, isUserPickPosition]
  );

  const processNextPick = useCallback(() => {
    const currentState = stateRef.current;

    if (currentState.isComplete || !currentState.isRunning) return;

    const teamIndex = getTeamIndexForPick(
      currentState.currentRound,
      currentState.currentPick
    );
    const isUserTurn = teamIndex === config.userSlot - 1;

    if (isUserTurn) {
      // Calculate recommended player for user
      const recommended = pickBestAvailable(
        currentState.availablePlayers,
        config.ppr,
        currentState.allTeams[teamIndex]
      );
      setState((prev) => ({
        ...prev,
        isUserTurn: true,
        recommendedPlayer: recommended,
      }));
      return;
    }

    // AI pick
    const aiPick = pickBestAvailable(
      currentState.availablePlayers,
      config.ppr,
      currentState.allTeams[teamIndex]
    );

    makePick(aiPick);

    // Schedule next pick with 1 second delay
    timeoutRef.current = setTimeout(() => {
      processNextPick();
    }, 1000);
  }, [config.ppr, config.userSlot, getTeamIndexForPick, makePick]);

  const startDraft = useCallback(() => {
    initDraft();
    // Start processing after a short delay to allow state to initialize
    setTimeout(() => {
      processNextPick();
    }, 100);
  }, [initDraft, processNextPick]);

  const handleUserPick = useCallback(
    (player: Player) => {
      makePick(player);
      // Continue draft after user pick
      timeoutRef.current = setTimeout(() => {
        processNextPick();
      }, 1000);
    },
    [makePick, processNextPick]
  );

  const resetDraft = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState({
      isRunning: false,
      isPaused: false,
      currentRound: 0,
      currentPick: 0,
      allTeams: [],
      draftRounds: [],
      availablePlayers: [],
      isUserTurn: false,
      recommendedPlayer: null,
      isComplete: false,
    });
  }, []);

  return {
    ...state,
    userTeam: state.allTeams[config.userSlot - 1] || [],
    startDraft,
    handleUserPick,
    resetDraft,
  };
}
