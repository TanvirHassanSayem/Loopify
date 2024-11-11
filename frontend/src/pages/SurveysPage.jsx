import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await axiosInstance.get('/api/v1/surveys');
      setSurveys(response.data);
    };
    fetchSurveys();
  }, []);

  return (
    <div>
      <h1>Surveys</h1>
      <ul>
        {surveys.map((survey) => (
          <li key={survey._id}>{survey.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SurveysPage;