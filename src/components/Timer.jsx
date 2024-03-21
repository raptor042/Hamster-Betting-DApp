"use client"

import { useEffect, useState } from "react";

export default function Timer({ duration }) {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [timeOut, setTimeOut] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            if(seconds < 59) {
                setSeconds(seconds + 1)
            } else {
                setMinutes(minutes + 1)
                setSeconds(0)
            }
        }, 1000)

        if(minutes == duration) {
            setTimeOut(true)
        }
            
        return () => clearInterval(interval)
    }, [seconds, minutes])

    return (
        <div id="timer" className="rounded-lg bg-[#1A2C38] p-4 flex flex-row justify-center items-center">
            {
                timeOut ?
                    <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>00:00</h3>
                    :
                    <>
                        <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>{minutes}</h3>
                        <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>:</h3>
                        <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>{seconds}</h3>
                    </>
            }
        </div>
    )
}