function getPlayerName() {
    return new Promise((resolve, reject) => {
       let playerName = prompt('What is your name');
        if (playerName !== null) {
            resolve(playerName);
        }
    });
}

window.addEventListener('load', async () => {
    if(!sessionStorage.getItem('playerOne')){
        sessionStorage.setItem('playerOne', await getPlayerName());
    }
    if(!sessionStorage.getItem('playerTwo')){
        sessionStorage.setItem('playerTwo', await getPlayerName());
    }
    current.innerHTML = activePlayer;
});
let current = document.querySelector("span");

let player1 = sessionStorage.getItem('playerOne');
let player2 = sessionStorage.getItem('playerTwo');

let activePlayer = player1;

const generateSymbol = () =>{
    return activePlayer === player1 ? "X" : "O";
}

const togglePlayer = () =>{
    return activePlayer === player1 ? player2 : player1;
}

const $el = document.querySelectorAll(".wrapper > div ");

$el.forEach(elem => elem.addEventListener("click", (e) => {
    if(!e.target.innerHTML){
    e.target.innerHTML = generateSymbol();
    activePlayer = togglePlayer();
    current.innerHTML = activePlayer;
    }
}))

const button = document.querySelector("button");
button.addEventListener("click", () =>{
    $el.forEach(elem => elem.innerHTML = null);
    activePlayer = player1;
})

// let $elMatrix = [];
// for(let i=0; i<2; i++)

// let game = $el.reduce((total,cur)=>{
//     cur[pos] = 
// },[])

// const winChecker = ($el) => {
//     {pos: [0,2], symbol: "X"}
//     let player1array=$el.filter(elem => elem.symbol === "X")
//     if()
// }

