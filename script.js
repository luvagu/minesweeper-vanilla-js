// UI
import {
	CELL_STATUSES,
	createTableCells,
	markCell,
	revealCell,
} from './logic.js'

const TABLE_SIZE = 5
const NUM_OF_MINES = 3

const board = document.querySelector('.board')
const table = createTableCells(TABLE_SIZE, NUM_OF_MINES)
const remainingMines = document.querySelector('[data-remaining-mines]')

board.style.setProperty('--size', TABLE_SIZE)

table.forEach(row =>
	row.forEach(cell => {
		board.appendChild(cell.element)
		cell.element.addEventListener('click', () => {
			revealCell(table, cell)
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

// @ToDo
// Populate board with tiles and mines ✔️
// Left click on tiles reveals cells
// Right click on tiles marks cells
// Check for win/lose conditions
