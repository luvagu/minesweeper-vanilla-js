// UI
import { createTableCells } from './logic.js'

const TABLE_SIZE = 5
const NUM_OF_MINES = 3

const board = document.querySelector('.board')
const table = createTableCells(TABLE_SIZE, NUM_OF_MINES)
const remainingMines = document.querySelector('[data-remaining-mines]')

board.style.setProperty('--size', TABLE_SIZE)
table.forEach(row =>
	row.forEach(({ cell }) => {
		board.appendChild(cell)
		cell.addEventListener('click', e => {})
		cell.addEventListener('contextmenu', e => {
			e.preventDefault()
		})
	})
)
remainingMines.textContent = NUM_OF_MINES

console.log(createTableCells(TABLE_SIZE, NUM_OF_MINES))

// @ToDo
// Populate board with tiles and mines ✔️
// Left click on tiles reveals cells
// Right click on tiles marks cells
// Check for win/lose conditions
