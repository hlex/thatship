import React from 'react'

import boat2 from '../images/boat2.png'

const NotFound = ({ history }) => {
  const handleClickBoat = () => {
    console.log('handleClickBoat', history)
    history.push('/menu')
  }
  return (
    <div className="notfound-page">
      404 Page Not Found.
      <img onClick={handleClickBoat} src={boat2} alt="" />
    </div>
  )
}

export default NotFound