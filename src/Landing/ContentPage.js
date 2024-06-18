import React, { useState, useEffect } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import {
  createDataItemSigner,
  message as AOMessage,
  result,
} from "@permaweb/aoconnect";
import axios from "axios";

export default function ContentPage() {
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const signer = await createDataItemSigner(window.arweaveWallet);

        const msg = await AOMessage({
          process: "sY6Yn2-zHdTtxwGhN0osNcecM3Gz1m_AtZwK-XjKpI0",
          signer,
          tags: [{ name: "Action", value: "Register" }], // Corrected line
        });

        const { Messages } = await result({
          message: msg,
          process: "sY6Yn2-zHdTtxwGhN0osNcecM3Gz1m_AtZwK-XjKpI0",
        });

        console.log(Messages); // Do something with the messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []); // Empty dependency array to run the effect only once

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // State to keep track of selected questions
  const [showNotification, setShowNotification] = useState(false);

  const handleSolutionClick = (question) => {
    setSelectedQuestion(question);
    setSelectedQuestions([...selectedQuestions, question]); // Add question to the array
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

      {/* Display selected questions */}
      {selectedQuestions.length > 0 && (
        <div>
          <h3>Selected Questions:</h3>
          <ul>
            {selectedQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display selected question somewhere in your UI */}
      {selectedQuestion && <p>Selected question: {selectedQuestion}</p>}

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
