import { Player } from "./mockPlayers";

export interface DraftConfig {
  players: Player[];
  numTeams: number;
  snake: boolean;
  ppr: boolean;
  userSlot: number;
  rounds: number;
}

export interface DraftResult {
  rounds: Player[][];
  userTeam: Player[];
  allTeams: Player[][];
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

export function runDraft(config: DraftConfig): DraftResult {
  const { players, numTeams, snake, ppr, userSlot, rounds } = config;

  // Initialize
  const available = [...players];
  const allTeams: Player[][] = Array.from({ length: numTeams }, () => []);
  const draftRounds: Player[][] = [];

  for (let round = 0; round < rounds; round++) {
    const roundPicks: Player[] = [];

    // Determine order for this round
    let order = Array.from({ length: numTeams }, (_, i) => i);
    if (snake && round % 2 === 1) {
      order = order.reverse();
    }

    for (const teamIndex of order) {
      if (available.length === 0) break;

      const isUserPick = teamIndex === userSlot - 1;
      let pick: Player;

      if (isUserPick) {
        // For prototype, user auto-drafts best available too
        // In full version, this would be interactive
        pick = pickBestAvailable(available, ppr, allTeams[teamIndex]);
      } else {
        pick = pickBestAvailable(available, ppr, allTeams[teamIndex]);
      }

      // Remove from available
      const idx = available.findIndex((p) => p.id === pick.id);
      if (idx !== -1) {
        available.splice(idx, 1);
      }

      allTeams[teamIndex].push(pick);
      roundPicks.push(pick);
    }

    draftRounds.push(roundPicks);
  }

  return {
    rounds: draftRounds,
    userTeam: allTeams[userSlot - 1] || [],
    allTeams,
  };
}
