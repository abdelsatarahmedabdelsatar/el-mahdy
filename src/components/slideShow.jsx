import React, { useState, useEffect } from 'react';

const SlideShow = ({ images, interval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [images, interval]);

  return (
    <div style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          style={{
            display: index === currentImageIndex ? 'block' : 'none',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};

export default SlideShow;