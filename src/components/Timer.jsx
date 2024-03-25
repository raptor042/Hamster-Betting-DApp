"use client"

import { BETTING_ABI, BETTING_CA } from "@/context/config";
import { store } from "@/store";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";

export default function Timer() {
    const [second, setSecond] = useState("--")
    const [minute, setMinute] = useState("--")
    const [timeOut, setTimeOut] = useState(false)

    const { dispatch } = useContext(store)

    const deactivate = e => {
        e.preventDefault()

        dispatch({
            type : "Deactivate",
            payload : {
              active : false
            }
        })
    }

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getTimestamp()
        }, 1000)
            
        return () => clearInterval(interval)
    }, [second, minute])


    const getTimestamp = async () => {
        const signer = await provider.getSigner()

        const betting = new ethers.Contract(
            BETTING_CA,
            BETTING_ABI,
            signer
        )

        const duration = await betting.duration()
        console.log(Number(duration))

        const timestamp = await betting.timestamp()
        console.log(Number(timestamp))

        const now = Date.now() / 1000
        console.log(now)

        const seconds = Number(now.toFixed(0)) - Number(timestamp)
        console.log(seconds)

        const _second = Number(duration) - seconds
        console.log(_second)

        setMinute(Math.floor((_second % (60 * 60)) / 60))
        setSecond(Math.floor(_second % 60))

        if(_second <= 0) {
            setTimeOut(true)
            deactivate()
        }
    }

    return (
        <div id="timer" className="rounded-lg bg-[#1A2C38] p-4 flex flex-row justify-center items-center">
            {
                timeOut ?
                    <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>00:00</h3>
                    :
                    <>
                        <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>{minute}</h3>
                        <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>:</h3>
                        <h3 className={`text-white text-xl sm:text-4xl font-bold animate-pulse`}>{second}</h3>
                    </>
            }
        </div>
    )
}