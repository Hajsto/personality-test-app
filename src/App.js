import React, { useState } from 'react';
import PersonalityTest from './components/PersonalityTest';
import Result from './components/Result';
import questions from './data/questions.js';
import analyzePersonality from './utils/analyzePersonality';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const personalityResult = analyzePersonality(answers);
      setResult(personalityResult);
    }
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="App">
      <h1>Osobnostní Test</h1>
      {result ? (
        <Result result={result} onRestart={restartTest} />
      ) : (
        <PersonalityTest
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          progress={(currentQuestion + 1) / questions.length}
        />
      )}
    </div>
  );
}

export default App;
