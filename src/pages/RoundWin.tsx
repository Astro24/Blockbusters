import { useEffect } from "react"
import { THEMES } from "../config"
import type { ScreenProps } from "../App"

export function RoundWin({ state, dispatch }: ScreenProps) {
  const theme = THEMES[state.theme]

  useEffect(() => {
    if (state.screen === "roundWin") {
      const t = setTimeout(() => {
        setTimeout(() => dispatch({ type: "END_ROUND" }), 400)
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [state.screen])

  const winner = state._lastWinner
  const winnerName = winner === "green" ? state.greenTeamName : state.orangeTeamName
  const winnerColor = winner === "green" ? theme.green : theme.orange

  return (
    <div
      className="round-win-overlay"
      style={{ backgroundColor: theme.pageBg }}
    >
      <div className="round-win-card" style={{ borderColor: winnerColor }}>
        <h2
          className="round-win-title"
          style={{ color: theme.roundTitle }}
        >
          الجولة انتهت
        </h2>
        <div
          className="round-win-winner"
          style={{ backgroundColor: winnerColor }}
        >
          {winnerName || "الفائز"}
        </div>
        <div className="round-win-scores">
          <span className="round-win-score round-win-score--green">{state.greenScore}</span>
          <span className="round-win-score-divider">-</span>
          <span className="round-win-score round-win-score--orange">{state.orangeScore}</span>
        </div>
      </div>
    </div>
  )
}