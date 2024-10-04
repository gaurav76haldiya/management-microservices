import React, { useState, useEffect } from 'react';
import { fetchQuestion, submitResponse } from '../api/chatbotApi';

const Chatbot = ({ onFinish }) => {
  const [question, setQuestion] = useState('');
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');

  // Fetch the question when the component mounts or the step changes
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await fetchQuestion(step);
        setQuestion(response.data.question);
      } catch (error) {
        console.error("No more questions. Moving to the next step.");
        onFinish();
      }
    };
    getQuestion();
  }, [step, onFinish]);

  const handleAnswerSubmit = async () => {
    if (answer) {
      await submitResponse({ question, answer });
      setAnswer('');
      setStep(step + 1); // Move to the next question
    }
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <p>{question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
      />
      <button onClick={handleAnswerSubmit}>Submit</button>
    </div>
  );
};

export default Chatbot;

