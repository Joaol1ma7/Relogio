let botaoss = document.getElementById("startStop");
let botaoreini = document.getElementById("reiniciaVolta");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let milisec = document.getElementById("milisec");
let contador = 0;
let contadorVoltas = 1;
let paginaAtual = "Cron";

function startStop() {
    if (botaoss.className === "start") {
        botaoss.className = "stop";
        botaoreini.className = "volta";
        botaoss.innerHTML = "Stop";
        botaoreini.innerHTML = "Volta";
        tempo = setInterval(() => {
            contador++;
            if (parseInt(milisec.innerHTML) === 100) {
                contador = 0;
                sec.innerHTML++;
                if (parseInt(sec.innerHTML) === 60) {
                    sec.innerHTML = 0;
                    min.innerHTML++;
                }
            }
            milisec.innerHTML = contador;
        }, 10);

    } else {
        botaoss.className = "start";
        botaoreini.className = "reinicia";
        botaoss.innerHTML = "Start";
        botaoreini.innerHTML = "Reiniciar";
        clearInterval(tempo);
    }
}

function excluiVoltas() {
    let i;
    for (i = 1; i < contadorVoltas; i++) {
        document.getElementById(`volta_${i}`).remove();
    }
    contadorVoltas = 1;
}

function reiniciaVolta() {
    if (botaoreini.className === "reinicia") {
        sec.innerHTML = 0;
        min.innerHTML = 0;
        milisec.innerHTML = 0;
        if (contadorVoltas > 1) {
            excluiVoltas();
        }
    } else {
        if (botaoss.className === "stop") {
            let volta = min.innerHTML + ":" + sec.innerHTML + "." + milisec.innerHTML;
            let novaVolta = document.createElement("div");
            novaVolta.className = "voltas";
            novaVolta.id = `volta_${contadorVoltas}`;
            novaVolta.innerHTML = `Volta ${contadorVoltas} ${volta}`
            document.body.appendChild(novaVolta);
            contadorVoltas++;
        }
    }
}
//FUNÇÕES TIMER
let horaT = document.getElementById("horaTimer");
let minT = document.getElementById("minTimer");
let secT = document.getElementById("secTimer");
let botaoInicia = document.getElementById("startStopTimer");
let divCima = document.getElementById("acimaTimer");
let divBaixo = document.getElementById("abaixoTimer");

function addSec() {
    let soma = parseInt(secT.innerHTML);
    if (secT.innerHTML < 59) {
        soma++;
        secT.innerHTML = soma;
    }
}

function abaixaSec() {
    let soma = parseInt(secT.innerHTML);
    if (secT.innerHTML > 0) {
        soma--;
        secT.innerHTML = soma;
    }
}

function addMin() {
    let soma = parseInt(minT.innerHTML);
    if (minT.innerHTML < 59) {
        soma++;
        minT.innerHTML = soma;
    }
}

function abaixaMin() {
    let soma = parseInt(minT.innerHTML);
    if (minT.innerHTML > 0) {
        soma--;
        minT.innerHTML = soma;
    }
}

function addHora() {
    let soma = parseInt(horaT.innerHTML);
    soma++;
    horaT.innerHTML = soma;
}

function abaixaHora() {
    let soma = parseInt(horaT.innerHTML);
    if (horaT.innerHTML > 0) {
        soma--;
        horaT.innerHTML = soma;
    }
}

function iniciaTimer() {
    if (parseInt(minT.innerHTML) !== 0 || parseInt(secT.innerHTML) !== 0 || parseInt(horaT.innerHTML) !== 0 && alarmando !== true) {

        if (botaoInicia.className === "iniciaTimer") {
            botaoInicia.className = "pausaTimer";
            botaoInicia.innerHTML = "Pausa";
            divBaixo.innerHTML = "";
            divCima.innerHTML = "";

            tempo = setInterval(() => {
                let somasec = parseInt(secT.innerHTML);
                somasec--;
                if (somasec >= 0) secT.innerHTML = somasec;
                if (somasec === -1) {

                    let somamin = parseInt(minT.innerHTML);
                    if (somamin !== 0) {
                        somamin--;
                        secT.innerHTML = 59;
                        somasec = 59;
                    }
                    minT.innerHTML = somamin;
                    if (somamin === 0 && somasec === -1) {

                        let somahora = parseInt(horaT.innerHTML);
                        if (somahora !== 0) {
                            somahora--;
                            minT.innerHTML = 59;
                            somamin = 59;
                            secT.innerHTML = 59;
                        }
                        horaT.innerHTML = somahora;
                        if (somahora === 0 && somamin === 0 && somasec === -1) {
                            console.log("ACABOU!");
                            botaoInicia.className = "iniciaTimer";
                            botaoInicia.innerHTML = "Iniciar";
                            divCima.innerHTML = `<span class="mdi mdi-arrow-up-drop-circle" onclick="addHora()"></span>
        <span class="mdi mdi-arrow-up-drop-circle" onclick="addMin()"></span>
        <span class="mdi mdi-arrow-up-drop-circle" onclick="addSec()"></span>`;
                            divBaixo.innerHTML = `<span class="mdi mdi-arrow-down-drop-circle" onclick="abaixaHora()"></span>
        <span class="mdi mdi-arrow-down-drop-circle" onclick="abaixaMin()"></span>
        <span class="mdi mdi-arrow-down-drop-circle" onclick="abaixaSec()"></span>`;
                            clearInterval(tempo);
                            alarmar();
                        }
                    }
                }
            }, 1000);
        } else {
            botaoInicia.className = "iniciaTimer";
            botaoInicia.innerHTML = "Resumir";
            clearInterval(tempo);
        }
    }
}

function cancelaTimer() {
    if (botaoInicia.className === "pausaTimer") {
        botaoInicia.className = "iniciaTimer";
        botaoInicia.innerHTML = "Iniciar";
        divCima.innerHTML = `<span class="mdi mdi-arrow-up-drop-circle" onclick="addHora()"></span>
        <span class="mdi mdi-arrow-up-drop-circle" onclick="addMin()"></span>
        <span class="mdi mdi-arrow-up-drop-circle" onclick="addSec()"></span>`;
        divBaixo.innerHTML = `<span class="mdi mdi-arrow-down-drop-circle" onclick="abaixaHora()"></span>
        <span class="mdi mdi-arrow-down-drop-circle" onclick="abaixaMin()"></span>
        <span class="mdi mdi-arrow-down-drop-circle" onclick="abaixaSec()"></span>`;
        horaT.innerHTML = 0;
        minT.innerHTML = 0;
        secT.innerHTML = 0;
        clearInterval(tempo);
    }
}
let papel = true;

function alarmar() {
    tempo = setInterval(() => {
        if (papel) {
            document.body.style.backgroundColor = "#FF5733";
            papel = false;
        } else if (papel === false) {

            document.body.style.backgroundColor = "#FFFFFF";
            papel = true;
        }

    }, 1000);

}