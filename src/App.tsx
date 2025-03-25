import { useState } from 'react'

type SquareProps = Readonly<{
  value: string | null
  onSquareClick: () => void
}>

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button 
      className="w-16 h-16 border border-gray-400 bg-white text-2xl font-bold hover:bg-gray-100"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function App() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null))

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(square => square !== null)
  
  let status: string
  if (winner) {
    status = `Winner: ${winner}`
  } else if (isDraw) {
    status = 'Game is a draw!'
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Tic Tac Toe</h1>
      <div className="mb-4 text-xl font-semibold text-gray-700">{status}</div>
      <div className="grid grid-cols-3 gap-1 mb-4">
        {squares.map((square, i) => (
          <Square 
            key={`square-${i}`} 
            value={square} 
            onSquareClick={() => handleClick(i)} 
          />
        ))}
      </div>
      <button 
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Reset Game
      </button>
    </div>
  )
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default App
