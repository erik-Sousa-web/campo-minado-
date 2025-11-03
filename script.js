// Configurações Globais do Jogo
const ROWS = 8;
const COLS = 8;
const BOMBS = 10;
let isGameOver = false;
let board = []; 

// 1. Função para iniciar o jogo (chamada pelo botão "Bora jogar!")
function iniciarJogo() {
    // Esconde o conteúdo inicial
    document.querySelector('.content h2').style.display = 'none';
    document.querySelector('.content p').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';

    // Garante que o botão de restart esteja visível (para o próximo jogo)
    document.getElementById('restart-button').style.display = 'block';

    // Cria e desenha o tabuleiro
    criarTabuleiro();
}

// 2. Função principal para criar o tabuleiro
function criarTabuleiro() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; 
    board = []; 
    isGameOver = false; // Garante que o jogo comece não terminado

    // Aplica o Grid CSS e exibe o tabuleiro
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = `repeat(${COLS}, 30px)`;
    gameBoard.style.gap = '2px';
    gameBoard.style.margin = '20px auto';
    gameBoard.style.border = '4px solid #ff0000';
    
    // 2.1. Inicializa a matriz e cria os elementos HTML
    for (let r = 0; r < ROWS; r++) {
        board[r] = [];
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'hidden');
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            // Adiciona o evento de clique (revelar) e clique direito (futura bandeira)
            cell.onclick = () => revelarCelula(r, c); 
            cell.oncontextmenu = (e) => { e.preventDefault(); /* Futura função de marcarBandeira(r, c); */ };
            
            gameBoard.appendChild(cell);
            board[r][c] = { isBomb: false, count: 0, element: cell, revealed: false };
        }
    }
    
    // 2.2. Coloca as bombas
    colocarBombas();
    
    console.log("Novo tabuleiro criado com bombas!");
}

// 3. Lógica para posicionar as bombas aleatoriamente
function colocarBombas() {
    let bombsPlaced = 0;
    while (bombsPlaced < BOMBS) {
        const randRow = Math.floor(Math.random() * ROWS);
        const randCol = Math.floor(Math.random() * COLS);

        if (!board[randRow][randCol].isBomb) {
            board[randRow][randCol].isBomb = true;
            bombsPlaced++;
        }
    }
}


// 4. Função para manipular o clique e revelar a célula
function revelarCelula(row, col) {
    if (isGameOver || board[row][col].revealed) return;

    const cellData = board[row][col];
    const cellElement = cellData.element;

    cellData.revealed = true;
    cellElement.classList.remove('hidden');
    cellElement.classList.add('revealed');

    if (cellData.isBomb) {
        // CLICOU NA BOMBA! FIM DE JOGO
        cellElement.textContent = '💣';
        cellElement.style.backgroundColor = 'red';
        isGameOver = true;
        
        alert('💥 BOOM! Você explodiu! Fim de Jogo.');

    } else {
        // É SEGURO
        // O número correto de bombas vizinhas virá aqui.
        cellElement.textContent = '3'; // Número temporário para teste
        cellElement.style.color = 'blue';
    }
}


// 5. Função para reiniciar o jogo (chamada pelo botão "Novo Jogo")
function reiniciarJogo() {
    isGameOver = false; 
    document.getElementById('game-board').innerHTML = ''; // Limpa o HTML do tabuleiro
    
    // Começa um novo jogo
    criarTabuleiro();
}