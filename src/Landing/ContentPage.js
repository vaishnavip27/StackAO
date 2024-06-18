import React, { useState } from "react";
import { BiUpvote, BiComment } from "react-icons/bi";

export default function ContentPage() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleSolutionClick = (question) => {
    setSelectedQuestions((prevQuestions) => [...prevQuestions, question]);
    setShowNotification(true);

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <div>
      <div className="container">
        <div className="head">Top Questions</div>
        <div className="search-bar"></div>
        <Questions
          question="What is your favourite animal?"
          initialUpvoteCount={2}
          solutionCount={1}
          upvoteIcon={
            <BiUpvote className="upvote-icon" size="25px" color="white" />
          }
          solutionIcon={
            <BiComment className="solution-icon" size="25px" color="white" />
          }
          onSolutionClick={() =>
            handleSolutionClick("What is your favourite animal?")
          }
        />

        <Questions
          question="How do you learn programming?"
          initialUpvoteCount={5}
          solutionCount={3}
          upvoteIcon={
            <BiUpvote className="upvote-icon" size="25px" color="white" />
          }
          solutionIcon={
            <BiComment className="solution-icon" size="25px" color="white" />
          }
          onSolutionClick={() =>
            handleSolutionClick("How do you learn programming?")
          }
        />
      </div>

      {/* Display selected questions somewhere in your UI */}
      <div>
        <h2>Selected Questions:</h2>
        <ul>
          {selectedQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>

      {/* Notification */}
      {showNotification && <div className="notification">Question stored!</div>}
    </div>
  );
}

function Questions(props) {
  const {
    question,
    initialUpvoteCount,
    solutionCount,
    upvoteIcon,
    solutionIcon,
    onSolutionClick,
  } = props;
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);

  const handleUpvoteClick = () => {
    setUpvoteCount(upvoteCount + 1);
  };

  return (
    <div className="ques">
      <div className="q-name">{question}</div>
      <div className="icons">
        <div className="answer">
          <div className="upvote" onClick={handleUpvoteClick}>
            {upvoteIcon}
          </div>
          <div className="upvote-count">{upvoteCount}</div>
        </div>

        <div className="sol">
          <div className="solution" onClick={() => onSolutionClick(question)}>
            {solutionIcon}
          </div>
          <div className="solution-count">{solutionCount}</div>
        </div>
      </div>
    </div>
  );
}
