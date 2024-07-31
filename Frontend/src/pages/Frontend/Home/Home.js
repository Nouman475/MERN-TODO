import React from 'react'
import "./../../../scss/_home.scss";
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <main>
      <div className="hero">
        <div className="hero__bg">
          <picture>
            <img
              src="https://wallpapers.com/images/featured/office-desk-a1yivbaxal92jim2.jpg"
              alt=""
            />
          </picture>
        </div>

        <div className="hero__cnt">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 213">
            &gt;
            <path d="M201.76,17.01C174.45,6.79,145.3,1.07,115.13,0c-1.35-.04-2.66,.46-3.63,1.39-.97,.94-1.52,2.23-1.52,3.58V73.57c0,2.75,2.23,4.98,4.98,4.98h78.8c2.3,0,4.3-1.57,4.84-3.8,4.25-17.46,6.4-35.31,6.4-53.07,0-2.08-1.29-3.94-3.24-4.67Z" />
            <path d="M93.51,1.4c-.97-.94-2.29-1.44-3.63-1.39C59.7,1.07,30.55,6.79,3.24,17.01c-1.95,.73-3.24,2.59-3.24,4.67,0,17.77,2.16,35.63,6.42,53.08,.54,2.23,2.54,3.8,4.84,3.8H90.06c2.75,0,4.98-2.23,4.98-4.98V4.98c0-1.35-.55-2.65-1.52-3.58Z" />
            <path d="M90.06,93.5H17.1c-1.61,0-3.12,.78-4.05,2.09-.93,1.31-1.18,2.99-.66,4.51,11.56,33.67,30.73,64.99,56.97,93.07l17.06,18.25c.96,1.03,2.29,1.58,3.64,1.58,.61,0,1.23-.11,1.83-.35,1.9-.75,3.15-2.59,3.15-4.63V98.48c0-2.75-2.23-4.98-4.98-4.98Z" />
            <path d="M191.95,95.58c-.93-1.31-2.44-2.09-4.05-2.09H114.96c-2.75,0-4.98,2.23-4.98,4.98v109.53c0,2.05,1.25,3.88,3.15,4.63,.59,.23,1.21,.35,1.83,.35,1.35,0,2.68-.55,3.64-1.58l17.05-18.25c26.23-28.08,45.4-59.39,56.96-93.07,.52-1.52,.28-3.2-.66-4.51Z" />
          </svg>
          <h1>The Daily Todos</h1>
          <p className="fs-3 my-3 text-center">Get your daily tasks done</p>
          <Link to='/auth/register' className='btn btn-primary btn-large text-center'>Get Started</Link>
        </div>
      </div>
      <div id="footer" className='bg-primary'>
        <p className='text-white m-0 text-center py-3'>&copy; {new Date().getFullYear()} Made by <a className='text-white' href="https://muhammadnoumankhalid.netlify.app" target="_blank">Muhammad Nouman Khalid</a> </p>
      </div>
    </main>
  )
}

export default HomePage
