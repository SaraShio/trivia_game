export const getAll = async function () {
    var url = 'https://opentdb.com/api_category.php';
 
    const data = await fetch(url)
       .then(res => res.json());
    return data;
 }

export const getQuestions = async function (category, difficulty) {