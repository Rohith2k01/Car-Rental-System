import React from 'react'
import CommonNavBar from './CommonNavBar'
import './CommonHome.css'

function CommonHome() {
  return (
    <div>

      <CommonNavBar />

      <div className="all-cars-container">
        <div className="banner-container">
          <img src="/images/Car-Rental Banner.jpeg" alt="Banner" className="banner-image" />
          <div className="banner-text">
            <h1>Drive with Confidence</h1>
            <p>Explore our premium fleet and book your perfect ride today.</p>
          </div>
        </div>
        </div>

      </div>
      )
}

      export default CommonHome