import { useState, useCallback } from "react"
import type { GameState, Action } from "../config"
import { generateGrid, checkWin } from "../config"

const INITIAL: GameState = {
  screen: "start",
  roundNumber: 1,
  greenTeamName: "",
  orangeTeamName: "",
  greenScore: 0,
  orangeScore: 0,
  grid: [],
  activeCell: null,
  theme: "default",
  fontSize: 16,
  fullscreen: false,
  sound: true,
  _lastWinner: undefined,
  _gameWinner: undefined,
}

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL)

  const dispatch = useCallback((action: Action) => {
    setState((prev) => {
      switch (action.type) {
        case "START_GAME": {
          const g = action.greenTeamName || prev.greenTeamName
          const o = action.orangeTeamName || prev.orangeTeamName
          return {
            ...prev,
            screen: "game",
            roundNumber: 1,
            greenTeamName: g,
            orangeTeamName: o,
            greenScore: 0,
            orangeScore: 0,
            grid: generateGrid(),
            activeCell: null,
          }
        }
        case "ACTIVATE_CELL": {
          if (prev.screen !== "game") return prev
          const { q, r } = action
          const cell = prev.grid.find((c) => c.q === q && c.r === r)
          if (!cell || cell.claimedBy) return prev
          if (checkWin(prev.grid, "green") || checkWin(prev.grid, "orange")) return prev
          if (prev.activeCell?.q === q && prev.activeCell?.r === r) {
            return { ...prev, activeCell: null }
          }
          return { ...prev, activeCell: { q, r } }
        }
        case "CLAIM_CELL": {
          if (prev.screen !== "game") return prev
          if (!prev.activeCell) return prev
          const { q, r } = prev.activeCell
          const cell = prev.grid.find((c) => c.q === q && c.r === r)
          if (!cell || cell.claimedBy) return prev
          if (checkWin(prev.grid, "green") || checkWin(prev.grid, "orange")) return prev
          const team = action.team
          const newGrid = prev.grid.map((c) =>
            c.q === q && c.r === r ? { ...c, claimedBy: team } : c,
          )
          const gWon = checkWin(newGrid, "green")
          const oWon = checkWin(newGrid, "orange")
          return {
            ...prev,
            grid: newGrid,
            activeCell: null,
            greenScore: gWon ? prev.greenScore + 1 : prev.greenScore,
            orangeScore: oWon ? prev.orangeScore + 1 : prev.orangeScore,
            screen: gWon || oWon ? "roundWin" : "game",
            _lastWinner: gWon ? "green" : oWon ? "orange" : undefined,
          }
        }
        case "END_ROUND": {
          if (prev.screen !== "roundWin") return prev
          const gWon = prev.greenScore >= 2
          const oWon = prev.orangeScore >= 2
          if (gWon || oWon) {
            return {
              ...prev,
              screen: "gameOver",
              _gameWinner: gWon ? "green" : "orange",
            }
          }
          return {
            ...prev,
            screen: "game",
            roundNumber: prev.roundNumber + 1,
            grid: generateGrid(),
            activeCell: null,
            _lastWinner: undefined,
          }
        }
        case "PLAY_AGAIN":
          return {
            ...prev,
            screen: "teamAssignment",
            roundNumber: 1,
            greenScore: 0,
            orangeScore: 0,
            grid: [],
            activeCell: null,
          }
        case "RESTART_GAME":
          return {
            ...prev,
            screen: "teamAssignment",
            roundNumber: 1,
            greenScore: 0,
            orangeScore: 0,
            grid: [],
            activeCell: null,
          }
        case "SET_GREEN_NAME":
          return { ...prev, greenTeamName: action.value }
        case "SET_ORANGE_NAME":
          return { ...prev, orangeTeamName: action.value }
        case "SET_THEME":
          return { ...prev, theme: action.theme }
        case "SET_FONT_SIZE":
          return { ...prev, fontSize: action.fontSize }
        case "TOGGLE_FULLSCREEN":
          return { ...prev, fullscreen: !prev.fullscreen }
        case "TOGGLE_SOUND":
          return { ...prev, sound: !prev.sound }
        case "GO_TO_TEAM_ASSIGNMENT":
          return {
            ...prev,
            screen: "teamAssignment",
            roundNumber: 1,
            greenScore: 0,
            orangeScore: 0,
            grid: [],
            activeCell: null,
          }
        case "GO_TO_GAME":
          return { ...prev, screen: "game" }
        default:
          return prev
      }
    })
  }, [])

  const isActive = useCallback(
    (q: number, r: number) => state.activeCell?.q === q && state.activeCell?.r === r,
    [state.activeCell],
  )

  const isClaimed = useCallback(
    (q: number, r: number) => {
      const c = state.grid.find((x) => x.q === q && x.r === r)
      return !!c?.claimedBy
    },
    [state.grid],
  )

  const canActivate = useCallback(() => {
    if (state.screen !== "game") return false
    if (checkWin(state.grid, "green") || checkWin(state.grid, "orange")) return false
    return true
  }, [state.screen, state.grid])

  return {
    state,
    dispatch,
    isActive,
    isClaimed,
    canActivate,
    lastRoundWinner: state.screen === "roundWin" ? state._lastWinner ?? null : null,
    gameWinner: state.screen === "gameOver" ? state._gameWinner ?? null : null,
  }
}