import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({userAnswers}){
  const skippedAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
  
  const skippedAnswersShare = 
  (skippedAnswers.length / userAnswers.length * 100).toFixed(2);
  const correctAnswersShare = 
  (correctAnswers.length / userAnswers.length * 100).toFixed(2);
  const wrongAnswersShare = 
  (100.00 - (skippedAnswersShare + correctAnswersShare)).toFixed(2);

  return <div id="summary">
  <img src={quizComplete} alt="quiz is complete" />
  <h2>Quiz Complete</h2>
  <div id="summary-stats">
    <p>
      <span className='number'>{skippedAnswersShare}%</span>
      <span className='text'>skipped</span>
    </p>
    <p>
      <span className='number'>{correctAnswersShare}%</span>
      <span className='text'>answered correctly</span>
    </p>
    <p>
      <span className='number'>{wrongAnswersShare}%</span>
      <span className='text'>answered incorrectly</span>
    </p>
  </div>
  <ol>
    {userAnswers.map((answer, index) => {
      let cssClass = 'user-answer';
      if(answer === null){
        cssClass += ' skipped';
      } else if(answer === QUESTIONS[index].answers[0]){
        cssClass += ' correct';
      } else {
        cssClass += ' wrong';
      }

      return (
        <li key={index}>
          <h3>{index + 1}</h3>
          <p className='question'>{QUESTIONS[index].text}</p>
          <p className={cssClass}>{answer ?? 'Skipped'}</p>
        </li>)
    })}
    
  </ol>
</div>
}