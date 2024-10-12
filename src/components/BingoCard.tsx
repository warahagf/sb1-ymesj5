import React from 'react';

interface BingoCardProps {
  items: string[];
  selectedCells: any[];
  onCellClick: (index: number) => void;
  cellColors: {
    [key: string]: string;
  };
  isCompleted: boolean;
}

const BingoCard: React.FC<BingoCardProps> = ({ items, selectedCells, onCellClick, cellColors, isCompleted }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((item, index) => {
        let cellColor = '';
        if (typeof selectedCells[index] === 'boolean') {
          cellColor = selectedCells[index] ? cellColors.selected : cellColors.unselected;
        } else {
          cellColor = cellColors[selectedCells[index]];
        }

        return (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center p-2 text-center text-sm cursor-pointer rounded transition-colors duration-200 ${cellColor} ${isCompleted ? 'cursor-default' : 'hover:bg-gray-200'}`}
            onClick={() => !isCompleted && onCellClick(index)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default BingoCard;