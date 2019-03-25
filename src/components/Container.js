import React from 'react'

const Container = ({ children, ready }) => {
  return (
    <div className={`container ${ready ? 'ready' : ''}`}>
      {children}
    </div>
  )
}

export default Container