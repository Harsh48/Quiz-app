import React from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

interface CategorySelectionProps {
  setCategory: (category: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ setCategory }) => {
  const categories = [
    { id: '9', name: 'General Knowledge' },
    { id: '10', name: 'Entertainment: Books' },
    // Add more categories as needed
  ];

  return (
    <CategoryContainer>
      <h3>Select Category:</h3>
      <Select onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </CategoryContainer>
  );
};

export default CategorySelection;
