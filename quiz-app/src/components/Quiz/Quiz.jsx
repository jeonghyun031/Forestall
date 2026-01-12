import React, { useState, useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

export const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [Question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [showRetry, setShowRetry] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let option_array = [Option1, Option2];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (ans === Question.ans) {
                e.target.classList.add("Correct");
                setLock(true);
                setScore(prev => prev + 1);
                setTimeout(() => {
                    next(true);
                }, 1000);
            }
            else {
                e.target.classList.add("Wrong");
                setLock(true);
                setShowRetry(true);
            }
        }
    }

    const handleRetry = () => {
        setLock(false);
        setShowRetry(false);
        option_array.map((option) => {
            option.current.classList.remove("Wrong");
            return null;
        })
    }

    const next = (bypassLock) => {
        if (lock === true || bypassLock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(prevIndex => prevIndex + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("Correct");
                option.current.classList.remove("Wrong");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? <></> : <>
                <h2> {index + 1}. {Question.question}</h2>
                <ul>
                    <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{Question.option1}</li>
                    <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{Question.option2}</li>
                </ul>
                {showRetry ? <button onClick={handleRetry}>Retry</button> : <></>}
                <div className="index"> {index + 1} of {data.length} Questions</div>
            </>}
            {result ? <>
                <h2>You Scored {score} out of {data.length}</h2>
                <button onClick={reset}>Reset</button>
            </> : <></>}
        </div>
    )
}
