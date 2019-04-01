import React from 'react'

const MainContent = ({ children, ready }) => {
  return (
    <div className={`main-content ${ready ? 'ready' : ''}`}>
      {children}
    </div>
  )
}

export default MainContent