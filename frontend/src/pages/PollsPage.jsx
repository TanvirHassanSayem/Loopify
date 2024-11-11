import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

const PollsPage = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axiosInstance.get('/api/v1/polls');
      setPolls(response.data);
    };
    fetchPolls();
  }, []);

  return (
    <div>
      <h1>Polls</h1>
      <ul>
        {polls.map((poll) => (
          <li key={poll._id}>{poll.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default PollsPage;