// App.js
import React, { useState } from 'react';
import PersonalityTest from './components/PersonalityTest';
import Result from './components/Result';
import questions from './data/questions';
import analyzePersonality from './utils/analyzePersonality';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Osobnostní test</h1>
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
};

export default App;

// components/PersonalityTest.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const PersonalityTest = ({ question, onAnswer, progress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={onAnswer}>
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityTest;

// components/Result.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Result = ({ result, onRestart }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Výsledek testu</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{result}</p>
        <Button onClick={onRestart}>Začít znovu</Button>
      </CardContent>
    </Card>
  );
};

export default Result;

// data/questions.js
const questions = [
  {
    id: 1,
    text: "Jak trávíte volný čas?",
    options: [
      { value: "a", label: "Čtením knih" },
      { value: "b", label: "Sledováním filmů" },
      { value: "c", label: "Sportováním" },
      { value: "d", label: "Setkáváním s přáteli" }
    ]
  },
  {
    id: 2,
    text: "Jak reagujete na stres?",
    options: [
      { value: "a", label: "Meditací" },
      { value: "b", label: "Cvičením" },
      { value: "c", label: "Mluvením s přáteli" },
      { value: "d", label: "Prací na projektech" }
    ]
  },
  // Další otázky...
];

export default questions;

// utils/analyzePersonality.js
const analyzePersonality = (answers) => {
  // Zde by byla komplexní logika pro analýzu odpovědí
  // Pro demonstraci použijeme zjednodušenou verzi
  const personalityTypes = {
    a: "Introvertní myslitel",
    b: "Kreativní duše",
    c: "Aktivní extrovert",
    d: "Společenský komunikátor"
  };

  const mostCommonAnswer = Object.values(answers).reduce(
    (a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
  );

  return personalityTypes[mostCommonAnswer] || "Vyvážená osobnost";
};

export default analyzePersonality;
