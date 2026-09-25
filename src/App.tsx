import { useEffect } from "react"
import { useGameState } from "./hooks/useGameState"
import { StartScreen } from "./pages/StartScreen"
import { TeamAssign } from "./pages/TeamAssign"
import { GameBoard } from "./pages/GameBoard"
import { RoundWin } from "./pages/RoundWin"
import { GameOver } from "./pages/GameOver"
import type { GameState, Action } from "./config"

export function App() {
  const { state, dispatch } = useGameState()

  useEffect(() => {
    const handler = () => dispatch({ type: "TOGGLE_FULLSCREEN" })
    document.documentElement.addEventListener("fullscreenchange", handler)
    return () => document.documentElement.removeEventListener("fullscreenchange", handler)
  }, [dispatch])

  let screen: React.ReactNode
  switch (state.screen) {
    case "start":
      screen = <StartScreen state={state} dispatch={dispatch} />
      break
    case "teamAssignment":
      screen = <TeamAssign state={state} dispatch={dispatch} />
      break
    case "game":
      screen = <GameBoard state={state} dispatch={dispatch} />
      break
    case "roundWin":
      screen = <RoundWin state={state} dispatch={dispatch} />
      break
    case "gameOver":
      screen = <GameOver state={state} dispatch={dispatch} />
      break
    default:
      screen = <StartScreen state={state} dispatch={dispatch} />
  }

  return (
    <div className="app" data-theme={state.theme}>
      <div className="app__screen" key={state.screen}>
        {screen}
      </div>
    </div>
  )
}

export interface ScreenProps {
  state: GameState
  dispatch: (action: Action) => void
}