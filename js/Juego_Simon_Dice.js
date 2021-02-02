const blue = document.getElementById('blue')
const red = document.getElementById('red')
const cyan = document.getElementById('cyan')
const brown = document.getElementById('brown')

const titleLevel = document.getElementById('level')
const scoreLevel = document.getElementById('score')
const topScoreLevel = document.getElementById('top-score')

const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 5
var topScore = 0
class Juego {
    constructor() {
        this.Start = this.Start.bind(this)
        this.Start()
        this.generateSequence()
        setTimeout(this.nextLevel, 1500)        
    }

    Start() {
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.togglebtnStart()
        this.level = 1;
        this.score = 0
        this.setLevelTitle()
        this.setScore()
        this.setTopScore()
        this.colors = {blue, red, cyan, brown}
    }

    togglebtnStart() {
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')
        } else {
            btnStart.classList.add('hide')
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.subLevel = 0;
        this.lightUpSequence();
        this.addClickEvents();
    }

    transformNumToColor(num) {
        switch (num) {
            case 0:
                return 'blue'
            case 1:
                return 'red'
            case 2:
                return 'cyan'
            case 3:
                return 'brown'
        }
    }

    transformColorToNum(color) {
        switch (color) {
            case 'blue':
                return 0
            case 'red':
                return 1
            case 'cyan':
                return 2
            case 'brown':
                return 3
        }
    }

    lightUpSequence() {
        for (let i = 0; i < this.level; i++) {
            let color = this.transformNumToColor(this.sequence[i]);

            setTimeout(() => this.turnOnColor(color), 1000 * i);
        }
    }

    turnOnColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350);
    }

    turnOffColor(color) {
        this.colors[color].classList.remove('light');
    }
    addClickEvents() {
        this.colors.blue.addEventListener('click', this.chooseColor)
        this.colors.red.addEventListener('click', this.chooseColor)
        this.colors.cyan.addEventListener('click', this.chooseColor)
        this.colors.brown.addEventListener('click', this.chooseColor)
    }

    deleteClickEvents() {
        this.colors.blue.removeEventListener('click', this.chooseColor)
        this.colors.red.removeEventListener('click', this.chooseColor)
        this.colors.cyan.removeEventListener('click', this.chooseColor)
        this.colors.brown.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev) {
        const nameColor = ev.target.dataset.color;
        const numberColor = this.transformColorToNum(nameColor);
        this.turnOnColor(nameColor);
        if (numberColor === this.sequence[this.subLevel]) {
            this.subLevel++
            this.score += 100
            this.setScore()
            if (this.subLevel === this.level) {
                this.level++                
                this.deleteClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.gameWon()
                } else {
                    setTimeout(this.finishedLevel(), 1500)
                }
            }
        } else {                
            this.gameOver()
        }
    }

    finishedLevel(){
        swal({
            icon: "success",
            title: "Level " + (this.level - 1) + " Complete",
            button: {
                text: "Next Level " + (this.level),
            },
        }).then(() => {
            this.score += 500
            this.setLevelTitle()
            this.setScore()
            this.nextLevel()
        })
    }

    gameWon() {
        swal({
            icon: 'success',
            title:'¡Muy bien!',
            text: '¡Felicidades, ganaste el juego!',
            button: {
             text:'Play Again'
            },
        }).then(() => this.Start)
    }

    gameOver() {
        swal({
            icon: "error",
            title: "¡Vaya!",
            text: 'Perdiste',
        }).then(() => {
            
            this.removeClickEvents()
            this.inicialize()
        })
    }

    setLevelTitle(){
        titleLevel.innerHTML = 'Level: ' + this.level
    } 
    setScore() {
        scoreLevel.innerHTML = 'Score: ' + this.score
        if (this.score > topScore) {
            topScore = this.score
            this.setTopScore()
        }
    }
    setTopScore() {        
        topScoreLevel.innerHTML = 'Top-Score: ' + topScore
    }
}

function Start() {
    window.juego = new Juego()
}