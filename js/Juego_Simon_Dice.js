const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10;

class Juego {
    constructor() {
        this.Start = this.Start.bind(this)
        this.Start()
        this.generateSequence()
        setTimeout(this.nextLevel, 1000)        
    }

    Start() {
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.togglebtnStart()
        this.level = 1;
        this.colores = {celeste, violeta, naranja, verde}
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
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformColorToNum(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
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
        this.colores[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350);
    }

    turnOffColor(color) {
        this.colores[color].classList.remove('light');
    }
    addClickEvents() {
        this.colores.celeste.addEventListener('click', this.chooseColor)
        this.colores.violeta.addEventListener('click', this.chooseColor)
        this.colores.naranja.addEventListener('click', this.chooseColor)
        this.colores.verde.addEventListener('click', this.chooseColor)
    }

    deleteClickEvents() {
        this.colores.celeste.removeEventListener('click', this.chooseColor)
        this.colores.violeta.removeEventListener('click', this.chooseColor)
        this.colores.naranja.removeEventListener('click', this.chooseColor)
        this.colores.verde.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev) {
        const nameColor = ev.target.dataset.color;
        const numberColor = this.transformColorToNum(nameColor);
        this.turnOnColor(nameColor);

        if (numberColor === this.sequence[this.subLevel]) {
            
            this.subLevel++

            if (this.subLevel === this.level) {
                
                this.level++                
                this.deleteClickEvents()

                if (this.level === (LAST_LEVEL + 1)) {
                
                    this.gameWon()

                } else {
                
                    setTimeout(this.nextLevel, 1500)
                
                }

            } else {
                
                this.gameOver()
            }
        }
    }

    gameWon() {
        swal('¡Muy bien!', '¡Felicidades, ganaste el juego!', 'success')
            .then(() => {
                this.deleteClickEvents()
                this.Start()
            })
    }

    gameOver() {
        swal('¡Que mal!', 'Intentalo otra vez', 'error')
            .then(() => {
                this.deleteClickEvents()
                this.Start()
            })
    }
}

function Start() {
    window.juego = new Juego()
}