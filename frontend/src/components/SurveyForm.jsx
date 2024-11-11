import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const SurveyForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', ''] }]);

  const mutation = useMutation(
    (newSurvey) => axiosInstance.post('/api/v1/surveys/create', newSurvey),
    {
      onSuccess: () => {
        toast.success('Survey created successfully!');
        setTitle('');
        setQuestions([{ question: '', options: ['', ''] }]);
      },
      onError: () => {
        toast.error('Error creating survey');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, questions });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''] }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Survey Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {questions.map((q, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            required
          />
          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              placeholder={`Option ${oIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={() => setQuestions((prev) => {
            const newQuestions = [...prev];
            newQuestions[qIndex].options.push('');
            return newQuestions;
          })}>
            Add Option
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button type="submit">Create Survey</button>
    </form>
  );
};

export default SurveyForm;