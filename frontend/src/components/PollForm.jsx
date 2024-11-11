import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const PollForm = () => {
  const [question, setQuestion] = useState('');
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
    if (options.filter((opt) => opt.trim() !== '').length < 2) {
      toast.error('Please provide at least two options');
      return;
    }
    mutation.mutate({ question, options: options.map((text) => ({ text })) });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-purple-600">Create a New Poll</h2>

      {/* Poll Question */}
      <input
        type="text"
        placeholder="Enter your poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Poll Options */}
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {options.length > 2 && (
            <button
              type="button"
              onClick={() => handleRemoveOption(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add Option Button */}
      <button
        type="button"
        onClick={() => setOptions([...options, ''])}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        + Add Option
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className={`w-full py-2 rounded-md ${
          mutation.isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        } text-white transition-colors`}
      >
        {mutation.isLoading ? 'Creating...' : 'Create Poll'}
      </button>
    </form>
  );
};

export default PollForm;
