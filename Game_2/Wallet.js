class Wallet {
    constructor(money){
        let _money = money;
        // pobieranie aktulanej wartosci portefla
        this.getWalletValue = () => _money;
        // sprawdzanie czy uzytkownik ma odpowiednia ilosc środków
        this.checkCanPlay = (value) => {
            if (_money >= value) return true;
            else return false;
        } 
        this.changeWallet = (value, type='+') => {
            if(typeof value === 'number' && !isNaN(value)){
                if(type === '+'){
                    return _money+=value; 
                }
                else if (type === '-'){
                    return _money-=value; 
                }
                else {
                    throw new Error ('Nieprawidłowy tryb działania')
                }
            }
            else{
                console.log(typeof value);
                throw new Error ('nieprawidłowa liczba')
            }
        }
    }
}


