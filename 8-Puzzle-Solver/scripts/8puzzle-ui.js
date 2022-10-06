function getAdjacentElements() {
    var adjacentElements = {};
    var gridArray = getCurrentGrid();
    var emptyTileIndex = gridArray.indexOf('0');

    // Top element
    if (emptyTileIndex - 3 >= 0) {
        adjacentElements.top = gridArray[emptyTileIndex - 3];
    }
    // Bottom element
    if (emptyTileIndex + 3 <= 8) {
        adjacentElements.bottom = gridArray[emptyTileIndex + 3];
    }
    // Left element
    if (emptyTileIndex - 1 >= 0 && emptyTileIndex % 3 != 0) {
        adjacentElements.left = gridArray[emptyTileIndex - 1];
    }
    // Right element
    if (emptyTileIndex + 1 <= 8 && emptyTileIndex % 3 != 2) {
        adjacentElements.right = gridArray[emptyTileIndex + 1];
    }

    return adjacentElements;
}

function isAdjacent(tileId) {
    var adjacentElements = getAdjacentElements();

    for (var key in adjacentElements) {
        if (adjacentElements.hasOwnProperty(key)) {
            if (adjacentElements[key] == tileId) {
                return true;
            }
        }
    }

    return false;
}

function shiftTile() {
    var tileId = this.id;
    var adjacent = isAdjacent(tileId);

    if (adjacent) {
        var gridArray = getCurrentGrid();
        console.log(gridArray);

        var emptyTileIndex = gridArray.indexOf('0');
        var tileIndex = gridArray.indexOf(`${tileId}`);

        console.log(`Empty Tile Index: ${emptyTileIndex}`);
        console.log(`Tile Index: ${tileIndex}`);

        gridArray[emptyTileIndex] = gridArray[tileIndex];
        gridArray[tileIndex] = '0';

        console.log(gridArray);

        drawGrid(gridArray);

        if (isSolved()) {
            puzzleCompleted();
            disableEvents();
        }

        return `Tile ${tileId} shifted`;
    }

    return `Could not shift tile ${tileId}`;
}

// add event listeners to all tiles on click
function addTileEventListeners() {
    var tiles = document.getElementsByClassName('grid-item');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', shiftTile, true);
    }
}

// disable input events on all tiles on click
function disableEvents() {
    var tiles = document.getElementsByClassName('grid-item');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener('click', shiftTile, true);
    }
}
