let questions_array = []
let arrayIndex = 0
let correctAnswers = 0
let wrongAnswers =0


const quiz = document.querySelector('.quiz')
const next_btn = document.querySelector('#next-btn')
const loginUser = JSON.parse(localStorage.getItem('loginUser'));

// check user us login or not

if(!loginUser.condition || loginUser == null){
    window.location= 'index.html'
}


// getData from api 

const getData = async () => {

    try {
        const res = await axios("https://the-trivia-api.com/v2/questions")
        questions_array = res.data
        console.log(questions_array);
        RenderQuestion(arrayIndex)
    } catch (error) {
        // console.log(error);
    }
}
getData()

// rendering question on screen 


const RenderQuestion = (arrayIndex) => {
    let dataRender = questions_array[arrayIndex];
    let answers_array = [...dataRender.incorrectAnswers, dataRender.correctAnswer];
    answers_array = answers_array.sort(() => Math.random() - 0.5);

    // console.log(answers_array);
    quiz.innerHTML = `
        <h2 id="question">Q ${arrayIndex + 1} : ${dataRender.question.text}</h2>
        <div id="answer-buttons">
            ${answers_array.map((item) => `<button  onclick="CheckingAnswer(event,${arrayIndex})" class="btn">${item}</button>`).join('')}
        </div>

    `;
}


// logic check answer 

function CheckingAnswer(e, index) {
    let selectedAwer = e.target.textContent
    let matchAnswer = questions_array[index]
    let Q_L = questions_array.length
    // console.log(matchAnswer);
    if (matchAnswer.correctAnswer == selectedAwer) {
        e.target.style.border = '2px solid green';
        e.target.style.boxShadow = 'inset 0 0 20px green';
        correctAnswers++
       checkingBtn(Q_L,index)
    }
    else {
        e.target.style.border = '2px solid red';
        e.target.style.boxShadow = 'inset 0 0 20px red';
        wrongAnswers++
        checkingBtn(Q_L,index)
    }

    document.querySelectorAll('#answer-buttons .btn').forEach(button => {
        button.disabled = true;
    });
}

// next btn logic call back function 

const checkingBtn = (Q_L,index) => {
if (Q_L - 1 == index) {
   return quiz.innerHTML += `<button onclick="Result()" id="next-btn">Result</button>`
    
} else {
    return quiz.innerHTML += `<button onclick="NextBtn(${index})" id="next-btn">Next</button>`
}
}
function NextBtn(index) {
    index++
    RenderQuestion(index)

}

// next to result page function and save data in local storage

function Result(){
    // console.log('working');
    localStorage.setItem('result', JSON.stringify({
        condition:true,
        correctanswers:correctAnswers,
        wronganswers:wrongAnswers,
        totalquestion:questions_array.length
    }))
    window.location = 'result.html'
}