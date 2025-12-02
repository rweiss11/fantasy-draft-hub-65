export interface Player {
  id: string;
  name: string;
  team: string;
  position: "QB" | "RB" | "WR" | "TE" | "K" | "DEF";
  adp: number; // Average Draft Position
  projectedPoints: number;
  projectedPointsPPR: number;
  commentary?: string; // AI-generated commentary for recommended picks
}

export const mockPlayers: Player[] = [
  // QBs
  { id: "qb1", name: "Josh Allen", team: "BUF", position: "QB", adp: 15, projectedPoints: 380, projectedPointsPPR: 380 },
  { id: "qb2", name: "Jalen Hurts", team: "PHI", position: "QB", adp: 18, projectedPoints: 370, projectedPointsPPR: 370 },
  { id: "qb3", name: "Patrick Mahomes", team: "KC", position: "QB", adp: 25, projectedPoints: 350, projectedPointsPPR: 350 },
  { id: "qb4", name: "Lamar Jackson", team: "BAL", position: "QB", adp: 30, projectedPoints: 345, projectedPointsPPR: 345 },
  { id: "qb5", name: "CJ Stroud", team: "HOU", position: "QB", adp: 55, projectedPoints: 320, projectedPointsPPR: 320 },
  { id: "qb6", name: "Joe Burrow", team: "CIN", position: "QB", adp: 60, projectedPoints: 315, projectedPointsPPR: 315 },
  { id: "qb7", name: "Kyler Murray", team: "ARI", position: "QB", adp: 75, projectedPoints: 300, projectedPointsPPR: 300 },
  { id: "qb8", name: "Dak Prescott", team: "DAL", position: "QB", adp: 85, projectedPoints: 290, projectedPointsPPR: 290 },
  { id: "qb9", name: "Anthony Richardson", team: "IND", position: "QB", adp: 90, projectedPoints: 280, projectedPointsPPR: 280 },
  { id: "qb10", name: "Caleb Williams", team: "CHI", position: "QB", adp: 100, projectedPoints: 270, projectedPointsPPR: 270 },

  // RBs
  { id: "rb1", name: "Christian McCaffrey", team: "SF", position: "RB", adp: 1, projectedPoints: 320, projectedPointsPPR: 380 },
  { id: "rb2", name: "Breece Hall", team: "NYJ", position: "RB", adp: 3, projectedPoints: 280, projectedPointsPPR: 340 },
  { id: "rb3", name: "Bijan Robinson", team: "ATL", position: "RB", adp: 4, projectedPoints: 275, projectedPointsPPR: 330 },
  { id: "rb4", name: "Jahmyr Gibbs", team: "DET", position: "RB", adp: 6, projectedPoints: 260, projectedPointsPPR: 320 },
  { id: "rb5", name: "Jonathan Taylor", team: "IND", position: "RB", adp: 8, projectedPoints: 255, projectedPointsPPR: 300 },
  { id: "rb6", name: "Derrick Henry", team: "BAL", position: "RB", adp: 12, projectedPoints: 250, projectedPointsPPR: 280 },
  { id: "rb7", name: "Saquon Barkley", team: "PHI", position: "RB", adp: 14, projectedPoints: 245, projectedPointsPPR: 305 },
  { id: "rb8", name: "Travis Etienne", team: "JAC", position: "RB", adp: 16, projectedPoints: 240, projectedPointsPPR: 290 },
  { id: "rb9", name: "De'Von Achane", team: "MIA", position: "RB", adp: 10, projectedPoints: 235, projectedPointsPPR: 295 },
  { id: "rb10", name: "Kyren Williams", team: "LAR", position: "RB", adp: 20, projectedPoints: 230, projectedPointsPPR: 270 },
  { id: "rb11", name: "Josh Jacobs", team: "GB", position: "RB", adp: 22, projectedPoints: 225, projectedPointsPPR: 265 },
  { id: "rb12", name: "Isiah Pacheco", team: "KC", position: "RB", adp: 24, projectedPoints: 220, projectedPointsPPR: 255 },
  { id: "rb13", name: "Joe Mixon", team: "HOU", position: "RB", adp: 28, projectedPoints: 215, projectedPointsPPR: 260 },
  { id: "rb14", name: "Rachaad White", team: "TB", position: "RB", adp: 35, projectedPoints: 200, projectedPointsPPR: 250 },
  { id: "rb15", name: "James Cook", team: "BUF", position: "RB", adp: 38, projectedPoints: 195, projectedPointsPPR: 245 },
  { id: "rb16", name: "Zamir White", team: "LV", position: "RB", adp: 50, projectedPoints: 190, projectedPointsPPR: 220 },
  { id: "rb17", name: "David Montgomery", team: "DET", position: "RB", adp: 58, projectedPoints: 180, projectedPointsPPR: 210 },
  { id: "rb18", name: "Rhamondre Stevenson", team: "NE", position: "RB", adp: 65, projectedPoints: 175, projectedPointsPPR: 215 },

  // WRs
  { id: "wr1", name: "CeeDee Lamb", team: "DAL", position: "WR", adp: 2, projectedPoints: 280, projectedPointsPPR: 350 },
  { id: "wr2", name: "Tyreek Hill", team: "MIA", position: "WR", adp: 5, projectedPoints: 270, projectedPointsPPR: 340 },
  { id: "wr3", name: "Ja'Marr Chase", team: "CIN", position: "WR", adp: 7, projectedPoints: 265, projectedPointsPPR: 335 },
  { id: "wr4", name: "Amon-Ra St. Brown", team: "DET", position: "WR", adp: 9, projectedPoints: 255, projectedPointsPPR: 330 },
  { id: "wr5", name: "A.J. Brown", team: "PHI", position: "WR", adp: 11, projectedPoints: 250, projectedPointsPPR: 315 },
  { id: "wr6", name: "Garrett Wilson", team: "NYJ", position: "WR", adp: 13, projectedPoints: 240, projectedPointsPPR: 305 },
  { id: "wr7", name: "Marvin Harrison Jr.", team: "ARI", position: "WR", adp: 17, projectedPoints: 235, projectedPointsPPR: 295 },
  { id: "wr8", name: "Puka Nacua", team: "LAR", position: "WR", adp: 19, projectedPoints: 230, projectedPointsPPR: 300 },
  { id: "wr9", name: "Davante Adams", team: "LV", position: "WR", adp: 21, projectedPoints: 225, projectedPointsPPR: 290 },
  { id: "wr10", name: "Chris Olave", team: "NO", position: "WR", adp: 23, projectedPoints: 220, projectedPointsPPR: 285 },
  { id: "wr11", name: "DeVonta Smith", team: "PHI", position: "WR", adp: 26, projectedPoints: 215, projectedPointsPPR: 275 },
  { id: "wr12", name: "Nico Collins", team: "HOU", position: "WR", adp: 27, projectedPoints: 210, projectedPointsPPR: 265 },
  { id: "wr13", name: "DK Metcalf", team: "SEA", position: "WR", adp: 32, projectedPoints: 205, projectedPointsPPR: 255 },
  { id: "wr14", name: "Drake London", team: "ATL", position: "WR", adp: 34, projectedPoints: 200, projectedPointsPPR: 260 },
  { id: "wr15", name: "Brandon Aiyuk", team: "SF", position: "WR", adp: 36, projectedPoints: 195, projectedPointsPPR: 250 },
  { id: "wr16", name: "Stefon Diggs", team: "HOU", position: "WR", adp: 40, projectedPoints: 190, projectedPointsPPR: 245 },
  { id: "wr17", name: "Mike Evans", team: "TB", position: "WR", adp: 42, projectedPoints: 185, projectedPointsPPR: 235 },
  { id: "wr18", name: "DJ Moore", team: "CHI", position: "WR", adp: 45, projectedPoints: 180, projectedPointsPPR: 235 },
  { id: "wr19", name: "Jaylen Waddle", team: "MIA", position: "WR", adp: 48, projectedPoints: 175, projectedPointsPPR: 230 },
  { id: "wr20", name: "Tee Higgins", team: "CIN", position: "WR", adp: 52, projectedPoints: 170, projectedPointsPPR: 225 },
  { id: "wr21", name: "Amari Cooper", team: "CLE", position: "WR", adp: 56, projectedPoints: 165, projectedPointsPPR: 215 },
  { id: "wr22", name: "DeAndre Hopkins", team: "TEN", position: "WR", adp: 62, projectedPoints: 160, projectedPointsPPR: 205 },
  { id: "wr23", name: "Terry McLaurin", team: "WAS", position: "WR", adp: 68, projectedPoints: 155, projectedPointsPPR: 200 },
  { id: "wr24", name: "Keenan Allen", team: "CHI", position: "WR", adp: 72, projectedPoints: 150, projectedPointsPPR: 205 },

  // TEs
  { id: "te1", name: "Sam LaPorta", team: "DET", position: "TE", adp: 29, projectedPoints: 180, projectedPointsPPR: 230 },
  { id: "te2", name: "Travis Kelce", team: "KC", position: "TE", adp: 31, projectedPoints: 175, projectedPointsPPR: 225 },
  { id: "te3", name: "Mark Andrews", team: "BAL", position: "TE", adp: 44, projectedPoints: 160, projectedPointsPPR: 200 },
  { id: "te4", name: "T.J. Hockenson", team: "MIN", position: "TE", adp: 54, projectedPoints: 145, projectedPointsPPR: 190 },
  { id: "te5", name: "George Kittle", team: "SF", position: "TE", adp: 59, projectedPoints: 140, projectedPointsPPR: 175 },
  { id: "te6", name: "Dallas Goedert", team: "PHI", position: "TE", adp: 70, projectedPoints: 130, projectedPointsPPR: 165 },
  { id: "te7", name: "Evan Engram", team: "JAC", position: "TE", adp: 78, projectedPoints: 120, projectedPointsPPR: 165 },
  { id: "te8", name: "David Njoku", team: "CLE", position: "TE", adp: 88, projectedPoints: 115, projectedPointsPPR: 155 },
  { id: "te9", name: "Dalton Kincaid", team: "BUF", position: "TE", adp: 64, projectedPoints: 125, projectedPointsPPR: 170 },
  { id: "te10", name: "Kyle Pitts", team: "ATL", position: "TE", adp: 82, projectedPoints: 110, projectedPointsPPR: 145 },

  // Kickers
  { id: "k1", name: "Justin Tucker", team: "BAL", position: "K", adp: 140, projectedPoints: 150, projectedPointsPPR: 150 },
  { id: "k2", name: "Harrison Butker", team: "KC", position: "K", adp: 145, projectedPoints: 145, projectedPointsPPR: 145 },
  { id: "k3", name: "Brandon Aubrey", team: "DAL", position: "K", adp: 148, projectedPoints: 140, projectedPointsPPR: 140 },
  { id: "k4", name: "Jake Elliott", team: "PHI", position: "K", adp: 152, projectedPoints: 135, projectedPointsPPR: 135 },
  { id: "k5", name: "Tyler Bass", team: "BUF", position: "K", adp: 155, projectedPoints: 130, projectedPointsPPR: 130 },

  // Defenses
  { id: "def1", name: "San Francisco 49ers", team: "SF", position: "DEF", adp: 120, projectedPoints: 140, projectedPointsPPR: 140 },
  { id: "def2", name: "Dallas Cowboys", team: "DAL", position: "DEF", adp: 125, projectedPoints: 135, projectedPointsPPR: 135 },
  { id: "def3", name: "Buffalo Bills", team: "BUF", position: "DEF", adp: 128, projectedPoints: 130, projectedPointsPPR: 130 },
  { id: "def4", name: "Miami Dolphins", team: "MIA", position: "DEF", adp: 132, projectedPoints: 125, projectedPointsPPR: 125 },
  { id: "def5", name: "Cleveland Browns", team: "CLE", position: "DEF", adp: 135, projectedPoints: 120, projectedPointsPPR: 120 },
];
