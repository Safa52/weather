import React from 'react'

function errordata(message) {
  return (
    <div className="flex items-center justify-center my-6">
        <p className="text-white drop-shadow-2xl font-extrabold text-lg ">
          {message}
        </p>
      </div>
  )
}

export default errordata