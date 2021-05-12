// UI
import { createTableCells } from './logic.js'

const BOARD_SIZE = 5
const NUM_OF_MINES = 3

const board = document.querySelector('.board')
const table = createTableCells(BOARD_SIZE, NUM_OF_MINES)

board.style.setProperty('--size', BOARD_SIZE)
table.forEach(row => row.forEach(col => board.appendChild(col.cell)))

console.log(createTableCells(2, 2))

// Populate board with tiles and mines
// Left click on tiles reveals tiles
// Right click on tiles marks tiles
// Check for win/lose conditions