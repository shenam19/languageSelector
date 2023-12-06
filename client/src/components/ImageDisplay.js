import React from "react";

const ImageDisplay = ({ imageUrl, altText }) => {
  return <img src={imageUrl} className="rounded-t-lg" alt={altText} />;
};

export default ImageDisplay;
