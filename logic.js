// Logic

export const CELL_STATUSES = {
	HIDDEN: 'hidden',
	MINE: 'mine',
	NUMBER: 'number',
	MARKED: 'marked',
}

const getMinePositions = (size, numOfMines) => {

}

export const createTableCells = (size, numOfMines) => {
  const minePositions = getMinePositions(size, numOfMines)
	let row = 0
	return new Array(size).fill(null).map(() => {
		row++
		let col = 0
		return new Array(size).fill(null).map(() => {
			col++
			const cell = document.createElement('div')
			cell.dataset.status = CELL_STATUSES.HIDDEN

			return {
        cell,
        row,
        col,
        mine: true,
        get status() {
          return this.cell.dataset.status
        },
        set status(value) {
          this.cell.dataset.status = value
        }
      }
		})
	})
}
