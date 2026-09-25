export const GRID_SIZE = 5
export const ROUNDS_TO_WIN = 2
export const TOTAL_ROUNDS = 3

export type Screen = "start" | "teamAssignment" | "game" | "roundWin" | "gameOver"
export type TeamColor = "green" | "orange"
export type ThemeName = "default" | "dark" | "highContrast"
export type ClaimedBy = "green" | "orange" | null

export interface GridCell {
  q: number
  r: number
  letter: string
  claimedBy: ClaimedBy
}

export interface GameState {
  screen: Screen
  roundNumber: number
  greenTeamName: string
  orangeTeamName: string
  greenScore: number
  orangeScore: number
  grid: GridCell[]
  activeCell: { q: number; r: number } | null
  theme: ThemeName
  fontSize: number
  fullscreen: boolean
  sound: boolean
  _lastWinner: TeamColor | undefined
  _gameWinner: TeamColor | undefined
}

export interface StartGameAction {
  type: "START_GAME"
  greenTeamName: string
  orangeTeamName: string
}

export interface ActivateCellAction {
  type: "ACTIVATE_CELL"
  q: number
  r: number
}

export interface ClaimCellAction {
  type: "CLAIM_CELL"
  team: TeamColor
}

export interface EndRoundAction {
  type: "END_ROUND"
}

export interface PlayAgainAction {
  type: "PLAY_AGAIN"
}

export interface RestartGameAction {
  type: "RESTART_GAME"
}

export interface SetGreenNameAction {
  type: "SET_GREEN_NAME"
  value: string
}

export interface SetOrangeNameAction {
  type: "SET_ORANGE_NAME"
  value: string
}

export interface SetThemeAction {
  type: "SET_THEME"
  theme: ThemeName
}

export interface SetFontSizeAction {
  type: "SET_FONT_SIZE"
  fontSize: number
}

export interface ToggleFullscreenAction {
  type: "TOGGLE_FULLSCREEN"
}

export interface ToggleSoundAction {
  type: "TOGGLE_SOUND"
}

export interface GoToTeamAssignmentAction {
  type: "GO_TO_TEAM_ASSIGNMENT"
}

export interface GoToGameAction {
  type: "GO_TO_GAME"
}

export type Action =
  | StartGameAction
  | ActivateCellAction
  | ClaimCellAction
  | EndRoundAction
  | PlayAgainAction
  | RestartGameAction
  | SetGreenNameAction
  | SetOrangeNameAction
  | SetThemeAction
  | SetFontSizeAction
  | ToggleFullscreenAction
  | ToggleSoundAction
  | GoToTeamAssignmentAction
  | GoToGameAction

export const LETTER_POOL = [
  "ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر",
  "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف",
  "ق", "ك", "ل", "م", "ن", "ه", "و", "ي",
]

export const ROUND_NAMES = [
  "الجولة الأولى",
  "الجولة الثانية",
  "الجولة الثالثة",
]

export const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

export const THEMES = {
  default: {
    name: "افتراضي",
    pageBg: "#4a2168",
    cellBg: "#ffffff",
    cellText: "#6a3a9e",
    cellOutline: "#6a3a9e",
    sidebarBg: "#6a3a9e",
    sidebarText: "#ffffff",
    green: "#3bb319",
    orange: "#ff7836",
    activeHighlight: "#ffd93d",
    roundTitle: "#e8c81e",
    textMuted: "rgba(255,255,255,0.7)",
    inputBg: "rgba(255,255,255,0.12)",
    inputBorder: "rgba(255,255,255,0.25)",
    inputText: "#ffffff",
    buttonGreen: "#3bb319",
    buttonOrange: "#ff7836",
    endRoundBtn: "#ffd93d",
    modalBg: "rgba(0,0,0,0.7)",
    cardBg: "#6a3a9e",
    cardBorder: "#ffffff",
    dropShadow: "#d83030",
  },
  dark: {
    name: "داكن",
    pageBg: "#0a0a14",
    cellBg: "#1a1a2e",
    cellText: "#f0f0f0",
    cellOutline: "#4a3f8a",
    sidebarBg: "#4a3f8a",
    sidebarText: "#f0f0f0",
    green: "#00c9a0",
    orange: "#ff5e5e",
    activeHighlight: "#ffcb3d",
    roundTitle: "#ffcb3d",
    textMuted: "rgba(255,255,255,0.6)",
    inputBg: "rgba(255,255,255,0.08)",
    inputBorder: "rgba(255,255,255,0.2)",
    inputText: "#f0f0f0",
    buttonGreen: "#00c9a0",
    buttonOrange: "#ff5e5e",
    endRoundBtn: "#ffcb3d",
    modalBg: "rgba(0,0,0,0.8)",
    cardBg: "#12122a",
    cardBorder: "#4a3f8a",
    dropShadow: "#ff3b30",
  },
  highContrast: {
    name: "تباين عالي",
    pageBg: "#ffffff",
    cellBg: "#ffffff",
    cellText: "#000000",
    cellOutline: "#000000",
    sidebarBg: "#1a1a2e",
    sidebarText: "#ffffff",
    green: "#008800",
    orange: "#cc3300",
    activeHighlight: "#ffdd00",
    roundTitle: "#000000",
    textMuted: "rgba(0,0,0,0.6)",
    inputBg: "#ffffff",
    inputBorder: "#000000",
    inputText: "#000000",
    buttonGreen: "#008800",
    buttonOrange: "#cc3300",
    endRoundBtn: "#ffdd00",
    modalBg: "rgba(0,0,0,0.85)",
    cardBg: "#ffffff",
    cardBorder: "#000000",
    dropShadow: "#000000",
  },
} as const

