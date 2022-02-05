class Result {
    // klasa moze przechowywac tylko metody 
    // 1. zwraca wynik, czyli warunki zwyciestwa
    // 2. zasady
// metoda statyczna tylko dostpena po wywyolaniu klasy  
    static moneyWinInGame(result,bid){
        if(result) return 3*bid;
        else return 0;
    }
    //zasady
    static checkWinner(draw){
        if(draw[0]===draw[1] && draw[1]===draw[2] || draw[0]!==draw[1] && draw[1]!==draw[2] && draw[2]!==draw[0]){
            return true;
        }
        else return false
    }
}

//wchodzenie do metod Object.metoda()

// Result.moneyWinInGame(true,12)