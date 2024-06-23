import React, { useEffect, useState } from 'react';
import './textCarousel.scss';

const TextCarousel = () => {
    const texts = ["React Developer", "CSS Animator", "JavaScript Expert", "Team Player"];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div className="text-carousel">
            <span className="text">{texts[currentTextIndex]}</span>
        </div>
    );
}

export default TextCarousel;
