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
                        <a href="#" class="collapsible">${index + 1}: ${item.question}</a>
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
            collapsibleContent();
        });
    }
});


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
