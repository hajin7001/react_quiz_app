import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz(){
  
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =  userAnswers.length;

  // quiz가 끝나버리고 render하려고 하면 error가 발생
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;


  function handleSelectAnswer(selectedAnswer){
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null)
  }, [handleSelectAnswer]);

  if(quizIsComplete){
    // 퀴즈가 끝난 경우 끝났다는 걸 알려야지
    return <Summary
      userAnswers={userAnswers}/>
  }


  return <div id="quiz">
    <Question 
      key={activeQuestionIndex}
      index={activeQuestionIndex}
      onSelectAnswer={handleSelectAnswer}
      onSkipAnswer={handleSkipAnswer}/>
  </div>
}