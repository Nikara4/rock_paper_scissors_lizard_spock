//obiekty przechowujące wyniki gry oraz co wybrał gracz/komputer
const gameScore = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
};

const game = {
    playerHand: null,
    aiHand: null,
};

const hands = [...document.querySelectorAll('.hands div img')];

//funkcja wybierania dłoni gracza
function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 2px 5px crimson';
};

//wywołanie
hands.forEach(hand => (hand.addEventListener('click', handSelection)));

//funkcja wybierania dłoni komputera
function aiChoice() {
    const aiPick = hands[Math.floor(Math.random() * 5)].dataset.option;
    return aiPick;
};

//funkcja określająca wynik gry
function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === 'paper' && ai === 'rock') || (player === 'lizard' && ai === 'paper') || (player === 'paper' && ai === 'Spock') || (player === 'rock' && ai === 'scissors') || (player === 'rock' && ai === 'lizard') || (player === 'Spock' && ai === 'rock') || (player === 'scissors' && ai === 'paper') || (player === 'scissors' && ai === 'lizard') || (player === 'Spock' && ai === 'scissors') || (player === 'lizard' && ai === 'Spock')) {
        return 'win';
    } else {
        return 'loss';
    };
};

//funkcja do upubliczniania wyników na stronie
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameScore.numbers;


    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameScore.wins;
        document.querySelector('[data-summary="who-win"]').textContent = 'You chose weasley';
        document.querySelector('[data-summary="who-win"]').style.color = 'green';
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameScore.losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'You chose poorly';
        document.querySelector('[data-summary="who-win"]').style.color = 'red';
    } else {
        document.querySelector('p.draws span').textContent = ++gameScore.draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'There is a draw';
        document.querySelector('[data-summary="who-win"]').style.color = 'gray';
    }
}

//funkcja czyszczenia gry po zagraniu
function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = '';
}

//naciśnięcie przycisku - brak wybranej dłoni zwraca alert, wybrana dłoń = match
document.querySelector('.start').addEventListener('click', () => {
    if (!game.playerHand) return alert('Choose your weapon, you fool!');

    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);

    endGame();
})

document.querySelector('.help').addEventListener('click', () => {
    return alert(`Scissors cuts Paper
Paper covers Rock
Rock crushes Lizard
Lizard poisons Spock
Spock smashes Scissors
Scissors decapitates Lizard
Lizard eats Paper
Paper disproves Spock
Spock vaporizes Rock
(and as it always has) Rock crushes Scissors`);
})