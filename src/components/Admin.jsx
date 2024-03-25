"use client"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
    const [start, setStart] = useState(true)
    const [pick, setPick] = useState(true)
    const [winner, setWinner] = useState(0)
    const [duration, setDuration] = useState()
    const [loading, setLoading] = useState(false)

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

            setLoading(true)

            try {
                await betting.start_betting_round(duration * 60)

                setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error("An error occured while processing this request.")
                setLoading(false)
            }
            
            betting.on("Betting_Round_Started", (duration, e) => {
                toast.success(`Betting round has started and will end in ${Number(duration) / 60} minutes.`)
                setLoading(false)
            })
        } else {
            toast.error("Wallet not connected.")
        }
    }

    const stop_bet = async (e) => {
        e.preventDefault()

        if(isConnected) {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            setLoading(true)

            try {
                await betting.stop_betting_round()

                setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error("Betting duration not yet exceeded.")
                setLoading(false)
            }
            
            betting.on("Betting_Round_Ended", (duration, e) => {
                toast.success(`Betting round has ended.`)
                setLoading(false)
            })
        } else {
            toast.error("Wallet not connected.")
        }
    }

    const pick_winner = async (e) => {
        e.preventDefault()

        const hamsters = ["Nil", "CK", "ANSEM", "TRUMP"]

        if(isConnected) {
            if(winner > 0) {
                console.log(winner)
                const signer = await provider.getSigner()

                const betting = new ethers.Contract(
                    BETTING_CA,
                    BETTING_ABI,
                    signer
                )

                setLoading(true)

                try {
                    await betting.pick_winner(winner)

                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    toast.error("An error occured while processing this request.")
                    setLoading(false)
                }
                
                betting.on("Winner", (winner, e) => {
                    console.log(winner)
                    toast.success(`The winner of this betting round is ${hamsters[winner]}.`)
                    setLoading(false)
                })
            } else {
                toast.info("Please select a winner.")
            }
        } else {
            toast.error("Wallet not connected.")
        }
    }

    return (
        <div id="admin" className="bg-[#0052FE] p-4 h-screen">
            <ToastContainer/>
            <div className="py-6 sm:py-12">
                <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-8 py-4 sm:px-16 sm:py-8">
                    <h1 className="p-4 sm:p-8 text-center text-white font-black text-3xl sm:text-6xl mb-8">ADMIN PAGE</h1>
                    {start && pick &&
                        <div className="flex justify-center items-center mt-8">
                            <div className="m-2">
                                <button onClick={(e) => setStart(false)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#45E4AE] p-4">
                                    Start Betting
                                </button>
                            </div>
                            {!loading &&
                                <div className="m-2">
                                    <button onClick={stop_bet} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                        Stop Betting
                                    </button>
                                </div>
                            }
                            {loading &&
                                <div className="flex justify-center m-2"> 
                                    <div role="status">
                                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>    
                            }
                            <div className="m-2">
                                <button onClick={(e) => setPick(false)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#0052FE] p-4">
                                    Pick Winner
                                </button>
                            </div>
                        </div>
                    }
                    {!start && 
                        <div className="flex justify-center">
                            <div>
                                <div className="my-8">
                                    <input value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="Duration in minutes..." />
                                </div>
                                <div className="my-8">
                                    {!loading &&
                                        <div className="flex justify-center">
                                            <button onClick={start_bet} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                                Start Betting
                                            </button>
                                        </div>
                                    }
                                    {loading &&
                                        <div className="flex justify-center">
                                            <div role="status">
                                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>    
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {!pick && 
                        <div className="flex justify-center">
                            <div>
                                <div className="my-8">
                                    <select onChange={(e) => setWinner(e.target.value)} className=" w-full font-normal text-white text-sm p-4 rounded-lg bg-[#0F212E] border border-[#8D969C]">
                                        <option value={0}>---</option>
                                        <option value={1}>CK</option>
                                        <option value={2}>ANSEM</option>
                                        <option value={3}>TRUMP</option>
                                        {/* <option value={4}>Hamster D</option> */}
                                    </select>
                                </div>
                                <div className="my-8">
                                    {!loading &&
                                        <div className="flex justify-center">
                                            <button onClick={pick_winner} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                                Winner
                                            </button>
                                        </div>
                                    }
                                    {loading &&
                                        <div className="flex justify-center"> 
                                            <div role="status">
                                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
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