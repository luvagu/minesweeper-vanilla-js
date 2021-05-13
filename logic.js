// Logic

export const CELL_STATUSES = {
	HIDDEN: 'hidden',
	MINE: 'mine',
	NUMBER: 'number',
	MARKED: 'marked',
}

const randomInteger = tableSize => Math.floor(Math.random() * tableSize)

const locationMatch = (a, b) => a.row === b.row && a.col === b.col

const getMineLocations = (tableSize, numOfMines) => {
	const locations = []

	while (locations.length < numOfMines) {
		const location = {
			row: randomInteger(tableSize),
			col: randomInteger(tableSize),
		}

		if (!locations.some(locationMatch.bind(null, location))) {
			locations.push(location)
		}
	}

	return locations
}

export const createTableCells = (tableSize, numOfMines) => {
	const minePositions = getMineLocations(tableSize, numOfMines)
	let row = -1

	return new Array(tableSize).fill(null).map(() => {
		row++
		let col = -1

		return new Array(tableSize).fill(null).map(() => {
			col++
			const element = document.createElement('div')
			element.dataset.status = CELL_STATUSES.HIDDEN

			return {
				element,
				row,
				col,
				mine: minePositions.some(locationMatch.bind(null, { row, col })),
				get status() {
					return this.element.dataset.status
				},
				set status(value) {
					this.element.dataset.status = value
				},
			}
		})
	})
}

export const markCell = cell => {
	if (
		cell.status !== CELL_STATUSES.HIDDEN &&
		cell.status !== CELL_STATUSES.MARKED
	) {
		return
	}

	if (cell.status === CELL_STATUSES.MARKED) {
		cell.status = CELL_STATUSES.HIDDEN
	} else {
		cell.status = CELL_STATUSES.MARKED
	}
}

const getNearbyCells = (table, { row, col }) => {
	const nearbyCells = []

	for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
		for (let colOffset = -1; colOffset <= 1; colOffset++) {
			const cell = table[row + rowOffset]?.[col + colOffset]
			if (cell) nearbyCells.push(cell)
		}
	}

	return nearbyCells
}

export const revealCells = (table, cell) => {
	if (cell.status !== CELL_STATUSES.HIDDEN) {
		return
	}

	if (cell.mine) {
		cell.status = CELL_STATUSES.MINE
		return
	}

	cell.status = CELL_STATUSES.NUMBER
	const nearbyCells = getNearbyCells(table, cell)
	const mines = nearbyCells.filter(cell => cell.mine)

	if (mines.length === 0) {
		nearbyCells.forEach(revealCell.bind(null, table))
	} else {
		cell.element.textContent = mines.length
	}
}

export const checkForWin = () => false

export const checkForLoss = () => true
