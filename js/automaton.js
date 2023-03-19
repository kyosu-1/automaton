class Automaton {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = this.createGrid();
    }

    createGrid() {
        let grid = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            grid[i] = new Array(this.width).fill(false);
        }
        return grid;
    }

    randomize() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.grid[i][j] = Math.random() > 0.5;
            }
        }
    }

    nextGeneration() {
        let newGrid = this.createGrid();

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let neighbors = this.countNeighbors(i, j);

                if (this.grid[i][j]) {
                    newGrid[i][j] = neighbors === 2 || neighbors === 3;
                } else {
                    newGrid[i][j] = neighbors === 3;
                }
            }
        }

        this.grid = newGrid;
    }

    countNeighbors(x, y) {
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }

                let newX = x + i;
                let newY = y + j;

                if (newX >= 0 && newX < this.height && newY >= 0 && newY < this.width) {
                    count += this.grid[newX][newY] ? 1 : 0;
                }
            }
        }

        return count;
    }
}
