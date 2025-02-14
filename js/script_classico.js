//start
let start = document.querySelector('#start');
let iniciar = document.querySelector('#iniciar');

//Regras
let regras = document.querySelector('#regras');
let sair = document.querySelector('#sair');
let continuar = document.querySelector('#ctn');

//Quiz
let quiz = document.querySelector('#card');

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

//Total de acertos
let correct = 0;

//Respostas do usuário
let UserResp = undefined;

//Resultado
let resultado = document.querySelector('#resultado');

let id;
let username = document.querySelector('#username');
let score = document.querySelector('#score');
let sbmt = document.querySelector('#sbmt');
let salvo = document.querySelector('#salvo');
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


function setListaQST(){
    const totalQST = MCQS.length;
    for(i=0; i<totalQST; i++){
        availableQST.push(MCQS[i]);
    };

    availableQST.slice(0,5)
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

}

//Quando clicar no botão 'Continuar' nas Regras
continuar.addEventListener("click" , ()=>{
    regras.style.display = "none";
    quiz.style.display = "block";
    loadData();

    //Remover os ativos
    alt_qst.forEach( removeActive =>{
        removeActive.classList.remove("active");
    })
    total.innerHTML = `Corretas: ${correct = 0} de 5 questões`;
    /*${MCQS.length}*/
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
        //Desabilitar outras alternativas
         for (i = 0; i <= 3; i++) {
            alt_qst[i].classList.add("disabled");
        }      
        
    });
    
});

//O que acontece quando clicar em proximo
prox.addEventListener("click" , ()=>{
    if(index !== /*MCQS.length 2*/5 -1 ){
        index = index + 1;
        //Remover os ativos
        alt_qst.forEach( removeActive =>{
            removeActive.classList.remove("active");
        })
        //Questão
        loadData();
        //total
        total.style.display = "block";
        total.innerHTML = `Corretas: ${correct} de 5 questões`;
        /*${MCQS.length 3}*/
    }
    else{
        index = 0;

        usuario();
       
    }
    for (i = 0; i <= 3; i++) {
        alt_qst[i].classList.remove("disabled");
    }
})

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
        
        if (correct <= 5){
            id = 'Comunicado(a) :D';
        }

        if (correct <= 4){
            id = 'Ótimo(a) :)';
        }

        if (correct <= 3){
            id = 'Regular :|';
        }

        if (correct <= 2){
            id = 'Ruim :( ';
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

    sbmt.addEventListener("click", ()=>{
        salvo.style.display = "block";
    });   
}

window.onload = function(){
    setListaQST();
}




















