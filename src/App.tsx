import * as React from "react";
import './App.css';

const X_PLAYER_SYMBOL = "X"
const O_PLAYER_SYMBOL = "O"
const EMPTY_VALUE = ""

function getWinner(board: string[]): string | null {
    for (let i = 0; i < 3; i++) {
        // строки
        if (
            board[i * 3] &&
            board[i * 3] === board[i * 3 + 1] &&
            board[i * 3] === board[i * 3 + 2]
        ) {
            return board[i * 3];
        }

        // столбцы
        if (
            board[i] &&
            board[i] === board[i + 3] &&
            board[i] === board[i + 6]
        ) {
            return board[i];
        }
    }

    // диагонали
    if (board[0] && board[0] === board[4] && board[0] === board[8]) {
        return board[0];
    }
    if (board[2] && board[2] === board[4] && board[2] === board[6]) {
        return board[2];
    }
    return null;
}

function getNextPlayer(currentPlayer: string): string {
    if (currentPlayer === X_PLAYER_SYMBOL) {
        return O_PLAYER_SYMBOL;
    }
    return X_PLAYER_SYMBOL;
}

export default function App() {
    const [gameBoard, setGameBoard] = React.useState<string[]>(Array(9).fill(EMPTY_VALUE))
    const [currentPlayer, setCurrentPlayer] = React.useState<string>(X_PLAYER_SYMBOL)
    const [gameResult, setGameResult] = React.useState<string>(EMPTY_VALUE)

    function handleClickCellButton(index: number) {
        gameBoard[index] = currentPlayer
        setGameBoard([...gameBoard])

        let gameWasFinished = getWinner(gameBoard)
        if (gameWasFinished !== null) {
            setGameResult("Игра закончена, победу одержал игрок " + currentPlayer)
            return
        }
        if (!gameBoard.includes(EMPTY_VALUE)) {
            setGameResult("Игра закончена. Ничья")
            return
        }
        setCurrentPlayer(getNextPlayer(currentPlayer))
    }

    return (
        <div className="game-field">
            <div>
                {
                    gameResult !== EMPTY_VALUE
                        ? <span className="game-result">{gameResult}</span>
                        : <span>Ходит игроок {currentPlayer}</span>
                }
            </div>
            {gameBoard.map((value: string, index: number) => (
                <button
                    key={index}
                    disabled={value !== EMPTY_VALUE || gameResult !== EMPTY_VALUE}
                    onClick={() => {
                        handleClickCellButton(index)
                    }}>
                    {value}
                </button>
            ))}
            <button onClick={() => {
                setGameBoard(Array(9).fill(EMPTY_VALUE));
                setCurrentPlayer(X_PLAYER_SYMBOL);
                setGameResult(EMPTY_VALUE)
            }}>
                Reset Game
            </button>
        </div>
    );
}

