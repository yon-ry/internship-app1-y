import React, { useState, useEffect } from "react";

type Choice = "circle" | "triangle" | "cross";

type CandidateDatesInputProps = {
  candidateDates: string[];
  initialAvailability?: Record<string, Choice>;
  onChange: (availability: Record<string, Choice>) => void;
};

function CandidateDatesInput({
  candidateDates,
  initialAvailability = {},
  onChange,
}: CandidateDatesInputProps) {
  const [availability, setAvailability] =
    useState<Record<string, Choice>>(initialAvailability);

  useEffect(() => {
    onChange(availability);
  }, [availability, onChange]);

  const handleSelect = (date: string, choice: Choice) => {
    setAvailability((prev) => ({
      ...prev,
      [date]: choice,
    }));
  };

  // アイコン（見やすいように ◯△× を表示）
  const renderChoice = (date: string, choice: Choice, label: string) => {
    const isSelected = availability[date] === choice;

    return (
      <button
        type="button"
        onClick={() => handleSelect(date, choice)}
        className={`px-4 py-2 rounded-md border text-xl ${
          isSelected ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {candidateDates.map((date) => (
        <div key={date} className="flex items-center space-x-4">
          <span className="text-lg font-medium w-40">{date}</span>
          <div className="flex space-x-2">
            {renderChoice(date, "circle", "◯")}
            {renderChoice(date, "triangle", "△")}
            {renderChoice(date, "cross", "×")}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateDatesInput;
