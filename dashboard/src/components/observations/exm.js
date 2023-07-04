import React, { useState } from "react";

const Exm = () => {
  const [tabs, setTabs] = useState([
    { id: 1, scores: [0, 0, 0, 0, 0] },
    { id: 2, scores: [0, 0, 0, 0, 0] },
    { id: 3, scores: [0, 0, 0, 0, 0] },
    { id: 4, scores: [0, 0, 0, 0, 0] },
  ]);

  const handleScoreChange = (tabId, index, score) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.map((tab) => {
        if (tab.id === tabId) {
          const updatedScores = [...tab.scores];
          updatedScores[index] = score;
          return { ...tab, scores: updatedScores };
        }
        return tab;
      });
      return updatedTabs;
    });
  };

  const calculateFinalScore = () => {
    let totalScore = 0;
    tabs.forEach((tab) => {
      const tabScore = tab.scores.reduce((sum, score) => sum + score, 0);
      totalScore += tabScore;
    });
    return totalScore;
  };

  return (
    <div>
      {tabs.map((tab) => (
        <div key={tab.id}>
          <h2>Tab {tab.id}</h2>
          <ul>
            {tab.scores.map((score, index) => (
              <li key={index}>
                Point {index + 1}:
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={score}
                  onChange={(e) =>
                    handleScoreChange(tab.id, index, parseInt(e.target.value))
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h3>Final Score: {calculateFinalScore()}</h3>
    </div>
  );
};

export default Exm;
