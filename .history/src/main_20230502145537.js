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

var difficulty 

var buttons = document.querySelectorAll("button");

const handleButtonClick = (buttonText) => () => {
    if (buttonText === "Easy") {
        difficulty = "easy"
    } else if (buttonText === "Medium") {
        difficulty = "medium"
    } else if (buttonText === "Hard") {
        difficulty = "hard"
    }

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick(button.innerText));
})