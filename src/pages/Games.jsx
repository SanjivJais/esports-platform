import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export const Games = () => {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(90)
    setTimeout(() => {
      setProgress(100)
    }, 1000)
  }, [])
  return (
    <>
      <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />


    </>
  )
}
