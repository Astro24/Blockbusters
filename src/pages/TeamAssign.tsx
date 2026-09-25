import { useState, useCallback } from "react"
import type { ScreenProps } from "../App"

export function TeamAssign({ state, dispatch }: ScreenProps) {
  const [greenName, setGreenName] = useState(state.greenTeamName)
  const [orangeName, setOrangeName] = useState(state.orangeTeamName)

  const startGame = useCallback(() => {
    if (!greenName.trim() || !orangeName.trim()) return
    dispatch({ type: "START_GAME", greenTeamName: greenName.trim(), orangeTeamName: orangeName.trim() })
  }, [greenName, orangeName, dispatch])

  return (
    <div className="page page--team">
      <div className="team-card">
        <h2 className="team-heading">أدخل أسماء الفرق</h2>

        <div className="team-field">
          <label className="team-field__label">
            <span className="team-field__dot team-field__dot--green" />
            فريق ○
          </label>
          <input
            className="team-field__input"
            type="text"
            value={greenName}
            onChange={(e) => setGreenName(e.target.value)}
            placeholder="اسم الفريق الأخضر"
            maxLength={24}
            onKeyDown={(e) => e.key === "Enter" && startGame()}
          />
        </div>

        <div className="team-field">
          <label className="team-field__label">
            <span className="team-field__dot team-field__dot--orange" />
            فريق △
          </label>
          <input
            className="team-field__input"
            type="text"
            value={orangeName}
            onChange={(e) => setOrangeName(e.target.value)}
            placeholder="اسم الفريق البرتقالي"
            maxLength={24}
            onKeyDown={(e) => e.key === "Enter" && startGame()}
          />
        </div>

        <button
          type="button"
          className="btn btn--primary"
          onClick={startGame}
          disabled={!greenName.trim() || !orangeName.trim()}
        >
          ابدأ المباراة
        </button>
      </div>
    </div>
  )
}