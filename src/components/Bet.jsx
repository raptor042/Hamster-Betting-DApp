"use client"

import Image from "next/image";

import teddy from "../../public/Teddy.png"
import charlie from "../../public/Charlie.png"
import rocky from "../../public/Rocky.png"
import oliver from "../../public/Oliver.png"
import { FaCircle } from "react-icons/fa6";
import _hamster from "../../public/hamster.svg"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidV4 } from "uuid"

export default function Bet() {
    const [bettingCA, setBettingCA] = useState()
    const [status, setStatus] = useState(1)
    const [amount, setAmount] = useState(0)
    const [hamster, setHamster] = useState(false)

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    useEffect(() => {
        const getStatus = async () => {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            const status = await betting.status()
            console.log(Number(status))

            setBettingCA(betting)
            setStatus(Number(status))
        }

        if(isConnected) {
            getStatus()
        }
    }, [])

    const handleClick = async (bet) => {
        console.log(bet, isConnected, status)
        if(isConnected) {
            if(status == 0) {
                if(bet == 4) {
                    toast.error("Oliver is not available at the moment.")
                } else {
                    if(amount >= 0.005 && amount <= 100) {
                        const id = uuidV4()
                        console.log(id)

                        setHamster(true)
                        
                        await bettingCA.place_bet(id, bet, { value: ethers.parseEther(amount) })

                        bettingCA.on("Bet_Placed", (user, amount, bet, e) => {
                            console.log(user, amount, bet)
                            if(user == address) {
                                toast.success("Bet placed successfully.")
                                setHamster(false)
                            }
                        })
                    } else if(amount < 0.005) {
                        toast.error("Minimum betting amount is 0.005 ETH.")
                    } else if(amount > 100) {
                        toast.error("Maximum betting amount is 100 ETH.")
                    }
                }
            } else {
                toast.error("Betting is not active at the moment.")
            }
        } else {
            toast.error("Wallet not connected.")
        }
    }

    return (
        <div id="bet" className="bg-[#1A2C38] p-4">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-4 sm:px-16 py-4">
                <div className="flex flex-row px-2 sm:px-16">
                    <div className="basis-2/3">
                        <h1 className="p-2 sm:p-8 text-center text-white font-black text-sm sm:text-5xl">LIVE BETTING :</h1>
                    </div>
                    <div className="basis-1/3">
                        <div className="flex flex-row justify-center">
                            <div className="hidden basis-1/4 sm:flex items-center justify-center">
                                <div className="">
                                    <FaCircle size={48} color={status == 0 ? "#45E4AE" : "#DE8508"} className=""/>
                                </div>
                            </div>
                            <div className="sm:basis-3/4">
                                <h1 className="p-2 sm:p-8 text-center text-white font-black text-sm sm:text-5xl">{status == 0 ? "ACTIVE" : "INACTIVE"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-rows-4 sm:grid-cols-4 gap-4">
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2 mb-2">
                                <h2 className="font-black text-white text-3xl">Rocky</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2 mt-2">
                                <Image
                                    src={rocky}
                                    width={150}
                                    alt="Rocky"
                                />
                            </div>
                            <div className="mb-2 mt-2 flex justify-center">
                                <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005ETH - 100ETH" />
                            </div>
                            <div className="flex justify-center mt-4">
                                {!hamster && <button onClick={() => handleClick(1)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
                                {hamster &&
                                    <div className="animate-spin">
                                        <Image
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
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2 mb-2">
                                <h2 className="font-black text-white text-3xl">Charlie</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2 mt-2">
                                <Image
                                    src={charlie}
                                    width={150}
                                    alt="Charlie"
                                />
                            </div>
                            <div className="mb-2 mt-2 flex justify-center">
                                <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005ETH - 100ETH" />
                            </div>
                            <div className="flex justify-center mt-4">
                                {!hamster && <button onClick={() => handleClick(2)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
                                {hamster &&
                                    <div className="animate-spin">
                                        <Image
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
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2 mb-2">
                                <h2 className="font-black text-white text-3xl">Teddy</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2 mt-2">
                                <Image
                                    src={teddy}
                                    width={150}
                                    alt="Teddy"
                                />
                            </div>
                            <div className="mb-2 mt-2 flex justify-center">
                                <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005ETH - 100ETH" />
                            </div>
                            <div className="flex justify-center mt-4">
                                {!hamster && <button onClick={() => handleClick(3)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
                                {hamster &&
                                    <div className="animate-spin">
                                        <Image
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
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2 mb-2">
                                <h2 className="font-black text-white text-3xl">Oliver</h2>
                            </div>
                            <div className="p-2 mb-2 flex justify-center mt-2">
                                <Image
                                    src={oliver}
                                    width={150}
                                    alt="Oliver"
                                />
                            </div>
                            <div className="mb-2 mt-2 flex justify-center">
                                <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005ETH - 100ETH" />
                            </div>
                            <div className="flex justify-center mt-4">
                                {!hamster && <button onClick={() => handleClick(4)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
                                {hamster &&
                                    <div className="animate-spin">
                                        <Image
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
                </div>
            </div>
        </div>
    )
}