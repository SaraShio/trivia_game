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
var quizContainer = document.querySelector('#quiz')
var questionsContainer = document.querySelector('#questions');

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

var startButton = document.querySelector('.start');
startButton.addEventListener('click', (e) => {
    e.preventDefault();
    var category = document.querySelector('#getCategories').value;
    if (category === "") {
        alert("Please select a category");
    } else {
        getQuestions(category, difficulty.toLowerCase()).then(data => {
            console.log(data);
            var html = data.map((item, index) => {
                return `
                    <div>
                        <h3>${index + 1}: ${item.question}</h3>
                        <fieldset class="question">
                            ${item.options.map((option) => (`
                                <div>
                                    <input type="radio" id="${option}" value="${option}" name="${item.question}">
                                    <label for="${option}">${option}</label>
                                </div>
                            `)).join('')}
                        </fieldset>
                    </div>
                `
            });
            questionsContainer.innerHTML = html;
            introContainer.classList.add('hidden');
            quizContainer.classList.remove('hidden');
        });
    }
});
