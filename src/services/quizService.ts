import axios from 'axios';

export const fetchQuizQuestions = async (category: string, difficulty: string) => {
  try{
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`);
    return response.data.results;
  }catch(e){
    console.log(e)
  }
};
