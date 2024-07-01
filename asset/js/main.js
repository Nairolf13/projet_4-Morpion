let container = document.querySelector("#container")
let grille = document.createElement("div")
let winner = document.createElement("p")
let play = document.createElement("button")
play.addEventListener("click", () => { cpuMode = false })
container.appendChild(play)
play.classList.add("buttonPlay")
play.innerHTML = "1 VS 1"
let ia = document.createElement("button")
ia.addEventListener("click", () => { cpuMode = true })
container.appendChild(ia)
let replay = document.createElement("button")
replay.innerHTML = "replay"
replay.classList.add("replay")
container.appendChild(replay)
ia.classList.add("buttonIa")
ia.innerHTML = "1 VS IA"
let cpuMode = false
container.appendChild(winner)
let endGame = false
let counter = 0
let joueur1 = "X"
let scoreplayer1 = 0
let scoreplayer2 = 0
let score = document.createElement("p")
score.innerHTML = "scoreJ1 : " + scoreplayer1
score.classList.add("score1")
container.appendChild(score)
let joueur2 = "O"
let score2 = document.createElement("p")
score2.classList.add("score2")
score2.innerHTML="scoreJ2 : " +  scoreplayer2
container.appendChild(score2)
let game = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]
replay.addEventListener("click", () => { refresh() })

container.appendChild(grille)

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ifWinner(player) {
    
    if (findwinner(player)) {
        winner.innerHTML = `${player} a gagné!`
        endGame = true
        if (player == joueur1) {
            scoreplayer1++
            score.innerHTML = "scoreJ1 : " + scoreplayer1
        }else{
            scoreplayer2++
            score2.innerHTML = "scoreJ1 : " + scoreplayer2
        }
    } else if (counter === 8) {
        winner.innerHTML = "Match nul!"
        endGame = true
    } 
}

function choiceplayer(row, col) {
    if (game[row][col] === "" && !endGame) {
        if (counter % 2 == 0) {
            game[row][col] = joueur1
          ifWinner(joueur1)
            if (cpuMode == true) {
                cpu()
            }
        } else {
            game[row][col] = joueur2
            ifWinner(joueur2)
        }
        counter++
      
        createGrid(game)
    }
}

function createGrid(table) {
    grille.innerHTML = ''
    table.forEach((row, rowIndex) => {
        let ligne = document.createElement("div");
        ligne.classList.add("ligne");
        row.forEach((cell, colIndex) => {
            let cellule = document.createElement("div");
            cellule.classList.add("cellule");
            cellule.addEventListener("click", () => {
                choiceplayer(rowIndex, colIndex);
            });
            switch (cell) {
                case joueur1:
                    cellule.innerHTML = joueur1
                    break
                case joueur2:
                    cellule.innerHTML = joueur2
                    break
            }
            ligne.appendChild(cellule);
        });
        grille.appendChild(ligne);
    });
}

function cpu() {
    if (counter < 8 && endGame == false) {
        let randomX = random(0, game.length - 1);
        let randomY = random(0, game[0].length - 1);

        while (game[randomX][randomY] !== "") {
            randomX = random(0, game.length - 1);
            randomY = random(0, game[0].length - 1);
        };
        game[randomX][randomY] = joueur2;
        counter++;
       ifWinner(joueur2 )
    }
}

function findwinner(player) {
    console.log(player);
    for (let i = 0; i < 3; i++) {
        console.log(game[i][0]);
        if ((game[i][0] === player && game[i][1] === player && game[i][2] === player) ||
            (game[0][i] === player && game[1][i] === player && game[2][i] === player)) {
            return true;
        }
    }
    if ((game[0][0] === player && game[1][1] === player && game[2][2] === player) ||
        (game[0][2] === player && game[1][1] === player && game[2][0] === player)) {
        return true;
    }
    return false;
}

function refresh() {
    game.forEach((row, i)=> {
        row.forEach((cell, j)=> {
            game[i][j] = ""
        })
    });

    winner.innerHTML=""
    counter = 0
    endGame = false
    createGrid(game)
}

createGrid(game)






