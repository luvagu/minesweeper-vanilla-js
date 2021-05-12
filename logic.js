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
			const cell = document.createElement('div')
			cell.dataset.status = CELL_STATUSES.HIDDEN

			return {
				cell,
				row,
				col,
				mine: minePositions.some(locationMatch.bind(null, { row, col })),
				get status() {
					return this.cell.dataset.status
				},
				set status(value) {
					this.cell.dataset.status = value
				},
			}
		})
	})
}
