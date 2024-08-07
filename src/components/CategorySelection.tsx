import React from 'react';
import './CategorySelection.css'

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
    <div>
      <h3>Select Category:</h3>
      <select onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelection;
