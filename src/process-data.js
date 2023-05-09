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
}