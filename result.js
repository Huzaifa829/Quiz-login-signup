const result = JSON.parse(localStorage.getItem('result'));
const loginUser = JSON.parse(localStorage.getItem('loginUser'));
let Card_Container = document.querySelector('.Card-Container')

// checking location user is login or quiz is complelted

if(!loginUser.condition || loginUser == null || !result.condition || result == null){
    window.location= 'index.html'
}

// get persentage

let totalmrks = result.correctanswers / result.totalquestion * 100


// get grade to specific persentage

const GradeCheck = (totalmrks) =>{
    if(totalmrks <= 100 && totalmrks >= 90){
        return `A+ Pass`
    }
    else if(totalmrks < 90 && totalmrks >= 80){
        return `A1 Pass`
    }
    else if(totalmrks < 80 && totalmrks >= 70){
        return `A Pass`
    }
    else if(totalmrks < 70 && totalmrks >= 60){
        return `B Pass but must improve`
    }
    else if(totalmrks < 60 && totalmrks >= 50){
        return `C Pass but must improve more`
    }
    else if(totalmrks < 50 && totalmrks >= 40){
        return `D Pass but must improve more`
    }
    else{
        return `<p style="color: red;font-weight: 600; font-size: 25px;">FAIL<p/>`
    }
    
}


// rendering data on screen 

Card_Container.innerHTML =`
 <div class="Main-Card">
 <h3>${loginUser.name}</h3>
 <h3>Your Result</h3>
 <span class="dot"><h1>${totalmrks}%</h1>
     <h5 class="Tot-Num">of 100%</h5></span>
  
     <h2 id="grade">${GradeCheck(totalmrks)}</h2>
    </div>
    
    <div class="Result-DES">
    <div class="Summary">
      <h3 class="Sum-Top">Summary</h3>
      <div class="Memory">
        <p class="Memo">Total Question</p>
        <p class="Memo-Score">${result.totalquestion}</span></p>
      </div>
      <div class="Reaction">
        <p class="Reac">Worng Answer</p>
        <p class="Reac-Score">${result.wronganswers} <span class="Outof"> / ${result.totalquestion} </span></p>
      </div>
    
      <div class="Verbal">
        <p class="Verb">Correct Answer</p>
        <p class="Verb-Score">${result.correctanswers} <span class="Outof"> / ${result.totalquestion} </span></p>
      </div>
      
    </div>
 
    <div class="Continue-BTN">
       <p onclick="Progress()" class="Continue">Continue</p>
    </div>
    </div>
`

// logout play again function 

function Progress(){
    Swal.fire({
        title: "Do you want Logout or Play Again?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Play Again",
        denyButtonText: `Logout`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
         window.location = 'quiz.html'
        localStorage.setItem('result', JSON.stringify({
           condition:false
        }))
         } else if (result.isDenied) {
             window.location = 'index.html'
                localStorage.setItem('loginUser', JSON.stringify({
                   condition:false
                }))
                localStorage.setItem('result', JSON.stringify({
                    condition:false
                 }))
        }
      });
}

