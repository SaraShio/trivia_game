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

const handleButtonClick = (buttonText) => () => {
    difficulty = buttonText;
    // 
}

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick(button.innerText));
})