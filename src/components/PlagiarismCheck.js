// src/components/PlagiarismCheck.js
import React, { useState } from 'react';
import axios from 'axios';

const PlagiarismCheck = (props) => {
  const [text, setText] = useState('');
  const [plagiarismPercentage, setPlagiarismPercentage] = useState(null);
  const [plagiarizedDetails, setPlagiarizedDetails] = useState([]);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    const options = {
      method: 'POST',
      url: 'https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com',
        'X-RapidAPI-Key':'7c5491ec6emsh5d0f3cc8c6d8344p18654fjsnd1a6a0ae30bc'
      },
      data: {
        text: text,
        language: 'en',
        includeCitations: false,
        scrapeSources: false
      }
    };

    try 
    {
      const response = await axios.request(options);
      const result = response.data;

      setPlagiarismPercentage(result.percentPlagiarism);
      setPlagiarizedDetails(result.sources);
      setError(null); // Clear any previous error
      
    } 
    catch (error) {
      console.error(error);
      setError('An error occurred while checking plagiarism.');
      setPlagiarismPercentage(null);
      setPlagiarizedDetails([]); // Clear previous result              
    }
  };

  return (
    <div className="mb-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
      <h1>{props.heading}</h1>
      <textarea
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="my-box"
        rows="8"
        style={{
          backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
          color: props.mode === 'dark' ? 'white' : 'black'
        }}
      ></textarea>
      <button disabled={text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleCheck}>
        Check
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {plagiarismPercentage !== null && (
        <div>
          <h3>Result:</h3>
          <p>Percentage of Plagiarized Content: {plagiarismPercentage}%</p>
          <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow={plagiarismPercentage} aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar bg-info text-dark" style={{width: {plagiarismPercentage}+"%"}}>{plagiarismPercentage}%</div>
          </div>
          {plagiarizedDetails.length > 0 && (
            <div>
              <h4>Plagiarized Content:</h4>
              {plagiarizedDetails.map((source, index) => (
                <div key={index}>
                  <h5>
                    Source: <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
                  </h5>
                  {source.matches.map((match, matchIndex) => (
                    <div key={matchIndex}>
                      <p><strong>Matched Text:</strong> {match.matchText}</p>
                      <p><strong>Context:</strong> {match.context.before}...{match.context.after}</p>
                      <p><strong>Score:</strong> {match.score}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlagiarismCheck;
