import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}){
  
  const shuffledAnswers = useRef();

  // 퀴즈가 끝나지 않았다면 우리의 answer들을 shuffle된 형태로 내보낼거다. 
  // sort는 => 1이면 유지, -1이면 switch를 한다. 그래서 각각 1/2의 확률이 되도록 -0.5를 해줌
  if(!shuffledAnswers.current){
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return <ul id="answers">
  {shuffledAnswers.current.map((answer) => {
    const isSelected = selectedAnswer === answer;
    let cssClasses = '';

    if(answerState === 'answered' && isSelected){
      cssClasses = 'selected';
    }

    if((answerState === 'correct' || answerState === 'wrong') && isSelected){
      cssClasses = answerState;
    }

    return (<li key={answer} className="answer">
      <button 
        onClick={()=>onSelect(answer)}
        className={cssClasses}
        disabled={answerState !== ''}>{answer}</button>
    </li>);
  })}
</ul>;
}