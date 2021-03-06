class Pong{
    constructor(gameSetup){
        this.display = document.querySelector(gameSetup.displaySelector);

        this.ballWidth = gameSetup.ballWidth;
        this.ballHeight = gameSetup.ballHeight;
        this.ball = this.createBall();
        this.ballSpeed = 16;

        this.movment = 5;
        this.movmentDirectionX = null;
        this.movmentDirectionY = null;
        this.movmentInterval = null;

        this.barWidth = gameSetup.barWidth;
        this.barHeight = gameSetup.barHeight;
        this.barMargin = 100;
        this.barSpeed = 7;

        this.barPlayerOne = this.createBar();
        this.playerOneInterval = null;
        this.playerOnePoints = 0;
        this.playerOnePointsNode = document.querySelector('.points.player-one');

        this.barPlayerTwo = this.createBar();
        this.playerTwoInterval = null;
        this.playerTwoPoints = 0;
        this.playerTwoPointsNode = document.querySelector('.points.player-two');
    }

    getRandomY = () =>{
        const min = 0;
        const max = this.display.offsetHeight - this.ballHeight;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomDirection = () =>{
        if(Math.floor(Math.random() * 2)){
            return 1;
        }
        else{
            return -1;
        }
    }

    createBall = () =>{
        const ball = document.createElement('div');
        ball.id = 'ball';
        ball.style.width = `${this.ballWidth}px`;
        ball.style.height = `${this.ballHeight}px`;
        this.display.appendChild(ball);

        return ball;
    }

    createBar = () =>{
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${this.barWidth}px`;
        bar.style.borderRadius = `${this.barWidth}px`;
        bar.style.height = `${this.barHeight}px`;
        this.display.appendChild(bar);

        return bar;
    }

    setBallStartPosition = () =>{
        this.movmentDirectionX = this.getRandomDirection();
        this.movmentDirectionY = this.getRandomDirection();
        this.ball.style.top = `${this.getRandomY()}px`;
        this.ball.style.left = `${(this.display.offsetWidth / 2) - (this.ballWidth / 2)}px`;
        //console.log(this.ball.style.top);
        //console.log(this.ball.style.left);
    }

    setBarStartPositions = () =>{
        this.barPlayerOne.style.left = `${this.barMargin}px`;
        this.barPlayerOne.style.top = `${(this.display.offsetHeight / 2) - (this.barHeight / 2)}px`;

        this.barPlayerTwo.style.left = `calc(100% - ${this.barMargin}px)`;
        this.barPlayerTwo.style.top = `${(this.display.offsetHeight / 2) - (this.barHeight / 2)}px`;
    }

    startMovment = () =>{
        this.movmentInterval = setInterval(this.ballMovment, this.ballSpeed);
    }

    startGame = () =>{
        if(!this.movmentInterval){
            this.setBallStartPosition();
            this.setBarStartPositions();
            this.setBarControl();
            this.startMovment();
        }
    }

    changeMovmentDirectionX = () =>{
        if(this.movmentDirectionX == 1){
            this.movmentDirectionX = -1;
        }
        else if(this.movmentDirectionX == -1){
            this.movmentDirectionX = 1;
        }
    }

    changeMovmentDirectionY = () =>{
        if(this.movmentDirectionY == 1){
            this.movmentDirectionY = -1;
        }
        else if(this.movmentDirectionY == -1){
            this.movmentDirectionY = 1;
        }
    }

    ballMovment = () =>{
        const movmentX = this.movment * this.movmentDirectionX;
        const movmentY = this.movment * this.movmentDirectionY;
        const documentWidth = this.display.offsetWidth;
        const documentHeight = this.display.offsetHeight;
        const ballLeft = this.ball.offsetLeft;
        const ballTop = this.ball.offsetTop;
        const barOneTop = this.barPlayerOne.offsetTop;
        const barTwoTop = this.barPlayerTwo.offsetTop;

        //Pi??ka po lewej stronie
        if((ballLeft + this.ballWidth / 2) < documentWidth / 2){
            //console.log('lewa strona');

            //G??rna cz?????? pi??ki znajduj?? si?? na wysoko??ci bandy
            if((ballTop + movmentY > barOneTop) && (ballTop +  movmentY < barOneTop + this.barHeight)){
                if((ballTop + movmentY > barOneTop) && (ballTop +  movmentY < barOneTop + this.barHeight)){
                    //Sprawdzenie czy pi??ka napewno jest przed band??
                    if(ballLeft > this.barMargin + this.barWidth / 2){
                        //Uderzenie pi??ki o lew?? band??
                        if(ballLeft + movmentX < this.barMargin + this.barWidth){
                            this.ball.style.left = `${this.barMargin + this.barWidth}px`;
                            this.changeMovmentDirectionX();
                            //console.log('dotkni??ta lewa banda');
                            return;
                        }
                    }
                }
            }
            //Dolna cz?????? paska znajduj?? si?? na wysoko??ci bandy
            else if((ballTop + this.ballHeight + movmentY > barOneTop) && (ballTop + this.ballHeight +  movmentY < barOneTop + this.barHeight)){
                if((ballTop + movmentY > barOneTop) && (ballTop +  movmentY < barOneTop + this.barHeight)){
                    //Sprawdzenie czy pi??ka napewno jest przed band??
                    if(ballLeft > this.barMargin + this.barWidth / 2){
                        //Uderzenie pi??ki o lew?? band??
                        if(ballLeft + movmentX < this.barMargin + this.barWidth){
                            this.ball.style.left = `${this.barMargin + this.barWidth}px`;
                            this.changeMovmentDirectionX();
                            //console.log('dotkni??ta lewa banda');
                            return;
                        }
                    }
                }
            }
        }
        //Pi??ka po prawej stronie
        else if((ballLeft + this.ballWidth / 2) > documentWidth / 2){
            //console.log('prawa strona');

            //G??rna cz?????? pi??ki jest na wysoko??ci bandy
            if((ballTop + movmentY > barTwoTop) && (ballTop +  movmentY < barTwoTop + this.barHeight)){
                //Sprawdzenie czy pi??ka napewno jest przed band??
                if(ballLeft + this.ballWidth < documentWidth - (this.barMargin + this.barWidth / 2)){
                    //Uderzenie pi??ki o praw?? band??
                    if(ballLeft + this.ballWidth + movmentX > documentWidth - (this.barMargin + this.barWidth)){
                        this.ball.style.left = `${documentWidth - this.barMargin - this.ballWidth}px`;
                        this.changeMovmentDirectionX();
                        //console.log('dotkni??ta prawa banda');
                        return;
                    }
                }
            }
            else if((ballTop + this.ballHeight + movmentY > barTwoTop) && (ballTop + this.ballHeight +  movmentY < barTwoTop + this.barHeight)){
                //Sprawdzenie czy pi??ka napewno jest przed band??
                if(ballLeft + this.ballWidth < documentWidth - (this.barMargin + this.barWidth / 2)){
                    //Uderzenie pi??ki o praw?? band??
                    if(ballLeft + this.ballWidth + movmentX > documentWidth - (this.barMargin + this.barWidth)){
                        this.ball.style.left = `${documentWidth - this.barMargin - this.ballWidth}px`;
                        this.changeMovmentDirectionX();
                        //console.log('dotkni??ta prawa banda');
                        return;
                    }
                }
            }
        }

        //Gracz numer 2 zdobywa punkt
        if((ballLeft + movmentX) > (documentWidth - this.ballWidth)){
            /*
            this.ball.style.left = documentWidth - this.ballWidth;
            this.changeMovmentDirectionX();
            return;
            */

            this.playerTwoPointsNode.textContent = ++this.playerTwoPoints;
            clearInterval(this.movmentInterval);
            this.setBallStartPosition();
            this.setBarStartPositions();

            setTimeout(() => {
                this.startMovment();
            }, 1000);

            return;

        }
        //Gracz numer 1 zdobywa punkt
        else if((ballLeft + movmentX) < 0){
            /*
            this.ball.style.left = this.ballWidth;
            this.changeMovmentDirectionX();
            return;
            */

            this.playerOnePointsNode.textContent = ++this.playerOnePoints;
            clearInterval(this.movmentInterval);
            this.setBallStartPosition();
            this.setBarStartPositions();

            setTimeout(() => {
                this.startMovment();
            }, 1000);
            
            return;

        }

        //Odbij od ??ciany g??rnej i dolnej
        if((ballTop + movmentY) > (documentHeight - this.ballHeight)){
            this.ball.style.top = documentHeight - this.ballHeight ;
            this.changeMovmentDirectionY();
            return;
        }
        else if((ballTop + movmentY) < 0){
            this.ball.style.top = this.ballHeight;
            this.changeMovmentDirectionY();
            return;
        }
        
        
        this.ball.style.left = `${ballLeft + movmentX}px`;
        this.ball.style.top = `${ballTop + movmentY}px`;
    }

    setBarControl = () =>{
        document.addEventListener('keydown', this.barControl);
        document.addEventListener('keyup', this.barControl);
    }

    barControl = (e) =>{
        let {keyCode, type} = e;

        if(keyCode === 38){
            if(type === 'keydown'){
                if(this.playerTwoInterval != null) return;

                this.playerTwoInterval = setInterval(() =>{
                    if(this.barPlayerTwo.offsetTop - this.movment > 0){
                        this.barPlayerTwo.style.top = `${this.barPlayerTwo.offsetTop - this.movment}px`;
                    }

                }, this.barSpeed);
            }
            else if(type === 'keyup'){
                clearInterval(this.playerTwoInterval);
                this.playerTwoInterval = null;
            }
        }
        else if(keyCode === 40){
            if(type === 'keydown'){
                if(this.playerTwoInterval != null) return;

                this.playerTwoInterval = setInterval(() =>{
                    if(this.barPlayerTwo.offsetTop + this.barHeight + this.movment < this.display.offsetHeight){
                        this.barPlayerTwo.style.top = `${this.barPlayerTwo.offsetTop + this.movment}px`;
                    }

                }, this.barSpeed);
            }
            else if(type === 'keyup'){
                clearInterval(this.playerTwoInterval);
                this.playerTwoInterval = null;
            }
        }
        else if(keyCode === 87){
            if(type === 'keydown'){
                if(this.playerOneInterval != null) return;

                this.playerOneInterval = setInterval(() =>{
                    if(this.barPlayerOne.offsetTop - this.movment > 0){
                        this.barPlayerOne.style.top = `${this.barPlayerOne.offsetTop - this.movment}px`;
                    }

                }, this.barSpeed);
            }
            else if(type === 'keyup'){
                clearInterval(this.playerOneInterval);
                this.playerOneInterval = null;
            }
        }
        else if(keyCode === 83){
            if(type === 'keydown'){
                if(this.playerOneInterval != null) return;

                this.playerOneInterval = setInterval(() =>{
                    if(this.barPlayerOne.offsetTop + this.barHeight + this.movment < this.display.offsetHeight){
                        this.barPlayerOne.style.top = `${this.barPlayerOne.offsetTop + this.movment}px`;
                    }

                }, this.barSpeed);
            }
            else if(type === 'keyup'){
                clearInterval(this.playerOneInterval);
                this.playerOneInterval = null;
            }
        }
    }
}

const initGame = () =>{
    const gameSetup = {
        displaySelector: '.project-wrapper',
        ballWidth: 25,
        ballHeight: 25,
        barWidth: 10,
        barHeight: 150,
    }

    const pong = new Pong(gameSetup);
    pong.startGame();
}


