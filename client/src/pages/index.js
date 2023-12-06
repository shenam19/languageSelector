import { useState, useEffect } from "react";

import ImageDisplay from "../components/ImageDisplay";
import LanguageRadioButtons from "../components/LanguageRadioButtons";
import axios from "axios";

const Home = () => {
  const [image, setImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    getImage();
  }, [currentPhotoIndex]);

  const getImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data?index=${currentPhotoIndex}`
      );
      if (response.data.message) {
        setCurrentPhotoIndex(0);
      } else {
        setImage(response.data);
        setSelectedLanguage(response.data.language || "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateLanguage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/update", {
        id: image.id,
        language: selectedLanguage,
        updatedBy: updatedBy,
      });

      if (response.status === 200) {
        await getImage();
        console.log("Language updated successfully");
      } else {
        console.error("Failed to update language");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-sm m-auto mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800  dark:border-gray-700 shadow-slate-400 shadow-2xl">
        {image && (
          <>
            <ImageDisplay
              imageUrl={image.url}
              altText={`Photo ${currentPhotoIndex + 1}`}
            />
            <div className="p-5">
              <LanguageRadioButtons
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                updatedBy={updatedBy}
                onUpdateByChange={setUpdatedBy}
              />
              <div className="flex justify-between">
                <button onClick={updateLanguage} className="btn ">
                  Update Language
                </button>

                <button
                  className="btn"
                  onClick={() =>
                    setCurrentPhotoIndex((prevIndex) => prevIndex + 1)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
