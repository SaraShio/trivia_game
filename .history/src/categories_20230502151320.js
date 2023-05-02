export const getAll = async function () {
    var url = 'https://opentdb.com/api_category.php';
 
    const data = await fetch(url)
       .then(res => res.json());
    return data;
 }

export const getQuestions = async function (category, difficulty) {
   var url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}&type=multiple`;

      if (category) {
         url += '&category=' + category;
      }
      if (difficulty) {
         url += '&difficulty=' + difficulty;
      }
      const data = await fetch(url)
         .then(res => res.json());
      return data;
   };