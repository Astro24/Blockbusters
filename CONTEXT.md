# Arabic Blockbusters

A best-of-three connection game on a hexagonal grid of Arabic letters. Two teams (Green / Orange) compete to connect their opposite grid edges within a round. First to win 2 rounds wins the game. A human Game Master controls the TV screen directly — tapping a letter cell to activate it, then awarding the cell to one team after judging the answer.

## Language

**Game Master (GM)**:
A person at the laptop/TV who controls the game flow by tapping the screen directly. Picks a letter cell (activates it), awards cells to a team after judging the answer. No separate GM app or device.
_Avoid_: Host, moderator, admin, controller

**Round**:
One complete game on a randomized 5×5 hex grid. Teams compete to connect their two edges (Green: left↔right / Orange: top↔bottom). First team to form a connection wins the round. Three rounds per game.
_Avoid_: Level, stage, phase

**Game**:
Best-of-three rounds. First team to win 2 rounds wins the game. Ends when a team reaches 2 round wins.
_Avoid_: Match, session, tournament

**Letter**:
An Arabic character displayed inside a hex cell (e.g., ب, أ, ق). One letter per cell, randomized across the grid at the start of each round. The GM picks a letter to activate it (reveal a question).
_Avoid_: Character, tile-letter

**Cell**:
A single hexagonal grid position containing one Arabic letter. Unclaimed cells show the letter in white. Claimed cells are solid Green (Orange team) or solid Orange (Green team). The GM taps a cell to activate it (neutral highlight).
_Avoid_: Tile, hex, space, position, box

**Team**:
A group of players with a fixed color and name. Two teams per game: **Green** and **Orange** (colors from the reference UI). Team names are entered once at game start and persist through all 3 rounds. Team sides are fixed per round: Green = left↔right edges, Orange = top↔bottom edges.
_Avoid_: Side, faction, player group

**Grid**:
A 5×5 hexagonal (honeycomb) board, staggered rows, purple outline on every cell. Letters randomized at the start of each round. 25 cells total, drawn from the 28 Arabic letters.
_Avoid_: Board, field, matrix

**Round Score**:
The number of rounds a team has won so far (0, 1, or 2). Displayed as colored score hexagons in the sidebar (green = Green team, orange = Orange team).
_Avoid_: Points, cells claimed, score

**Active Letter**:
A cell the GM has tapped to activate. Shown with a neutral highlight color (e.g., yellow). The GM awards it to one team after judging the correct answer, at which point it becomes solid Green or solid Orange.
_Avoid_: Highlighted cell, selected letter, chosen cell

**Options Button**:
A button labeled "خيارات" (Options) in the top-right sidebar. Restarts the game — resets team names, scores, and round number back to team assignment state.
_Avoid_: Settings, menu, controls

**Game States**:
- **Team Assignment**: Initial state. GM enters team names, clicks "Start" to begin round 1.
- **Round in Progress**: Grid displayed, GM taps cells, awards to teams, win/loss detection runs.
- **Round Win**: A team connects their edges. Round score updates. Brief "Round X won by [team]" display, then board resets for next round.
- **Game Over**: A team reaches 2 round wins. "Game Over — [team] wins" display. Option to play again.
_Avoid_: Status