import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentPage from "./Landing/ContentPage";
import JoinPage from "./Landing/JoinPage";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<JoinPage />} />
          <Route path="/join" element={<ContentPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
