import React, { useState, useEffect } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';

export const Slider = ({ slides, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, interval);

        return () => clearInterval(slideInterval);
    }, [slides.length, interval]);

    const changeSlideWithDot = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return (
        <div className="relative w-full overflow-hidden rounded-[5px]">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative flex-shrink-0 w-full md:h-64 h-20">
                        <a href={slide.targetLink} target='_blank'>
                            <img src={slide.imgUrl} alt={`Slide ${index}`} className="w-full h-full object-cover object-center" />
                        </a>
                        {/* Dot Indicators */}
                        <div className="absolute md:bottom-4 bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {slides.map((_, dotIndex) => (
                                <div
                                    key={dotIndex}
                                    onClick={() => changeSlideWithDot(dotIndex)}
                                    className={`hover:cursor-pointer ${dotIndex === currentIndex ? 'text-primary' : 'hover:text-primary text-gray-300'
                                        }`}
                                >
                                    {dotIndex === currentIndex ? <FaRegDotCircle /> : <GoDotFill />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


