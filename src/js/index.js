const difficultButtons = document.querySelectorAll('.difficult');

let mainColor = document.querySelector('#picked-color');
const red = document.querySelector('#red');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');

let squares = document.querySelectorAll('.square');
let messageDisplay = document.querySelector('.message');
let numSquares = 6;
let correctSquare = 0;

let pickedColor;

function startGame() {

    let R = parseInt(Math.random() * 255);
    let G = parseInt(Math.random() * 255);
    let B = parseInt(Math.random() * 255);

    // mainColor.innerHTML = `rgb(${R}, ${G}, ${B})`;
    red.innerHTML = R
    green.innerHTML = G
    blue.innerHTML = B
    pickedColor = `rgb(${R}, ${G}, ${B})`
    
    squares.forEach(square => {
        function randomColor() {
            let r = parseInt(Math.random() * 255);
            let g = parseInt(Math.random() * 255);
            let b = parseInt(Math.random() * 255);

            square.style.backgroundColor = `rgb(${r},${g},${b})`;
        };
        
        randomColor();
    });
    
    function drawNumber() {
        correctSquare = parseInt(Math.random()*numSquares);

        return correctSquare;
    }
    drawNumber();
    squares[correctSquare].style.backgroundColor = `${pickedColor}`

    for (let i = 0; i < numSquares; i++) {
        squares[i].addEventListener('click', function() {
            let clickedColor = this.style.backgroundColor
            console.log(clickedColor);
            if (clickedColor === pickedColor) {
                messageDisplay.innerHTML = 'Correct!'
                buttonNewColors.innerHTML = 'Play again'
                squares.forEach(square => {
                    square.style.backgroundColor = pickedColor
                    square.style.cursor = 'default';
                    messageDisplay.style.display = 'block';
                    messageDisplay.style.color = '#00a000';
                });
            } else {
                this.style.backgroundColor = '#111'
                this.style.cursor = 'default';
                messageDisplay.innerHTML = 'Keep trying';
                messageDisplay.style.display = 'block';
                messageDisplay.style.color = '#f00';
            }
        })
    }

}

function resetGame() {
    messageDisplay.innerHTML = '';
    buttonNewColors.innerHTML = 'New colors';
    messageDisplay.style.display = 'none';
    squares.forEach(square => {
        square.style.cursor = 'pointer';
    });

    startGame()
}

difficultButtons.forEach(button => {
    button.addEventListener('click', () => {

        document.querySelector('.active').classList.remove('active');

        const idButtonSelected = button.id;

        document.querySelector(`#${idButtonSelected}`).classList.add('active');

        if (idButtonSelected === 'easy') {
            document.querySelector(`.medium`).style.display = 'none';
            document.querySelector(`.hard`).style.display = 'none';

            numSquares = 3;
        }

        if (idButtonSelected === 'medium') {
            document.querySelector(`.medium`).style.display = 'flex';
            document.querySelector(`.hard`).style.display = 'none';

            numSquares = 6;
        }

        if (idButtonSelected === 'hard') {
            document.querySelector(`.medium`).style.display = 'flex';
            document.querySelector(`.hard`).style.display = 'flex';

            numSquares = 9;
        }

        resetGame();
        startGame();
    })
});

const buttonNewColors = document.querySelector('#new-game');
buttonNewColors.addEventListener('click', resetGame)

startGame();