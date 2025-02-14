//Menu
let card_home = document.querySelector('#card_home');
let jogarBTN = document.querySelector('#jogar');
let highscoreBTN = document.querySelector('#highscores');
let sobreBTN = document.querySelector('#sobre');
let regrasBTN = document.querySelector('#regras');

//Jogar
let card_jogar = document.querySelector('#card_jogar');
let princip = document.querySelector('#princip');

//Scores
let card_scores = document.querySelector('#card_scores');
let btn5 = document.querySelector('#btn5');
let scorelist = document.querySelector('#lista');
let highscore = JSON.parse(localStorage.getItem('highscore')) || [];
const tBody = document.getElementById('corpoTabela');

//Regras
let card_regras = document.querySelector('#card_regras');
let home = document.querySelector('#home');

//Sobre
let card_sobre = document.querySelector('#card_sobre');
let btorg = document.querySelector('#btorg');
let menu = document.querySelector('#menu');

//ORG
let card_org = document.querySelector('#card_org');
let voltarsobre = document.querySelector('#voltar-sobre');

//O que acontece ao clicar em jogar no menu prinicpal
jogarBTN.addEventListener("click", ()=>{
    card_home.style.display = "none";
    card_jogar.style.display = "block";
});

princip.addEventListener("click", ()=>{
    card_home.style.display = "flex";
    card_jogar.style.display = "none"; 
})

//O que acontece ao clicar em regras no menu prinicpal
regrasBTN.addEventListener("click", ()=>{
    card_home.style.display = "none";
    card_regras.style.display = "block";
});

home.addEventListener("click", ()=>{
    card_home.style.display = "flex";
    card_regras.style.display = "none";
});

//O que acontece ao clicar em sobre no menu prinicpal
sobreBTN.addEventListener("click", ()=>{
    card_home.style.display = "none";
    card_sobre.style.display = "block";
});

menu.addEventListener("click", ()=>{
    card_home.style.display = "flex";
    card_sobre.style.display = "none";
});


btorg.addEventListener("click", ()=>{
    card_sobre.style.display = "none";
    card_org.style.display = "block";
});

voltarsobre.addEventListener("click", ()=>{
    card_sobre.style.display = "block";
    card_org.style.display = "none";
});

//Ao clicar em highscores
highscoreBTN.addEventListener("click", ()=>{
    card_home.style.display = "none";
    card_scores.style.display = "block";
});

btn5.addEventListener("click", ()=>{
    card_home.style.display = "flex";
    card_scores.style.display = "none";
});

function buscarConteudo() {
    const arr = JSON.parse(localStorage.getItem('highscore'));
  
    if (arr != null) {
      let tr = '';
      arr.map(score => {           
        tr += `
              <tr>
                      <td>${score.name}</td>
                      <td>${score.pontos * 10}</td>
                      <td>${score.title}</td>
                  </tr>`  
      })
      tBody.innerHTML = tr;
    }
  }
