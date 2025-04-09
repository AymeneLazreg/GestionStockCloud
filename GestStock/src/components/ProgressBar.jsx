"use client"

import { useState, useEffect } from "react"
import "/home/tabet/gestion-stock-frontend/src/App.css"
const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => (oldProgress >= 100 ? 100 : oldProgress + 10))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  )
}

export default ProgressBar

