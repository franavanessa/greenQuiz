const background = document.getElementById('wrapper');
const imageQuestion = window.document.getElementById('imgQuestion');
const titleQuestion = window.document.getElementById('titleQuestion');
const separator = window.document.getElementById('separator')
const listOptions = window.document.getElementById("list-options");
const letterQuestion = window.document.getElementById('letter');
const answerQuestion = window.document.getElementById('answer');
const progres = window.document.getElementById('progress');
const progressBar = window.document.getElementById('prgbar');


const questions = [ // Array com as perguntas
    {
        image: 'url(https://images.pexels.com/photos/158780/leaf-nature-green-spring-158780.jpeg)',
        title: 'O que fazer quando se tem pilhas e baterias que não são mais utilizadas em sua residência?',
        options: [
            { opc: 'A', txt: 'Levar a um local de coleta e descarte de pilhas.' },
            { opc: 'B', txt: ' Jogar no lixo' },
            { opc: 'C', txt: ' Enterrar' }
        ],
        correct: 'A'
    },
    {
        image: 'url(https://super.abril.com.br/wp-content/uploads/2019/06/site_temponatureza.png)',
        title: ' Qual o país que mais tem acúmulo de lixo eletrônico ?',
        options: [
            { opc: 'A', txt: 'China' },
            { opc: 'B', txt: 'Brasil' },
            { opc: 'C', txt: 'Estados Unidos' }
        ],
        correct: 'C'
    },
    {
        image: 'url(https://blog.phebo.com.br/wp-content/uploads/2020/07/destino-na-natureza-780x450.jpg)',
        title: 'Somente uma Terra é o tema de campanha da semana do meio ambiente 2022. O evento tem duração de 7 dias todos os anos, mas tem 1 dia que é considerado oficial, qual dia é esse?',
        options: [
            { opc: 'A', txt: '5 de junho' }
            { opc: 'B', txt: '31 de Maio' },
            { opc: 'C', txt: '13 de Abril' }
        ],
        correct: 'C'
    }
];

var indexQuestions = 0; // Marca o índex do array para alternar as perguntas
var currentQuestion = 0; // Marca o número da pergunta atual
var progress = 0; // Marca a porcentagem da barra de progresso
var score = 0; // Marca os pontos ganhos

function show() { // Função para exibir o quiz (imagem de apoio, pergunta e opções) na tela
    imageQuestion.style.backgroundImage = questions[indexQuestions]["image"];
    titleQuestion.innerText = questions[indexQuestions]["title"];
    questions[indexQuestions]["options"].forEach(options => {
        const divOption = document.createElement('div');
        divOption.classList.add('option');
        divOption.innerHTML = `<span class="col-3 letter" data-option=${options.opc}>${options.opc}</span><span class="col-9 answer" data-option=${options.opc}>${options.txt}</span>`;
        divOption.dataset.option = options.opc;
        listOptions.appendChild(divOption);
    });
    currentQuestion++;
    console.log(`\n ---- PERGUNTA NÚMERO ${currentQuestion} ---- `)
    progress += 10;
    progressBar.style.width = `${progress}%`;
    listOptions.addEventListener('click', select);
};

function select(e) { // Função para obter a resposta do usuário através de evento de click
    const selection = e.target.dataset.option;
    console.log(`  >> SUA RESPOSTA: OPÇÃO ${selection}`);
    if (selection == questions[indexQuestions]["correct"]) {
        score++;
        console.log(`  >> Certa Resposta! Você tem ${score} pontos`);
        nextQuestion();
    } else {
        console.log("  >> Resposta Errada");
        nextQuestion();
    }
};

function nextQuestion() { // Função para exibir a próxima pergunta
    if (currentQuestion <=2) {
        indexQuestions++;
        setTimeout(clear, 800);
        setTimeout(show, 1200);
    } else {
        setTimeout(clear, 800);
        setTimeout(stop, 1200);
    }
};

function clear() { // Função para limpar a pergunta atual para ser exibido a próxima
    imageQuestion.style.backgroundImage = "";
    titleQuestion.innerText = "";
    while (listOptions.firstChild) {
        listOptions.removeChild(listOptions.firstChild);
    }
};

function stop() { // Função para o fim do quiz, exibindo o resultado de acertos
    separator.classList.add('hidden');
    progres.parentNode.removeChild(progres)
    if (score >= 3) {
        imageQuestion.style.backgroundImage = 'url(https://media.tenor.com/H6sA-iUDtBAAAAAM/rebirth-mother-nature.gif)';
        titleQuestion.innerText = `Parabéns, Você Acertou ${score} Perguntas !!! \n Você Provou que é um Cidadão Consciente`;
        const shareButton = document.createElement('div');
        shareButton.innerHTML = '<button class="share">Compartilhar</button><p>Compartilhe esse quiz e conscientize mais pessoas.</p>'
        listOptions.appendChild(shareButton);
        listOptions.addEventListener('click', shared);
    } else {
        background.style.backgroundImage = 'url(../img/bg2.png)'
        imageQuestion.style.backgroundImage = 'url(https://i.pinimg.com/originals/9a/28/c9/9a28c93fe813cd722c3dd3c49130c939.gif)';
        titleQuestion.innerText = `Você Acertou Somente ${score} Perguntas. \n Ainda há importantes lições para se aprender, mas não desista!`;
        const shareButton = document.createElement('div');
        shareButton.innerHTML = '<button class="restart">Refazer</button><p>Tente fazer de novo e aprender mais desse tema tão importante</p>'
        listOptions.appendChild(shareButton);
        listOptions.addEventListener('click', reset);
    }
}

function shared() { // Função para compartilhar o quiz
    if (navigator.share !== undefined) {
		navigator.share({
			title: 'Quiz Meio Ambiente',
			text: 'Trabalho de conscientização sobre cuidados com o meio ambiente',
			url: 'https://github.com/douleal/greenQuiz',
		})
		.then(() => console.log('Compartilhado com sucesso'))
		.catch((error) => console.log('Erro ao compartilhar', error));
	}
    window.location.reload(true);
}

function reset() { // Função para reiniciar o quiz
    window.location.reload(true);
}

(function(){ // Auto inicia a função show()
    show()
}());
