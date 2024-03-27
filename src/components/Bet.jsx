"use client"

import Image from "next/image";

import ck from "../../public/ck.jpeg"
import ansem from "../../public/ansem.jpeg"
import trump from "../../public/trump.jpeg"
import { FaCircle } from "react-icons/fa6";

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useContext, useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidV4 } from "uuid"
import Timer from "./Timer";
import Live from "./Live";
import { store } from "@/store";

export default function Bet() {
    const [status, setStatus] = useState(1)
    const [amount3, setAmount3] = useState()
    const [amount1, setAmount1] = useState()
    const [amount2, setAmount2] = useState()
    const [loading, setLoading] = useState(false)

    const [hamsterA, setHamsterA] = useState("--")
    const [hamsterB, setHamsterB] = useState("--")
    const [hamsterC, setHamsterC] = useState("--")
    // const [hamsterD, setHamsterD] = useState("--")

    const { state, dispatch } = useContext(store)
    const { active } = state

    const activate = () => {
        dispatch({
            type : "Activate",
            payload : {
              active : true
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
        const getStatus = async () => {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            const status = await betting.status()
            console.log(Number(status))
            setStatus(Number(status))

            if(Number(status) == 0) {
                activate()
            }

            const hamsterA = await betting.hamsterAPool()
            console.log(hamsterA[0])
            setHamsterA(hamsterA[0])

            const hamsterB = await betting.hamsterBPool()
            console.log(hamsterB[0])
            setHamsterB(hamsterB[0])

            const hamsterC = await betting.hamsterCPool()
            console.log(hamsterC[0])
            setHamsterC(hamsterC[0])

            // const hamsterD = await betting.hamsterDPool()
            // console.log(hamsterD[0])
            // setHamsterD(hamsterD[0])
        }

        if(isConnected) {
            getStatus()
        }
    }, [isConnected, provider])

    const handleClick = async (bet) => {
        const signer = await provider.getSigner()

        const betting = new ethers.Contract(
            BETTING_CA,
            BETTING_ABI,
            signer
        )

        if(isConnected) {
            if(status == 0) {
                if(bet == 1) {
                    if(amount1 >= 0.005 && amount1 <= 100) {
                        const id = uuidV4()
                        console.log(id)

                        setLoading(true)
                        
                        try {
                            await betting.place_bet(id, bet, { value: ethers.parseEther(`${amount1}`) })

                            setLoading(false)
                        } catch (error) {
                            console.log(error)
                            toast.error("Betting round is over.")
                            setLoading(false)
                        }

                        betting.on("Bet_Placed", (user, amount, bet, e) => {
                            console.log(user, amount, bet)
                            if(user == address) {
                                toast.success("Bet placed successfully.")
                                setLoading(false)
                            }
                        })
                    } else if(amount1 < 0.005) {
                        toast.error("Minimum betting amount is 0.005 ETH.")
                    } else if(amount1 > 100) {
                        toast.error("Maximum betting amount is 100 ETH.")
                    }
                } else if(bet == 2) {
                    if(amount2 >= 0.005 && amount2 <= 100) {
                        const id = uuidV4()
                        console.log(id)

                        setLoading(true)
                        
                        try {
                            await betting.place_bet(id, bet, { value: ethers.parseEther(`${amount2}`) })

                            setLoading(false)
                        } catch (error) {
                            console.log(error)
                            toast.error("Betting round is over.")
                            setLoading(false)
                        }

                        betting.on("Bet_Placed", (user, amount, bet, e) => {
                            console.log(user, amount, bet)
                            if(user == address) {
                                toast.success("Bet placed successfully.")
                                setLoading(false)
                            }
                        })
                    } else if(amount2 < 0.005) {
                        toast.error("Minimum betting amount is 0.005 ETH.")
                    } else if(amount2 > 100) {
                        toast.error("Maximum betting amount is 100 ETH.")
                    }
                } else if(bet == 3) {
                    if(amount3 >= 0.005 && amount3 <= 100) {
                        const id = uuidV4()
                        console.log(id)

                        setLoading(true)
                        
                        try {
                            await betting.place_bet(id, bet, { value: ethers.parseEther(`${amount3}`) })

                            setLoading(false)
                        } catch (error) {
                            console.log(error)
                            toast.error("Betting round is over.")
                            setLoading(false)
                        }

                        betting.on("Bet_Placed", (user, amount, bet, e) => {
                            console.log(user, amount, bet)
                            if(user == address) {
                                toast.success("Bet placed successfully.")
                                setLoading(false)
                            }
                        })
                    } else if(amount3 < 0.005) {
                        toast.error("Minimum betting amount is 0.005 ETH.")
                    } else if(amount3 > 100) {
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
        <div id="bet" className="bg-[#0052FE] p-4">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-white px-4 sm:px-16 py-4">
                <div className="flex flex-row px-2 sm:px-16">
                    <div className="basis-2/3">
                        <h1 className="p-2 sm:p-8 text-center text-white font-black text-xs sm:text-3xl">LIVE BETTING :</h1>
                    </div>
                    <div className="basis-1/3">
                        <div className="flex flex-row justify-center">
                            <div className="hidden basis-1/4 sm:flex items-center justify-center">
                                <div className="">
                                    <FaCircle size={36} color={status == 0 ? "#45E4AE" : "#DE8508"} className=""/>
                                </div>
                            </div>
                            <div className="sm:basis-3/4">
                                <h1 className="p-2 sm:p-8 text-center text-white font-black text-xs sm:text-3xl">{status == 0 ? "ACTIVE" : "INACTIVE"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {status == 0 &&
                    <div className="flex justify-center mb-8">
                        <Timer/>
                    </div>
                }
                {status == 1 &&
                    <div className="p-2 sm:p-8 h-screen sm:h-full">
                        <Live/>
                    </div>
                }
                {status == 0 &&
                    <div className="hidden sm:grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#1A2C38] p-2 sm:p-8">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">CK</h2>
                                </div>
                                <div className="p-2 flex justify-center mb-2 mt-2">
                                    <Image
                                        src={ck}
                                        width={250}
                                        alt="Hamster A"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input value={amount1} onChange={(e) => setAmount1(e.target.value)} className="w-full font-normal text-white text-xs px-2 py-4 rounded-lg bg-[#0F212E] border border-white" type="number" min={0.005} max={100} step={0.005} placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <button onClick={() => setAmount1(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-2 m-2">MIN</button>
                                    <button onClick={() => setAmount1(100)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-2 m-2">MAX</button>
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(1)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">ANSEM</h2>
                                </div>
                                <div className="p-2 flex justify-center mb-2 mt-2">
                                    <Image
                                        src={ansem}
                                        width={250}
                                        alt="Hamster B"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input value={amount2} onChange={(e) => setAmount2(e.target.value)} className="w-full font-normal text-white text-xs px-2 py-4 rounded-lg bg-[#0F212E] border border-white" type="number" min={0.005} max={100} step={0.005} placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <button onClick={() => setAmount2(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-2 m-2">MIN</button>
                                    <button onClick={() => setAmount2(100)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-2 m-2">MAX</button>
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(2)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">TRUMP</h2>
                                </div>
                                <div className="p-2 flex justify-center mb-2 mt-2">
                                    <Image
                                        src={trump}
                                        width={250}
                                        alt="Hamster C"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input value={amount3} onChange={(e) => setAmount3(e.target.value)} className="w-full font-normal text-white text-xs px-2 py-4 rounded-lg bg-[#0F212E] border border-white" type="number" min={0.005} max={100} step={0.005} placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <button onClick={() => setAmount3(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-2 m-2">MIN</button>
                                    <button onClick={() => setAmount3(100)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-2 m-2">MAX</button>
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(3)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        {/* <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">{hamsterD}</h2>
                                </div>
                                <div className="p-2 mb-2 flex justify-center mt-2">
                                    <Image
                                        src={_oliver}
                                        width={150}
                                        alt="Hamster D"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(4)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        </div> */}
                    </div>
                }
                {status == 0 &&
                    <div className="sm:hidden grid grid-rows-3 gap-4 mb-4">
                        <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">CK</h2>
                                </div>
                                <div className="p-2 flex justify-center mb-2 mt-2">
                                    <Image
                                        src={ck}
                                        width={250}
                                        alt="Hamster A"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input value={amount1} onChange={(e) => setAmount1(e.target.value)} className="w-full font-normal text-white text-xs px-2 py-4 rounded-lg bg-[#0F212E] border border-white" type="number"  placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <button onClick={() => setAmount1(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1">MIN</button>
                                    <button onClick={() => setAmount1(100)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1">MAX</button>        
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(1)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">ANSEM</h2>
                                </div>
                                <div className="p-2 flex justify-center mb-2 mt-2">
                                    <Image
                                        src={ansem}
                                        width={250}
                                        alt="Hamster B"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input value={amount2} onChange={(e) => setAmount2(e.target.value)} className="w-full font-normal text-white text-xs px-2 py-4 rounded-lg bg-[#0F212E] border border-white" type="number"  placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <button onClick={() => setAmount2(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1">MIN</button>
                                    <button onClick={() => setAmount2(100)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1">MAX</button>        
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(2)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">TRUMP</h2>
                                </div>
                                <div className="p-2 flex justify-center mb-2 mt-2">
                                    <Image
                                        src={trump}
                                        width={250}
                                        alt="Hamster C"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input value={amount3} onChange={(e) => setAmount3(e.target.value)} className="w-full font-normal text-white text-xs px-2 py-4 rounded-lg bg-[#0F212E] border border-white" type="number"  placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <button onClick={() => setAmount3(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1">MIN</button>
                                    <button onClick={() => setAmount3(100)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1">MAX</button>        
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(3)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        {/* <div className="bg-[#1A2C38] p-4">
                            <div className="">
                                <div className="text-center p-2 mb-2">
                                    <h2 className="font-black text-white text-xl">{hamsterD}</h2>
                                </div>
                                <div className="p-2 mb-2 flex justify-center mt-2">
                                    <Image
                                        src={_oliver}
                                        width={150}
                                        alt="Hamster D"
                                    />
                                </div>
                                <div className="mb-2 mt-2 flex justify-center">
                                    <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005ETH - 100ETH" />
                                </div>
                                <div className="flex justify-center mt-4">
                                    {!loading && <button onClick={() => handleClick(4)} className="rounded-lg animate-pulse hover:animate-none p-4 text-white font-bold text-md bg-[#45E4AE]">Place Bet</button>}
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
                        </div> */}
                    </div>
                }
            </div>
        </div>
    )
}