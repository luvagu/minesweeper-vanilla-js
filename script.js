// UI
import {
	CELL_STATUSES,
	createTableCells,
	markCell,
	revealCells,
	checkForWin,
	checkForLoss,
} from './logic.js'

const TABLE_SIZE = 10
const NUM_OF_MINES = 10

const board = document.querySelector('.board')
const table = createTableCells(TABLE_SIZE, NUM_OF_MINES)
const messageText = document.querySelector('.subtext')
const remainingMines = document.querySelector('[data-remaining-mines]')

board.style.setProperty('--size', TABLE_SIZE)

table.forEach(row =>
	row.forEach(cell => {
		board.appendChild(cell.element)
		cell.element.addEventListener('click', () => {
			revealCells(table, cell)
			checkGameOutcome()
		})
		cell.element.addEventListener('contextmenu', e => {
			e.preventDefault()
			markCell(cell)
			getRemainingMines()
		})
	})
)

remainingMines.textContent = NUM_OF_MINES

function getRemainingMines() {
	const makedCellsCount = table.reduce((count, row) => {
		return (
			count + row.filter(cell => cell.status === CELL_STATUSES.MARKED).length
		)
	}, 0)

	const totalRemaining = NUM_OF_MINES - makedCellsCount
	remainingMines.textContent = totalRemaining > 0 ? totalRemaining : 0
}

function checkGameOutcome() {
	const win = checkForWin(table)
	const lose = checkForLoss(table)

	const stopPropagation = e => e.stopImmediatePropagation()

	if (win || lose) {
		board.addEventListener('click', stopPropagation, { capture: true })
		board.addEventListener('contextmenu', stopPropagation, { capture: true })
	}

	if (win) {
		messageText.textContent = 'You win!'
		messageText.style.color = 'yellow'
	}

	if (lose) {
		messageText.textContent = 'You lose!'
		messageText.style.color = '#ad0c0c'
		table.forEach(row =>
			row.forEach(cell => {
				if (cell.status === CELL_STATUSES.MARKED) markCell(cell)
				if (cell.mine) revealCells(table, cell)
			})
		)
	}
}

// @ToDo
// Populate board with cells and mines ✔️
// Left click on tiles reveals cells ✔️
// Right click on tiles marks cells ✔️
// Check for win/lose conditions
