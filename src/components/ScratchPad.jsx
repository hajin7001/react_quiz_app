import { useState, useEffect, useCallback } from "react";
import QUESTIONS from '../questions.js';

export default function ScratchPad({ timeout, onTimeout}){
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('SETTING TIMEOUT');
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);

    return () => {
      clearTimeout(timer);
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log('SETTING INTERVAL');
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime}/>
}

export default function QuizPractice(){
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =  userAnswers.length;

  // quiz가 끝나버리고 render하려고 하면 error가 발생
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;


  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer){
    selectedAnswer('answered');
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    setTimeout(() => {
      if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }
    }, 1000);
  }, [activeQuestionIndex]);
}