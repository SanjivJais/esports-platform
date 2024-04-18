import React, { useEffect, useState } from 'react'
import { FaRegDotCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';

export const Slider = () => {
    const slides = [
        {
            imgUrl: '/images/DummySliderBanner.jpg',
            targetLink: '#',
        },
        {
            imgUrl: 'https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg',
            targetLink: '#',

        },
        {
            imgUrl: '/images/DummySliderBanner.jpg',
            targetLink: '#',
        },
        {
            imgUrl: 'https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg',
            targetLink: '#',
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)

    const sliderStyles = {
        backgroundImage: `url("${slides[currentSlide].imgUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px',
        transition: 'background 0.2s',
    };

    const changeSlideWithDot = (slideIndex) => {
        setCurrentSlide(slideIndex)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }, 7000)
        return () => clearInterval(interval);
    }, [])


    return (
        <div className='overflow-x-hidden flex flex-col'>
            <Link to={slides[currentSlide].targetLink}>
                <div style={sliderStyles} className={`md:h-[240px] h-[120px] w-full`}>
                </div>
            </Link>
            <div className="flex gap-[6px] relative self-center md:bottom-8 bottom-6 md:text-base text-sm">
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex}>
                        <div onClick={() => changeSlideWithDot(slideIndex)} className={`hover:cursor-pointer ${slideIndex == currentSlide ? 'text-primary' : 'hover:text-primary'} `}>{slideIndex == currentSlide ? <FaRegDotCircle /> : <GoDotFill />}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
