interface ScoreHexagonProps {
  teamColor: "green" | "orange"
  score: number
  teamName: string
}

export function ScoreHexagon({ teamColor, score, teamName }: ScoreHexagonProps) {
  return (
    <div
      className={`score-hex score-hex--${teamColor}`}
      title={teamName}
      aria-label={`${teamName}: ${score}`}
    >
      <span className="score-hex__bg" />
      <span className="score-hex__num">{score}</span>
    </div>
  )
}