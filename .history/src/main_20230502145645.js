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

var buttons = document.querySelectorAll("button");

const handleButtonClick = (button) => () => {
    difficulty = button.dataset.difficulty;
    // reset all buttons and set the clicked one to active
    buttons.forEach((button) => {
        button.classList.remove('active');
    });

    document.querySelector(`button[data-difficulty="${buttonText}"]`).classList.add('active');
}

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick(button));
})