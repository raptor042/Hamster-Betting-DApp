"use client"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function Admin() {
    const [active, setActive] = useState(true)
    const [winner, setWinner] = useState(0)
    const [hamster, setHamster] = useState(false)

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    const start = async (e) => {
        e.preventDefault()

        if(isConnected) {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            await betting.start_betting_round()

            setHamster(true)
            
            betting.on("Betting_Round_Started", (e) => {
                toast.success("Betting round has started.")
                setHamster(false)
            })
        } else {
            toast.error("Wallet not connected.")
        }
    }

    const stop = async (e) => {
        e.preventDefault()

        const hamsters = ["Nil", "Rocky", "Charlie", "Teddy", "Oliver"]

        if(isConnected) {
            if(winner > 0) {
                console.log(winner)
                const signer = await provider.getSigner()

                const betting = new ethers.Contract(
                    BETTING_CA,
                    BETTING_ABI,
                    signer
                )

                await betting.stop_betting_round(winner)

                setHamster(true)
                
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
            <div className="py-12">
                <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-16 py-8">
                    <h1 className="p-8 text-center text-white font-black text-6xl mb-8">ADMIN PAGE</h1>
                    {active && 
                        <div className="flex justify-center items-center mt-8">
                            <div className="m-2">
                                {!hamster &&
                                    <button onClick={start} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#45E4AE] p-4">
                                        Start Betting
                                    </button>
                                }
                                {hamster &&
                                    <div className="animate-spin">
                                        <Image
                                            src={hamster}
                                            width={60}
                                            height={60}
                                            alt="Hamster Image"
                                        />
                                    </div>    
                                }
                            </div>
                            <div className="m-2">
                                <button onClick={(e) => setActive(false)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                    Stop Betting
                                </button>
                            </div>
                        </div>
                    }
                    {!active && 
                        <div className="flex justify-center">
                            <div>
                                <div className="my-8">
                                    <select onChange={(e) => setWinner(e.target.value)} className=" w-full font-normal text-white text-sm p-4 rounded-lg bg-[#0F212E] border border-[#8D969C]">
                                        <option value={0}>---</option>
                                        <option value={1}>Rocky</option>
                                        <option value={2}>Charlie</option>
                                        <option value={3}>Teddy</option>
                                        <option value={4}>Oliver</option>
                                    </select>
                                </div>
                                <div className="my-8">
                                    {!hamster &&
                                        <button onClick={stop} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-md bg-[#DE8508] p-4">
                                            Stop Betting
                                        </button>
                                    }
                                    {hamster &&
                                        <div className="animate-spin">
                                            <Image
                                                src={hamster}
                                                width={60}
                                                height={60}
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