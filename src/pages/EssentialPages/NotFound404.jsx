import React from 'react'
import { Helmet } from 'react-helmet'

export const NotFound404 = () => {
    return (
        <>
            <Helmet>
                <title>Page Not Found - EsportsGravity</title>
            </Helmet>

            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800">404</h1>
                    <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
                    <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
                    <a href="/" className="mt-6 inline-block bg-primary font-semibold text-secondary py-2 px-4 rounded hover:bg-opacity-90">
                        Return to Home Page
                    </a>
                </div>
            </div>
        </>

    )
}
