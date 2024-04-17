import React from 'react'

export const Slider = () => {
    const slides = [
        { url: '/images/DummySliderBanner.jpg' },
        { url: 'https://worldfootballsummit.com/wp-content/uploads/2022/08/esports.jpeg' },
        { url: 'https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg' },
    ]

    const sliderStyles = {
        backgroundImage: `url("${slides[0].url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px',
    };

    return (
        <div className='flex flex-col w-full'>
            <div style={sliderStyles} className='h-[240px]'>

            </div>
        </div>
    )
}
