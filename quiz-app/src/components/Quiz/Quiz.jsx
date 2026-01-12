import React from 'react'
import './Quiz.css'

export const Quiz = () => {
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <h2> which device is required for the Internect connection?</h2>
            <ul>
                <li>Modem</li>
                <li>Router</li>
                <li>LanCable</li>
                <li>Pen Drive</li>
            </ul>
            <button>Next</button>
            <div className="index"> 1 of 5 Questions</div>
        </div>
    )
}
