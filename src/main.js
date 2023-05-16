import { getCategories, getQuestions } from './process-data.js'

getCategories().then(data => {
    displayInDropdown(data);
});

var displayInDropdown = function (data) {
    if (Object.keys(data).length > 0) {
        var html = "<option></option>";
        data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
        for (let res of data.trivia_categories) {
            html += `<option value="${res.id}">${res.name}</option>`;
        };
        document.querySelector('#getCategories').innerHTML = html;
    }
}

var difficulty = "Easy";
var buttons = document.querySelectorAll(".level");
var introContainer = document.querySelector('#intro');
var quizContainer = document.querySelector('#quiz');
var resultsContainer = document.querySelector('#results');
var questionsContainer = document.querySelector('#questions');
var correctAnswers = {};

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        difficulty = button.innerHTML;
        buttons.forEach((button) => {
            button.classList.remove('active');
        });
        button.classList.add('active');
        console.log(difficulty);
    });
});

var interval;
var timer = document.createElement('div');
timer.classList.add('timer');
document.body.appendChild(timer);

var startButton = document.querySelector('.start');
startButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    var category = document.querySelector('#getCategories').value;
    if (category === "") {
        alert("Please select a category");
    } else {
        getQuestions(category, difficulty.toLowerCase()).then(data => {
            console.log(data);
            var html = data.map((item, index) => {
                correctAnswers[`question${index}`] = item.correctAnswer;
                return `

                  <div>
                        <a href="#" class="collapsible">${index + 1}: ${item.question}</a>
                        <fieldset class="question">

                       
                        <fieldset class="question" id="question${index}">

                            ${item.options.map((option) => (`
                                <div>
                                    <input type="radio" id="${option}" value="${option}" name="question${index}">
                                    <label for="${option}">${option}</label>
                                </div>
                            `)).join('')}
                        </fieldset>
                    </div>
                `
            }).join('');
            questionsContainer.innerHTML = html;
            introContainer.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            resultsContainer.classList.remove('hidden');

            collapsibleContent();


            const time = 300;
            let currentTime = time;
            interval = setInterval(() => {
                currentTime--;
                if (currentTime < 0) {
                    clearInterval(interval);
                    quizContainer.innerHTML = '<h3>Your time has expired!</h3>';
                    return;
                }
                const minutes = Math.floor(currentTime / 60);
                const seconds = currentTime % 60;
                timer.innerHTML = `<h1>${minutes}:${seconds < 10 ? '0' : ''}${seconds}</h1>`;
            }, 1000);
        });
    }
});

var submitButton = document.querySelector('#submitQuiz');
submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    clearInterval(interval);
    timer.remove();
    window.scrollTo(0, 0);
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;
    let html = '<div><h2>Results</h2>';
    const category = document.querySelector('#getCategories').value;
    const data = await getQuestions(category, difficulty.toLowerCase());
    for (let i = 0; i < answers.length; i++) {
        const question = answers[i].name;
        const selectedAnswer = answers[i].value;
        const correctAnswer = correctAnswers[question];
        const isCorrect = selectedAnswer === correctAnswer;
        html += `
        <div style="display: flex; flex-direction: column">
            <h3>Question ${i + 1}: ${data[i].question}</h3>
            <p>${isCorrect ? 'Correct' : 'Incorrect'}: ${selectedAnswer} ${isCorrect ? '' : `<br />Correct answer: ${correctAnswer}`}</p>
        </div></ul>
    `;
        if (isCorrect) {
            score++;
        }
    }
    html += `<h3>Score: ${score} / ${answers.length}</h3></div>`;
    quizContainer.innerHTML = html;
    postQuizResult(score);
});

async function postQuizResult(score) {
    const name = document.getElementById("name").value;
    const webAppId = "4946a047-34d7-468a-af10-320d75236f06";
    const apiEndpoint = "https://apipool.azurewebsites.net/api/quizzes";
  
    const dateOfQuiz = new Date().toISOString().split("T")[0];
    const timeOfQuiz = new Date().toISOString().split("T")[1].slice(0, 8);
  
    const quizResult = {
      webAppId: webAppId,
      dateOfQuiz: dateOfQuiz,
      timeOfQuiz: timeOfQuiz,
      numberOfQuestionsInQuiz: 10,
      score: score,
      name: name,
    };
  
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-functions-key": webAppId,
      },
      body: JSON.stringify(quizResult),
    })
      .then((response) => {
        console.log("Quiz result posted:", response);
      })
      .catch((error) => {
        console.error("Error posting quiz result:", error);
      });

      var retrybutton = document.querySelector('#retryQuiz');
      retrybutton.addEventListener('click',async (e) => {
        e.preventDefault();

      })

}

function collapsibleContent() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}

