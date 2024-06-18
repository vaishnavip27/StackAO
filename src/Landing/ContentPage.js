import React, { useState, useEffect } from "react";
import { BiUpvote, BiComment } from "react-icons/bi";
import { createDataItemSigner, message, result } from "arweave";

export default function ContentPage() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []); // Fetch questions on component mount

  const fetchQuestions = async () => {
    setLoading(true); // Set loading to true before fetching

    try {
      const signer = createDataItemSigner(window.arweaveWallet);

      const msg = await message({
        process: "byU9XxUliRVDy1lxaZ1zX0GNDa56zV8rU2dm3jd9DiA",
        signer,
        tags: [{ name: "Action", value: "Get-Token-Processes" }],
      });

      const { Messages } = await result({
        message: msg,
        process: "byU9XxUliRVDy1lxaZ1zX0GNDa56zV8rU2dm3jd9DiA",
      });

      setSelectedQuestions(Messages); // Assuming Messages contains your fetched questions
      console.log("Fetched questions:", Messages); // Log fetched questions
      setShowNotification(true); // Example: Show notification for successful fetch
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching (whether success or error)
    }
  };

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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {selectedQuestions.map((question, index) => (
              <Questions
                key={index}
                question={question} // Assuming question is the property in Messages
                initialUpvoteCount={2} // Adjust as per your data structure
                solutionCount={1} // Adjust as per your data structure
                upvoteIcon={
                  <BiUpvote className="upvote-icon" size="25px" color="white" />
                }
                solutionIcon={
                  <BiComment
                    className="solution-icon"
                    size="25px"
                    color="white"
                  />
                }
                onSolutionClick={() => handleSolutionClick(question)}
              />
            ))}
          </>
        )}
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
      {showNotification && (
        <div className="notification">Questions fetched!</div>
      )}
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
