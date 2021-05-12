// Logic

export const CELL_STATUSES = {
	HIDDEN: 'hidden',
	MINE: 'mine',
	NUMBER: 'number',
	MARKED: 'marked',
}

const randomInteger = tableSize => Math.floor(Math.random() * tableSize + 1)

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
	let row = 0

	return new Array(tableSize).fill(null).map(() => {
		row++
		let col = 0

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

export const revealCell = cell => {}
