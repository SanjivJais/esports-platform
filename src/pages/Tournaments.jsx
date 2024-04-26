import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export const Tournaments = () => {
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
      <div>This page contains some important information about tournaments on EsportsGravity and tabs of all games whose tournaments are available.</div>
    </>
  )
}
