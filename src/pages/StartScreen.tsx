import type { ScreenProps } from "../App"

export function StartScreen({ dispatch }: ScreenProps) {
  return (
    <div className="page page--start">
      <div className="start-content">
        <div className="start-title-block">
          <h1 className="start-title">Blockbusters</h1>
        </div>

        <button
          type="button"
          className="btn btn--primary start-btn"
          onClick={() => dispatch({ type: "GO_TO_TEAM_ASSIGNMENT" })}
        >
          ابدأ
        </button>
      </div>
    </div>
  )
}