export const FONT_SIZES: Record<string, number> = {
  small: 14,
  medium: 18,
  large: 22,
  xlarge: 28,
}

export type FontSizeName = keyof typeof FONT_SIZES

export const FONT_SIZE_LABELS: Record<FontSizeName, string> = {
  small: "صغير",
  medium: "متوسط",
  large: "كبير",
  xlarge: "كبير جداً",
}

export const CELL_PADDING_FACTOR = 0.12
export const CELL_OUTLINE_WIDTH = 3
export const HEX_POINT_RADIUS_FACTOR = 0.5
export const CELL_GAP = 4

export const ROUND_WIN_AUTO_DELAY_MS = 2500
export const GAME_OVER_DELAY_MS = 3000

export function getCellSize(containerWidth: number, containerHeight: number): number {
  const cols = GRID_SIZE
  const rows = GRID_SIZE
  const gap = CELL_GAP
  const paddingX = 40
  const paddingY = 40
  const usableW = containerWidth - paddingX * 2 - gap * (cols - 1)
  const usableH = containerHeight - paddingY * 2 - gap * (rows - 1)
  const cellByW = usableW / cols
  const cellByH = usableH / rows
  const cellByAspect = cellByH * (Math.sqrt(3) / 2)
  return Math.min(cellByW, cellByAspect, 160)
}

export function getHexPoints(cx: number, cy: number, r: number): string {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30)
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(" ")
}

export function getCellPolygonPoints(cellSize: number): string {
  const r = cellSize / 2
  return getHexPoints(r, r, r)
}

export function canTeamWin(team: "green" | "orange"): { edgeStart: "col" | "row"; edgeStartValue: number; edgeEnd: "col" | "row"; edgeEndValue: number } {
  if (team === "green") {
    // green connects top <-> bottom (rows)
    return { edgeStart: "row", edgeStartValue: 0, edgeEnd: "row", edgeEndValue: GRID_SIZE - 1 }
  } else {
    // orange connects left <-> right (columns)
    return { edgeStart: "col", edgeStartValue: 0, edgeEnd: "col", edgeEndValue: GRID_SIZE - 1 }
  }
}

export function getNeighbors(q: number, r: number, grid: GridCell[]): GridCell[] {
  // The grid uses an odd-r horizontal hex layout: rows where r is odd are
  // shifted right by half a cell. That shift flips which two cells are the
  // diagonal neighbors, so the offsets are parity-aware to match how the
  // board is actually drawn (otherwise visually-connected paths don't count).
  const rowEven = r % 2 === 0
  const offsets: Array<[number, number]> = rowEven
    ? [
        [1, 0], [-1, 0],
        [0, -1], [-1, -1],
        [0, 1], [-1, 1],
      ]
    : [
        [1, 0], [-1, 0],
        [0, -1], [1, -1],
        [0, 1], [1, 1],
      ]
  const result: GridCell[] = []
  for (const [dq, dr] of offsets) {
    const nq = q + dq
    const nr = r + dr
    if (nq < 0 || nq >= GRID_SIZE || nr < 0 || nr >= GRID_SIZE) continue
    const cell = grid.find(c => c.q === nq && c.r === nr)
    if (cell) result.push(cell)
  }
  return result
}

export function getEdgeCells(axis: "col" | "row", value: number, grid: GridCell[]): GridCell[] {
  return grid.filter(c => (axis === "col" ? c.q : c.r) === value)
}

export function checkWin(grid: GridCell[], team: "green" | "orange"): boolean {
  // Each team wins ONLY by connecting its two specific opposite edges:
  //   Green  -> top <-> bottom (row 0 -> row N-1)
  //   Orange -> left <-> right (col 0 -> col N-1)
  if (team === "green") {
    return pathConnectsEdges(grid, team, "row")
  }
  return pathConnectsEdges(grid, team, "col")
}

function pathConnectsEdges(grid: GridCell[], team: "green" | "orange", axis: "col" | "row"): boolean {
  // axis "col": connect col 0 -> col GRID_SIZE-1 (left <-> right)
  // axis "row": connect row 0 -> row GRID_SIZE-1 (top <-> bottom)
  const coord = (c: GridCell) => (axis === "col" ? c.q : c.r)
  const starts = grid.filter(c => c.claimedBy === team && coord(c) === 0)
  if (starts.length === 0) return false

  const visited = new Set<string>()
  const queue: GridCell[] = [...starts]
  for (const cell of starts) visited.add(`${cell.q},${cell.r}`)

  let head = 0
  while (head < queue.length) {
    const cell = queue[head++]
    if (coord(cell) === GRID_SIZE - 1) return true
    const neighbors = getNeighbors(cell.q, cell.r, grid)
    for (const n of neighbors) {
      const key = `${n.q},${n.r}`
      if (visited.has(key)) continue
      if (n.claimedBy !== team) continue
      visited.add(key)
      queue.push(n)
    }
  }
  return false
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function generateGrid(): GridCell[] {
  const shuffled = shuffleArray(LETTER_POOL)
  const selected = shuffled.slice(0, GRID_SIZE * GRID_SIZE)
  const grid: GridCell[] = []
  let idx = 0
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let q = 0; q < GRID_SIZE; q++) {
      grid.push({
        q,
        r,
        letter: selected[idx++],
        claimedBy: null,
      })
    }
  }
  return grid
}