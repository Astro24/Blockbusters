import React, { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Cell } from "../components/Cell"
import { ScoreHexagon } from "../components/ScoreHexagon"
import {
  GRID_SIZE,
  ROUND_NAMES,
  THEMES,
  FONT_SIZES,
  FONT_SIZE_LABELS,
  ROUND_WIN_AUTO_DELAY_MS,
  GAME_OVER_DELAY_MS,
} from "../config"
import type { ThemeName as TN, FontSizeName as FSN } from "../config"
import type { ScreenProps } from "../App"

export function GameBoard({ state, dispatch }: ScreenProps) {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const roundWinTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const gameOverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const themeName = state.theme as TN
  const theme = THEMES[themeName]
  const fontSizeName = state.fontSize as unknown as FSN
  const fontSize = FONT_SIZES[fontSizeName] ?? 16
  void fontSize

  useEffect(() => {
    if (state.screen === "roundWin") {
      roundWinTimer.current = setTimeout(() => {
        dispatch({ type: "END_ROUND" })
      }, ROUND_WIN_AUTO_DELAY_MS)
      return () => {
        if (roundWinTimer.current) clearTimeout(roundWinTimer.current)
      }
    }
  }, [state.screen])

  useEffect(() => {
    if (state.screen === "gameOver") {
      gameOverTimer.current = setTimeout(() => {
        dispatch({ type: "PLAY_AGAIN" })
      }, GAME_OVER_DELAY_MS)
      return () => {
        if (gameOverTimer.current) clearTimeout(gameOverTimer.current)
      }
    }
  }, [state.screen])

  const roundTitle = ROUND_NAMES[state.roundNumber - 1] ?? ROUND_NAMES[0]

  const boardRef = useRef<HTMLDivElement | null>(null)
  const [hexR, setHexR] = useState(48)

  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      const pad = 0.9
      // grid spans 5.5 hex widths across and 8 radii tall
      const rByW = (w * pad) / (5.5 * Math.sqrt(3))
      const rByH = (h * pad) / 8
      setHexR(Math.max(16, Math.min(rByW, rByH, 120)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const hexW = Math.sqrt(3) * hexR
  const hexH = 2 * hexR
  const gridW = 5.5 * hexW
  const gridH = 8 * hexR
  const roundWords = roundTitle.split(" ")

  const handleEndRound = useCallback(() => {
    if (roundWinTimer.current) clearTimeout(roundWinTimer.current)
    dispatch({ type: "END_ROUND" })
  }, [dispatch])

  const handleRestart = useCallback(() => {
    setOptionsOpen(false)
    dispatch({ type: "RESTART_GAME" })
  }, [dispatch])

  const handleThemeChange = useCallback(
    (t: TN) => {
      dispatch({ type: "SET_THEME", theme: t })
    },
    [dispatch],
  )

  const handleFontSizeChange = useCallback(
    (s: FSN) => {
      dispatch({ type: "SET_FONT_SIZE", fontSize: FONT_SIZES[s] })
    },
    [dispatch],
  )

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    dispatch({ type: "TOGGLE_FULLSCREEN" })
  }, [dispatch])

  const handleSound = useCallback(() => {
    dispatch({ type: "TOGGLE_SOUND" })
  }, [dispatch])

  const confettiPieces = useMemo(() => {
    if (state.screen !== "roundWin") return []
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: 6 + Math.random() * 8,
      color: Math.random() > 0.5 ? theme.green : theme.orange,
      drift: (Math.random() - 0.5) * 40,
    }))
  }, [state.screen, theme])

  const gameConfetti = useMemo(() => {
    if (state.screen !== "gameOver") return []
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 10,
      color: Math.random() > 0.5 ? theme.green : theme.orange,
      drift: (Math.random() - 0.5) * 60,
    }))
  }, [state.screen, theme])

  const canClaim = state.screen === "game" && state.activeCell != null
  const canSelect = state.screen === "game"
  const roundWon = state.screen === "roundWin"
  const gameOverScreen = state.screen === "gameOver"

  return (
    <div
      className="game-page"
      style={{ "--page-bg": theme.pageBg } as React.CSSProperties}
    >
      {confettiPieces.length > 0 && (
        <div className="confetti-layer">
          {confettiPieces.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}

      {gameConfetti.length > 0 && (
        <div className="confetti-layer confetti-layer--gameover">
          {gameConfetti.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}

      <div className="board" ref={boardRef}>
        <div className="board__bg" aria-hidden="true">
          <span className="board__tri board__tri--top" />
          <span className="board__tri board__tri--bottom" />
          <span className="board__tri board__tri--left" />
          <span className="board__tri board__tri--right" />
        </div>

        <div className="hexgrid-wrap">
          <div
            className="hexgrid"
            key={state.screen}
            style={
              {
                width: gridW,
                height: gridH,
                "--hex-r": `${hexR}px`,
              } as React.CSSProperties
            }
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
              const r = Math.floor(idx / GRID_SIZE)
              const q = idx % GRID_SIZE
              const cx = hexW / 2 + q * hexW + (r % 2 === 1 ? hexW / 2 : 0)
              const cy = hexR + r * 1.5 * hexR
              return (
                <Cell
                  key={`${q}-${r}`}
                  letter={state.grid[idx]?.letter ?? "?"}
                  claimedBy={state.grid[idx]?.claimedBy ?? null}
                  isActive={state.activeCell?.q === q && state.activeCell?.r === r}
                  canActivate={canSelect}
                  onCellClick={() => {
                    if (state.screen !== "game") return
                    dispatch({ type: "ACTIVATE_CELL", q, r })
                  }}
                  style={{
                    left: cx - hexW / 2,
                    top: cy - hexR,
                    width: hexW,
                    height: hexH,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      <aside className="sidebar" style={{ "--sidebar-bg": theme.sidebarBg, "--sidebar-text": theme.sidebarText } as React.CSSProperties}>
        <button
          type="button"
          className="options-btn"
          onClick={() => setOptionsOpen((v) => !v)}
          aria-label="خيارات"
        >
          خيارات
        </button>

        <div className="sidebar__round-title">
          <span className="title-word title-word--red">{roundWords[0]}</span>
          {roundWords.length > 1 && (
            <span className="title-word title-word--yellow">
              {roundWords.slice(1).join(" ")}
            </span>
          )}
        </div>

        <div className="sidebar__scores">
          <ScoreHexagon
            teamColor="green"
            score={state.greenScore}
            teamName={state.greenTeamName || "فريق ○"}
          />
          <ScoreHexagon
            teamColor="orange"
            score={state.orangeScore}
            teamName={state.orangeTeamName || "فريق △"}
          />
        </div>

        {canClaim && state.activeCell && (
          <div className="sidebar__awards">
            <button
              type="button"
              className="award-btn award-btn--green"
              onClick={() => {
                if (!state.activeCell) return
                dispatch({ type: "CLAIM_CELL", team: "green" })
              }}
            >
              {state.greenTeamName || "فريق ○"}
            </button>
            <button
              type="button"
              className="award-btn award-btn--orange"
              onClick={() => {
                if (!state.activeCell) return
                dispatch({ type: "CLAIM_CELL", team: "orange" })
              }}
            >
              {state.orangeTeamName || "فريق △"}
            </button>
          </div>
        )}

        {(roundWon || gameOverScreen) && (
          <div className="sidebar__end-round">
            {roundWon ? (
              <button
                type="button"
                className="btn btn--end-round"
                onClick={handleEndRound}
                style={{
                  "--btn-color": theme.endRoundBtn,
                  "--shadow-color": theme.dropShadow,
                } as React.CSSProperties}
              >
                استمرار
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => dispatch({ type: "GO_TO_TEAM_ASSIGNMENT" })}
                style={{ "--btn-color": theme.endRoundBtn } as React.CSSProperties}
              >
                مباراة جديدة
              </button>
            )}
          </div>
        )}

        {state.activeCell != null && state.screen === "game" && (
          <div className="sidebar__active-indicator">
            <span
              className="active-indicator__dot"
              style={{ backgroundColor: theme.activeHighlight }}
            />
            <span className="active-indicator__text">حرف محدد</span>
          </div>
        )}
      </aside>

      {optionsOpen && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setOptionsOpen(false)}
          />
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ "--card-bg": theme.cardBg, "--card-border": theme.cardBorder } as React.CSSProperties}
          >
            <div className="modal__header">
              <h3 className="modal__title">خيارات</h3>
              <button
                type="button"
                className="modal__close"
                onClick={() => setOptionsOpen(false)}
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>

            <div className="modal__body">
              <div className="settings-group">
                <label className="settings-group__label">المظهر</label>
                <div className="theme-options">
                  {(Object.keys(THEMES) as TN[]).map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`theme-option ${state.theme === t ? "theme-option--active" : ""}`}
                      onClick={() => handleThemeChange(t)}
                      style={
                        {
                          "--theme-green": THEMES[t].green,
                          "--theme-orange": THEMES[t].orange,
                          "--theme-sidebar": THEMES[t].sidebarBg,
                        } as React.CSSProperties
                      }
                    >
                      {THEMES[t].name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="settings-group">
                <label className="settings-group__label">حجم الخط</label>
                <div className="font-options">
                  {Object.keys(FONT_SIZES).map((k) => (
                    <button
                      type="button"
                      key={k}
                      className={`font-option ${state.fontSize === FONT_SIZES[k] ? "font-option--active" : ""}`}
                      onClick={() => handleFontSizeChange(k as FSN)}
                    >
                      {FONT_SIZE_LABELS[k as FSN]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="settings-group settings-group--toggles">
                <button type="button" className="toggle-row" onClick={handleFullscreen}>
                  <span className="toggle-row__icon">⛶</span>
                  <span className="toggle-row__label">ملء الشاشة</span>
                  <span className="toggle-row__state">
                    {document.fullscreenElement ? "مفعل" : "معطل"}
                  </span>
                </button>

                <button type="button" className="toggle-row" onClick={handleSound}>
                  <span className="toggle-row__icon">🔊</span>
                  <span className="toggle-row__label">الصوت</span>
                  <span className="toggle-row__state">
                    {state.sound ? "مفعل" : "معطل"}
                  </span>
                </button>
              </div>

              <div className="settings-group">
                <button type="button" className="btn btn--danger settings-group__danger" onClick={handleRestart}>
                  إعادة المباراة من البداية
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}