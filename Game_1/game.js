const gameSummary = 
{
number: 0,
wins: 0,
losses: 0,
draws: 0,
};

const game = 
{
playerHand: null,
aiHand: null,
};
// Pobieramy wszystki grafiki tworzac NodeList(nibyTablice)
const hands = [...document.querySelectorAll('.select img')];

// 1 . Pierwsza funkcji
function handSelection() {
    game.playerHand =this.dataset.option;
    hands.forEach((hand)=>{hand.style.boxShadow = '';})
    this.style.boxShadow = '0 0 0 4px red';
};
hands.forEach((hand)=>(hand.addEventListener('click',handSelection)));
// 3.Funkcja losowanie komputer
function aiChoice(){
    const aiHand = hands[Math.floor(Math.random()*3)].dataset.option;
    return aiHand;
};
// 4.Funkcja sprawdzajaca wygrane
function checkResult(player, ai){
//remis
if(player === ai){
return 'draw';
}
//wygrana uzytkownika
else if(player === 'papier' && player === 'kamień' || player === 'kamień' && ai === 'nożyczki' || player === 'nożyczki' && ai === 'papier'){
return 'win';
}
else{
//przegrana
return 'lose';
}



}
// 5.Funkcja publikujaca wynik
function publishResult(player,ai,result)
{
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    gameSummary.number++;
    document.querySelector('p.numbers span').textContent = gameSummary.number;
    if(result === 'draw'){
        gameSummary.draws++
        document.querySelector('p.draws span').textContent = gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'Remis';
        document.querySelector('[data-summary="who-win"]').style.color ='grey';
    }
    else if(result === 'win'){
        gameSummary.wins++
        document.querySelector('p.wins span').textContent = gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = 'Wygrałeś';
        document.querySelector('[data-summary="who-win"]').style.color ='green';
    }
    else{
        gameSummary.losses++
        document.querySelector('p.losses span').textContent = gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'Przegrałeś';
        document.querySelector('[data-summary="who-win"]').style.color ='red';
    }
}
// 6. Funkcja kończąca
function endGame() {
   document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow ="";
   game.playerHand = null;
}


// 2.Funkcja sterujaca Działanie programu!!!
function startGame(){
    if(!game.playerHand) return alert('Wybierz dłoń');
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand , game.aiHand);
    publishResult(game.playerHand,game.aiHand,gameResult);
    endGame();
}

document.querySelector('.start').addEventListener('click',startGame)
