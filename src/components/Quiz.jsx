import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz(){
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = 
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  // quiz가 끝나버리고 render하려고 하면 error가 발생
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    })

    setTimeout(() => {
      if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState('correct');
      }else{
        setAnswerState('wrong');
      }
      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

  // handleSelectAnswer가 동작할 때마다 handleSkipAnswer가 새로 정의되는 셈 그리고 QuestionTimer Dependency 바뀌고 timer가 reset
  // handleSelectAnswer function도 component가 re-evaluated될 때마다 새로 정의되면 안된다. 그래서 얘도 callBack처리 
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null)
  }, [handleSelectAnswer]);

  if(quizIsComplete){
    // 퀴즈가 끝난 경우 끝났다는 걸 알려야지
    return <div id="summary">
      <img src={quizComplete} alt="quiz is complete" />
      <h2>Quiz Complete</h2>
    </div>
  }

  // 퀴즈가 끝나지 않았다면 우리의 answer들을 shuffle된 형태로 내보낼거다. 
  // sort는 => 1이면 유지, -1이면 switch를 한다. 그래서 각각 1/2의 확률이 되도록 -0.5를 해줌
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return <div id="quiz">
    <div id="question">
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {shuffledAnswers.map((answer) => {
          const isSelected = userAnswers[userAnswers.length - 1] === answer;
          let cssClasses = '';

          if(answerState === 'answered' && isSelected){
            cssClasses = 'selected';
          }

          if((answerState === 'correct' || answerState === 'wrong') && isSelected){
            cssClasses = answerState;
          }
          
          return (<li key={answer} className="answer">
            <button 
              onClick={()=>handleSelectAnswer(answer)}
              className={cssClasses}>{answer}</button>
          </li>);
        })}
      </ul>
    </div>
  </div>
}