import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initailGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameturns) {
  let currentPlayer = "X";
  if (gameturns.length > 0 && gameturns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initailGameBoard;
  let winner = null;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSynbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSynbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSynbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSynbol &&
      firstSquareSynbol === secondSquareSynbol &&
      firstSquareSynbol === thirdSquareSynbol
    ) {
      winner = firstSquareSynbol;
    }
  }

  function handleSelectSqare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);

      const updateTruns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updateTruns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initiaName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initiaName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>Yon win, {winner} !</p>}
        <GameBoard onSelectSquare={handleSelectSqare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
