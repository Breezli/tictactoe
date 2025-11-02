import { useState } from 'react'

function Square({ value, onClick }) {
	return (
		<button className='square' onClick={onClick}>
			{value}
		</button>
	)
}

export default function Board() {
	const [isNext, setNest] = useState(true)
	const [cells, setCell] = useState(Array(9).fill(null))

	function handleClick(i) {
		if (cells[i] || isWinner(cells)) return
		const nextCells = cells.slice()
		if (isNext) {
			nextCells[i] = 'X'
		} else {
			nextCells[i] = 'O'
		}
		setCell(nextCells)
		setNest(!isNext)
	}

	const winner = isWinner(cells)
	let status
	if (winner) {
		status = 'Winner: ' + winner
	} else {
		status = 'Next player: ' + (isNext ? 'X' : 'O')
	}

	return (
		<>
			<div className='status'>{status}</div>
			<div className='board-row'>
				<Square value={cells[0]} onClick={() => handleClick(0)} />
				<Square value={cells[1]} onClick={() => handleClick(1)} />
				<Square value={cells[2]} onClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={cells[3]} onClick={() => handleClick(3)} />
				<Square value={cells[4]} onClick={() => handleClick(4)} />
				<Square value={cells[5]} onClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={cells[6]} onClick={() => handleClick(6)} />
				<Square value={cells[7]} onClick={() => handleClick(7)} />
				<Square value={cells[8]} onClick={() => handleClick(8)} />
			</div>
		</>
	)
}

function isWinner(cells) {
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
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (cells[a] && cells[a] == cells[b] && cells[a] == cells[c]) {
			return cells[a]
		}
	}
	return null
}

