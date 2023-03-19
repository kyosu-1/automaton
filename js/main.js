const gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

const width = 50;
const height = 30;
const interval = 100;

let automaton = new Automaton(width, height);
let timer = null;

function createGridElements() {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => {
                automaton.grid[i][j] = !automaton.grid[i][j];
                updateGrid();
            });

            gridContainer.appendChild(cell);
        }
    }
}

function updateGrid() {
    const cells = gridContainer.querySelectorAll('.cell');

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const index = i * width + j;
            const cell = cells[index];

            if (automaton.grid[i][j]) {
                cell.classList.add('alive');
            } else {
                cell.classList.remove('alive');
            }
        }
    }
}

function start() {
    timer = setInterval(() => {
        automaton.nextGeneration();
        updateGrid();
    }, interval);
}

function stop() {
    clearInterval(timer);
    timer = null;
}

function reset() {
    if (timer) {
        stop();
    }
    automaton = new Automaton(width, height);
    updateGrid();
}

startButton.addEventListener('click', () => {
    if (!timer) {
        start();
    }
});

stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

createGridElements();
automaton.randomize();
updateGrid();
