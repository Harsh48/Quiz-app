import React from 'react';
import styled from 'styled-components';

const DifficultyContainer = styled.div`
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

interface DifficultySelectionProps {
  setDifficulty: (difficulty: string) => void;
}

const DifficultySelection: React.FC<DifficultySelectionProps> = ({ setDifficulty }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <DifficultyContainer>
      <h3>Select Difficulty:</h3>
      <Select onChange={(e) => setDifficulty(e.target.value)}>
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </Select>
    </DifficultyContainer>
  );
};

export default DifficultySelection;
