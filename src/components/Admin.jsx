"use client"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import _hamster from "../../public/hamster.svg"

export default function Admin() {
    const [start, setStart] = useState(true)
    const [stop, setStop] = useState(true)
    const [winner, setWinner] = useState(0)
    const [duration, setDuration] = useState(0)
    const [hamster, setHamster] = useState(false)

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    const start_bet = async (e) => {
        e.preventDefault()

        if(isConnected) {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            setHamster(true)

            await betting.start_betting_round(duration)
            
            betting.on("Betting_Round_Started", (duration, e) => {
                toast.success(`Betting round has started and will end in ${duration} minutes.`)
                setHamster(false)
            })
        } else {
            toast.error("Wallet not connected.")
        }
    }

    const stop_bet = async (e) => {
        e.preventDefault()

        const hamsters = ["Nil", "Hamster A", "Hamster B", "Hamster C", "Hamster D"]

        if(isConnected) {
            if(winner > 0) {
                console.log(winner)
                const signer = await provider.getSigner()

                const betting = new ethers.Contract(
                    BETTING_CA,
                    BETTING_ABI,
                    signer
                )

                setHamster(true)

                await betting.stop_betting_round(winner)
                
                betting.on("Betting_Round_Ended", (winner, e) => {
                    console.log(winner)
                    toast.success(`Betting round has ended with ${hamsters[winner]} as the winner.`)
                    setHamster(false)
                })
            } else {
                toast.info("Please select a winner.")
            }
        } else {
            toast.error("Wallet not connected.")
        }
    }

    return (
        <div id="admin" className="bg-[#1A2C38] p-4 h-screen">
            <ToastContainer/>
            <div className="py-6 sm:py-12">
                <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-8 py-4 sm:px-16 sm:py-8">
                    <h1 className="p-4 sm:p-8 text-center text-white font-black text-3xl sm:text-6xl mb-8">ADMIN PAGE</h1>
                    {start && stop && 
                        <div className="flex justify-center items-center mt-8">
                            <div className="m-2">
                                <button onClick={(e) => setStart(false)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#45E4AE] p-4">
                                    Start Betting
                                </button>
                            </div>
                            <div className="m-2">
                                <button onClick={(e) => setStop(false)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                    Stop Betting
                                </button>
                            </div>
                        </div>
                    }
                    {!start && 
                        <div className="flex justify-center">
                            <div>
                                <div className="my-8">
                                    <input onChange={(e) => setDuration(e.target.value)} className="w-full font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="Duration in minutes..." />
                                </div>
                                <div className="my-8">
                                    {!hamster &&
                                        <button onClick={start_bet} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                            Start Betting
                                        </button>
                                    }
                                    {hamster &&
                                        <div>
                                            <Image
                                                className="animate-spin"
                                                src={_hamster}
                                                width={50}
                                                height={50}
                                                alt="Hamster Image"
                                            />
                                        </div>    
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {!stop && 
                        <div className="flex justify-center">
                            <div>
                                <div className="my-8">
                                    <select onChange={(e) => setWinner(e.target.value)} className=" w-full font-normal text-white text-sm p-4 rounded-lg bg-[#0F212E] border border-[#8D969C]">
                                        <option value={0}>---</option>
                                        <option value={1}>Hamster A</option>
                                        <option value={2}>Hamster B</option>
                                        <option value={3}>Hamster C</option>
                                        <option value={4}>Hamster D</option>
                                    </select>
                                </div>
                                <div className="my-8">
                                    {!hamster &&
                                        <button onClick={stop_bet} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                            Stop Betting
                                        </button>
                                    }
                                    {hamster &&
                                        <div>
                                            <Image
                                                className="animate-spin"
                                                src={_hamster}
                                                width={50}
                                                height={50}
                                                alt="Hamster Image"
                                            />
                                        </div>    
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}