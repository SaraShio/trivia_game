const baseUrl = 'https://opentdb.com/';

export const getCategories = async function () {
  const url = baseUrl + 'api_category.php';

  const categories = await fetch(url)
    .then(res => res.json());
  return categories;
}

export const getQuestions = async function (category, difficulty) {
  let url = baseUrl + 'api.php?amount=10&type=multiple';
  if (category) {
    url += '&category=' + category;
  }
  if (difficulty) {
    url += '&difficulty=' + difficulty;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    const questions = data.results.map((result) => {
      return {
        question: result.question,
        options: [...result.incorrect_answers, result.correct_answer].sort()
      }
    });
    return questions;
  } catch (error) {
    console.error(error);
  }
}

