import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const PollForm = () => {
  const [question, setQuestion] = useState ('');
  const [options, setOptions] = useState(['', '']);

  const mutation = useMutation(
    (newPoll) => axiosInstance.post('/api/v1/polls/create', newPoll),
    {
      onSuccess: () => {
        toast.success('Poll created successfully!');
        setQuestion('');
        setOptions(['', '']);
      },
      onError: () => {
        toast.error('Error creating poll');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ question, options: options.map((text) => ({ text })) });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          required
        />
      ))}
      <button type="button" onClick={() => setOptions([...options, ''])}>
        Add Option
      </button>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default PollForm;