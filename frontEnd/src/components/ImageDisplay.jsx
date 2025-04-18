import React from 'react';

const ImageDisplay = ({ imageName }) => {
    return (
        <img
            src={`http://localhost:8000/api/images/${imageName}`}
            alt="Displayed Image"
            className="w-full h-auto"
        />
    );
};

export default ImageDisplay;
