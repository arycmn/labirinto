const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];
let classe
let jogadorX
let jogadorY
let letra
let labirinto = document.getElementById("labirinto")
let resposta =document.getElementById('resposta')

// Criar um loop de repetição for que cria uma div pra cada linha do Map 
function criaDivLinha() {
    for (let i = 0; i < map.length; i++) {
        let div = document.createElement('div')
        div.id = `linha${i}`
        div.className = 'linha'
        labirinto.appendChild(div)
    }
}
criaDivLinha()
// Criar um Loop de repetição for que cria uma div pra cada letra 
function percorreLinhas() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            letra = map[i][j]
            let pai = document.getElementById(`linha${i}`)
            let div = document.createElement('div')
            div.className = 'celula'
            div.id = `celula ${j}`
            switch (letra) {
                case "W":
                    div.classList.add('parede')
                    break
                case " ":
                    div.classList.add('vazio')
                    break
                case "S":
                    div.classList.add('start')
                    let jogador = document.createElement('div')
                    jogador.id = 'jogador'
                    div.appendChild(jogador)
                    break
                case "F":
                    div.classList.add('final')
                    break
            }
            pai.appendChild(div)
        }

    }
}
percorreLinhas()

let jogador = document.getElementById('jogador')
posicaoJogador()

//EVENTO DE CAPTÇÃO DE TECLAS
document.addEventListener('keydown', (event) => {
    let keyName = event.key
    seletorDeDirecao(keyName)
    // console.log(keyName)
})


//SELECIONA QUAL FUNÇÃO SERÁ ACIONADA DE ACORDO COM A TECLA PRESSIONADA
function seletorDeDirecao(key) {
    switch (key) {

        case 'ArrowUp':
            sobe()
            break
        case 'ArrowDown':
            desce()
            break
        case 'ArrowLeft':
            esquerda()
            break
        case 'ArrowRight':
            direita()
            break
    }
    posicaoJogador()
}

//Posição do jogador
function posicaoJogador() {
    let arrayjogadorX = jogador.parentElement.getAttribute('id').split(' ')
    jogadorX = parseInt(arrayjogadorX[1])
    let jogadorPai = jogador.parentElement
    let arrayjogadorY = jogadorPai.parentElement.getAttribute('id').split('a')
    jogadorY = parseInt(arrayjogadorY[1])
}
//FUNÇÕES DE DIREÇÃO


function sobe() {
    let newY = jogadorY - 1
    let destino = (document.getElementById(`linha${newY}`)).children[jogadorX]
    console.log(destino)
    anda(destino)

}
function desce() {
    let newY = jogadorY + 1
    let destino = (document.getElementById(`linha${newY}`)).children[jogadorX]
    anda(destino)

}
function esquerda() {
    let newX = jogadorX - 1
    let destino = (document.getElementById(`linha${jogadorY}`)).children[newX]
    anda(destino)
}
function direita() {
    let newX = jogadorX + 1
    let destino = (document.getElementById(`linha${jogadorY}`)).children[newX]
    anda(destino)
}
//move o personagem 
function anda(destino) {
    classe = destino.classList[1]
    console.log(jogador)
    console.log(destino)
    switch (classe) {
        case 'vazio':
            destino.appendChild(jogador)
            console.log(jogador)
            break
        case 'final':
            destino.appendChild(jogador)
            let mensagem = document.createElement('p')
            mensagem.id = 'presposta'
            mensagem.innerText = "Você venceu"
            resposta.appendChild(mensagem)
            
            break
    }
}


// loop for define uma classe pra cada Div de cada letra 
// criar evento de captação de teclas
// identificar a tecla apertada e vincular a um apendchild para direção correta caso não seja uma parede
// definir condição de vitória caso seja feito um appendchild em uma determinada div