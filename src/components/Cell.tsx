import type { CSSProperties } from "react"
import type { GridCell } from "../config"

interface CellProps {
  letter: string
  claimedBy: GridCell["claimedBy"]
  isActive: boolean
  canActivate: boolean
  onCellClick: () => void
  style: CSSProperties
}

export function Cell({
  letter,
  claimedBy,
  isActive,
  canActivate,
  onCellClick,
  style,
}: CellProps) {
  const classes = ["hex"]
  if (claimedBy) classes.push(`hex--${claimedBy}`)
  if (isActive) classes.push("hex--active")
  if (canActivate && !claimedBy) classes.push("hex--tappable")

  return (
    <button
      type="button"
      className={classes.join(" ")}
      style={style}
      onClick={onCellClick}
      disabled={!canActivate || !!claimedBy}
      aria-label={letter}
    >
      <span className="hex__inner" />
      <span className="hex__letter">{letter}</span>
    </button>
  )
}