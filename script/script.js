const quiz = new Quiz(sorular);
const ui = new UI();

ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    ui.soruGoster(quiz.soruGetir());
    startTimer(10)
    timerLine()
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");
});

ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        ui.soruGoster(quiz.soruGetir());
        clearInterval(counter)
        clearInterval(counterLine)
        startTimer(10) 
        timerLine()       
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btn_next.classList.remove("show");
    } else {
        console.log("quiz bitti");
        clearInterval(counter)
        clearInterval(counterLine)
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

ui.btn_quit.addEventListener("click", function() {
    window.location.reload();
});

ui.btn_replay.addEventListener("click", function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
});


function optionSelected(option) {
    clearInterval(counter)
    clearInterval(counterLine)
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
        let cevap =quiz.soruGetir().dogruCevap
        for( let opt of ui.option_list.children){
            if(opt.querySelector("span b").textContent==cevap){
             opt.classList.add("correct");
             opt.insertAdjacentHTML("beforeend", ui.correctIcon);
            }}
    }

    for(let i=0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.btn_next.classList.add("show");
}

let counter
function startTimer(time){
    counter=setInterval(timer,1000)
    function timer(){
        ui.timer_second.textContent=time
        time--
       if(time<0){
           clearInterval(counter)
           ui.timer_text.textContent="S??re Bitti"
           let cevap =quiz.soruGetir().dogruCevap
           for( let opt of ui.option_list.children){
               if(opt.querySelector("span b").textContent==cevap){
                opt.classList.add("correct");
                opt.insertAdjacentHTML("beforeend", ui.correctIcon);
               }
              opt.classList.add("disabled")
           }
           ui.btn_next.classList.add("show")
       }
    }
}
let counterLine
function timerLine(){
    let lineWidth=0
    counterLine=setInterval(timer,20)
    function timer(){
        lineWidth+=1
        ui.timer_line.style.width=lineWidth+"px"
        if(lineWidth>549)
        {
            clearInterval(counterLine)
        }
    }
}