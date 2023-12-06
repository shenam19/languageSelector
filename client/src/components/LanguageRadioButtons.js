import React from "react";

const LanguageRadioButtons = ({
  selectedLanguage,
  onLanguageChange,
  updatedBy,
  onUpdateByChange,
}) => {
  return (
    <>
      <div className="flex justify-between mb-3">
        <label>
          <input
            type="radio"
            id="UChen"
            checked={selectedLanguage === "Ü-Chen"}
            onChange={() => onLanguageChange("Ü-Chen")}
            className="mr-2"
          />
          Ü-Chen
        </label>

        <label>
          <input
            type="radio"
            id="UMey"
            checked={selectedLanguage === "Ü-Mey"}
            onChange={() => onLanguageChange("Ü-Mey")}
            className="mr-2"
          />
          Ü-Mey
        </label>

        <label>
          <input
            type="radio"
            id="othersRadio"
            checked={selectedLanguage === "Others"}
            onChange={() => onLanguageChange("Others")}
            className="mr-2"
          />
          Others
        </label>
      </div>

      <label className="block  text-md font-medium text-gray-900 dark:text-white">
        Updated By:
        <input
          type="text"
          value={updatedBy}
          onChange={(e) => onUpdateByChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3 mt-4"
        />
      </label>
    </>
  );
};

export default LanguageRadioButtons;
