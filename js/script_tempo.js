//start
let start = document.querySelector('#start');
let iniciar = document.querySelector('#iniciar');

//Regras
let regras = document.querySelector('#regras');
let sair = document.querySelector('#sair');
let continuar = document.querySelector('#ctn');

//Quiz
let quiz = document.querySelector('#card');
let time = document.querySelector('#time');

//Questões
let questnum = document.querySelector('#questnum');
let questtxt = document.querySelector('#questtxt');

//Alternativas
let opc1 = document.querySelector('#opc1');
let opc2 = document.querySelector('#opc2');
let opc3 = document.querySelector('#opc3');
let opc4 = document.querySelector('#opc4');

//Respostas e Próximo
let total = document.querySelector('#total');
let prox = document.querySelector('#prox');

//Todas as alternativas
let alt_qst = document.querySelectorAll(".alt_qst");

//Vetor de questões
let availableQST = [];
let atualQST;

//Número da questão
let index = 0;
let timer = 0;
let interval = 0;

//Total de acertos
let correct = 0;

//Respostas do usuário
let UserResp = undefined;

//Resultado
let resultado = document.querySelector('#resultado');

let username = document.querySelector('#username');
let estado = document.querySelector('#estado');
let score = document.querySelector('#score');
let again = document.querySelector('#again');
let sbmt = document.querySelector('#sbmt');
const highscore = JSON.parse(localStorage.getItem('highscore')) || [];

const MAX_HIGHSCORE = 5;


//Quando clicar em 'inicar'
iniciar.addEventListener("click" , ()=>{
    start.style.display = "none";
    regras.style.display = "block";
});

//Qunado clicar no botão 'Sair' nas Regras
sair.addEventListener("click" , ()=>{
    start.style.display = "flex";
    regras.style.display = "none";
});

let contador = ()=>{
    if(timer === 20){
        clearInterval(interval);
        // prox.click();
        derrota();
    }
    else{
        timer++;
        time.innerText = timer;
    }
}

function setListaQST(){
    const totalQST = MCQS.length;
    for(i=0; i<totalQST; i++){
        availableQST.push(MCQS[i]);
    };

    availableQST.slice(0,9)
}

let loadData = () => {
    questnum.innerText = index + 1 + ". ";
    
    const numQST = availableQST[Math.floor(Math.random()*availableQST.length)];
    atualQST = numQST;

    questtxt.innerText = atualQST.question;

    
    opc1.innerText = atualQST.choice1;
    opc2.innerText = atualQST.choice2;
    opc3.innerText = atualQST.choice3;
    opc4.innerText = atualQST.choice4;

    const index1 = availableQST.indexOf(numQST);
    availableQST.splice(index1,1);

    //iniciar tempo
    timer = 0;
}

//loadData();

//Quando clicar no botão 'Continuar' nas Regras
continuar.addEventListener("click" , ()=>{
    regras.style.display = "none";
    quiz.style.display = "block";
    
    interval = setInterval(contador, 1000);
    loadData();
    
    //Remover os ativos
    alt_qst.forEach( removeActive =>{
        removeActive.classList.remove("active");
    })
    total.innerHTML = `Corretas: ${correct = 0} de 5 questões`;
});

alt_qst.forEach( (choices,choiceNo) => {
    choices.addEventListener("click" , ()=>{
        choices.classList.add("active");
          
        //Verificar resposta
        if (choiceNo === atualQST.answer) {
            correct++;
        } else {
            correct += 0;
        }

        //Parar contador
        clearInterval(interval);

        //Desabilitar outras alternativas
         for (i = 0; i <= 3; i++) {
            alt_qst[i].classList.add("disabled");
        }
        
        
    });
    
});

//O que acontece qundo clicar em proximo
prox.addEventListener("click" , ()=>{
    if(index !== /*MCQS.length*/ 5 -1){
        index = index + 1;
        //Remover os ativos
        alt_qst.forEach( removeActive =>{
            removeActive.classList.remove("active");
        })
        if(index !== correct){
            derrota();
        }
        else{
            //Questão
            loadData();
            //total
            total.style.display = "block";
            total.innerHTML = `Corretas: ${correct} de 5 questões`;
            clearInterval(interval);
            interval = setInterval(contador, 1000);
        }
    }
    else{
        index = 0;
        if(correct !== 5){
            derrota();
        }
        else{
            vitoria();
        }       
    }
    for (i = 0; i <= 3; i++) {
        alt_qst[i].classList.remove("disabled");
    }
})


let derrota = ()=>{
    quiz.style.display = "none";
    resultado.style.display = "flex";
    estado.innerHTML = `Derrota`;
    score.innerHTML = `Você não conseguiu vencer o modo contra o tempo, tente novamente.`;
};

let vitoria = ()=>{
    quiz.style.display = "none";
    resultado.style.display = "flex";
    estado.innerHTML = `Vitória`;
    score.innerHTML = `Você conseguiu vencer o modo contra o tempo, parabéns!`;
};

again.addEventListener("click" , ()=>{
    start.style.display = "flex";
    resultado.style.display = "none";
    index = 0;
    timer = 0;
    interval = 0;
    for (i = 0; i <= 3; i++) {
        alt_qst[i].classList.remove("disabled");
    }
    setListaQST();
});



//Resultado
let usuario = ()=>{
    quiz.style.display = "none";
    resultado.style.display = "flex";
    score.innerHTML = `${correct*10}`;
    
    
    username.addEventListener('keyup', ()=>{
        sbmt.disabled = !username.value;
    });
    
    savescore = e =>{
        e.preventDefault();
        
        var id = "teste";
        if (correct == 4){
            id = "patrulheiro";
        }
        
        const pts = {
            pontos: correct,
            name: username.value,
            title: id
        }
    
        highscore.push(pts);
    
        highscore.sort((a,b) => {
            return b.pontos - a.pontos 
        });
    
        highscore.splice(10);
        localStorage.setItem('highscore', JSON.stringify(highscore));
        
    }
    

}

window.onload = function(){
    setListaQST();
}
 

















