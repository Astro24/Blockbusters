import React from "react"
import { THEMES } from "../config"
import type { ScreenProps } from "../App"

export function GameOver({ state, dispatch }: ScreenProps) {
  const theme = THEMES[state.theme]

  const winner = state._gameWinner
  const winnerName = winner === "green" ? state.greenTeamName : state.orangeTeamName
  const winnerColor = winner === "green" ? theme.green : theme.orange

  return (
    <div
      className="overlay overlay--gameover"
      style={
        {
          backgroundColor: theme.pageBg,
          "--team-color": winnerColor,
        } as React.CSSProperties
      }
    >
      <div
        className="overlay__card overlay__card--gameover"
        style={{ "--team-color": winnerColor } as React.CSSProperties}
      >
        <h2 className="overlay__title overlay__title--gameover">
          انتهت المباراة
        </h2>

        <div className="overlay__winner overlay__winner--big">
          <span className="overlay__winner-name overlay__winner-name--big">
            {winnerName || "الفائز"}
          </span>
        </div>

        <div className="overlay__score overlay__score--final">
          <span>{state.greenScore}</span>
          <span className="overlay__score-divider">—</span>
          <span>{state.orangeScore}</span>
        </div>

        <button
          type="button"
          className="overlay__play-again"
          onClick={() => dispatch({ type: "GO_TO_TEAM_ASSIGNMENT" })}
        >
          مباراة جديدة
        </button>
      </div>
    </div>
  )
}