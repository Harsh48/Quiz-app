import React from 'react';
import './DifficultySelection.css'

interface DifficultySelectionProps {
  setDifficulty: (difficulty: string) => void;
}

const DifficultySelection: React.FC<DifficultySelectionProps> = ({ setDifficulty }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div>
      <h3>Select Difficulty:</h3>
      <select onChange={(e) => setDifficulty(e.target.value)}>
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultySelection;
