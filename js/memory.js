let arrayAnimali = ['🐱', '🦉', '🐵', '🦁', '🐷', '🐛', '🐝', '🦕', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐵', '🦁', '🐷', '🐛', '🐝', '🦕', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer


//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function createCards(){
    let randomCards = shuffle(arrayAnimali);
    for (const key in randomCards){
        let cardsMemory = document.createElement('div');
        cardsMemory.className = "icon";
        cardsMemory.innerHTML += randomCards[key];
        document.querySelector('#griglia').appendChild(cardsMemory);
    }
}

function startGame(){
    createCards();
}

let showCard = document.querySelectorAll('#griglia div');
showCard.forEach(card => {
    card.addEventListener('click', function(){
        var icon = document.getElementsByClassName("icon");
        var icons = [...icon];
        this.classList.toggle("show");
        arrayComparison.push(this);
        var len = arrayComparison.length;
        if (len === 2) {
            if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
                arrayComparison[0].classList.add("find", "disabled");
                arrayComparison[1].classList.add("find", "disabled");
                arrayComparison = [];
            } else {
                icons.forEach(function(item) {
                    item.classList.add('disabled');
                });
                setTimeout(function() {
                    arrayComparison[0].classList.remove("show");
                    arrayComparison[1].classList.remove("show");
                    icons.forEach(function(item) {
                        item.classList.remove('disabled');
                        /* for (var i = 0; i < iconsFind.length; i++) {
                            iconsFind[i].classList.add("disabled");
                        } */ 

                        // SE NON SI TOGLIE QUESTA PARTE DI CODICE, RESTA TUTTO DISABILITATO, TOGLIENDOLA, FUNZIONA IN MODO CORRETTO

                    });
                    arrayComparison = [];
                }, 700);
            }
        }
    })
})

//_________IMPORTANTE________________

// RICHIAMANDO LA FUNZIONE displayIcon() IN QUELLA CHE HO COSTRUITO IO, DAVA MOLTI BUG E PROBLEMI DI FUNZIONAMENTO, CHE SI SONO RISOLTI COPIANDO LA FUNZIONE ALL'INTERNO DI QUELLA DA ME CREATA PER IL CLICK

function displayIcon() { 
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show

    this.classList.toggle("show");


    
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

// una funzione che calcola il tempo e aggiorna il contenitore sotto

let min = 0;
let sec = 0;
let timer;
cronometro();

function setCronometro() {
    sec++;
    if(sec >= 60) {
        sec = 0;
        min++;
    }
    cronometro();
}

function cronometro() {
    document.querySelector('.timer').innerHTML = 'Tempo: ' + (min > 9 ? min : +min ) + ' min ' + (sec > 9 ? sec : +sec) + ' sec';
}

let startClick = document.querySelector('#griglia');
startClick.addEventListener('click', function(){
    timer = setInterval(setCronometro, 1000);
}, {once : true});


//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte

let allCards = document.querySelectorAll('.icon');
allCards.forEach(card => {
    card.addEventListener('click', function(){
        let winGame = document.querySelector('#modal');
        let cardChecked = document.getElementsByClassName('find');
        if(cardChecked.length === 24){
            winGame.style.display = 'block';
            clearInterval(timer);
            document.querySelector('#tempoTrascorso').innerHTML = (min > 9 ? min : +min ) + ' min ' + (sec > 9 ? sec : +sec) + ' sec';
        }
    })
})

// una funzione che nasconde la modale alla fine e riavvia il gioco

function playAgain(){
    window.location.reload();
}

