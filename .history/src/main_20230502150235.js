import { getAll } from './categories.js'

getAll().then(data => {
    displayInDropdown(data);
});

var displayInDropdown = function (data) {
    if (Object.keys(data).length > 0) {
        var html = "<option></option>";
        for (let res of data.trivia_categories) {
            html += `<option>${res.name}</option>`;
        };
        document.querySelector('#getCategories').innerHTML = html;
    }
}

var difficulty = "Easy";
var buttons = document.querySelectorAll(".level");

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
        window.location.href = `game.html?category=${category}&difficulty=${difficulty}`;
    }
});