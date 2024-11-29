import React from 'react';

const Poll = ({ poll }) => {
  return (
    <div className="poll border border-gray-300 p-4 rounded-md mb-4">
      <h3 className="font-bold">{poll.question}</h3>
      <ul className="options-list">
        {poll.options.map((option, index) => (
          <li key={index} className="option">{option.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Poll;