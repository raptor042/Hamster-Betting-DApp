"use client"

import Image from "next/image";

import _teddy from "../../public/Teddy.png"
import _charlie from "../../public/Charlie.png"
import _rocky from "../../public/Rocky.png"
import _oliver from "../../public/Oliver.png"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Hamsters() {
    const pool = {
        name: "--",
        wins: "--",
        losses: "--"
    }
    
    const [hamsterA, setHamsterA] = useState(pool)
    const [hamsterB, setHamsterB] = useState(pool)
    const [hamsterC, setHamsterC] = useState(pool)
    const [hamsterD, sethamsterD] = useState(pool)

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }
    
    useEffect(() => {
        const getPools = async () => {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            const hamsterA = await betting.hamsterAPool()
            console.log(hamsterA)
            const _hamsterA = {
                name: hamsterA[0],
                wins: Number(hamsterA[1]),
                losses: Number(hamsterA[2])
            }
            setHamsterA(_hamsterA)

            const hamsterB = await betting.hamsterBPool()
            console.log(hamsterB[0])
            const _hamsterB = {
                name: hamsterB[0],
                wins: Number(hamsterB[1]),
                losses: Number(hamsterB[2])
            }
            setHamsterB(_hamsterB)

            const hamsterC = await betting.hamsterCPool()
            console.log(hamsterC[0])
            const _hamsterC = {
                name: hamsterC[0],
                wins: Number(hamsterC[1]),
                losses: Number(hamsterC[2])
            }
            setHamsterC(_hamsterC)

            const hamsterD = await betting.hamsterDPool()
            console.log(hamsterD[0])
            const _hamsterD = {
                name: hamsterD[0],
                wins: Number(hamsterD[1]),
                losses: Number(hamsterD[2])
            }
            sethamsterD(_hamsterD)
        }

        if(isConnected) {
            getPools()
        }
    }, [])

    return (
        <div id="hams_ters" className="bg-[#1A2C38] p-4">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-4 sm:px-16 py-4">
                <h1 className="p-4 sm:p-8 text-center text-white font-black text-2xl sm:text-6xl">OUR HAMSTERS</h1>
                <div className="grid grid-rows-4 sm:grid-cols-4 gap-4">
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2">
                                <h2 className="font-black text-white text-3xl">{hamsterA.name}</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2">
                                <Image
                                    src={_rocky}
                                    width={150}
                                    alt="Hamster A"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {hamsterA.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {hamsterA.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2">
                                <h2 className="font-black text-white text-3xl">{hamsterB.name}</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2">
                                <Image
                                    src={_charlie}
                                    width={150}
                                    alt="Hamster B"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {hamsterB.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {hamsterB.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2">
                                <h2 className="font-black text-white text-3xl">{hamsterC.name}</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2">
                                <Image
                                    src={_teddy}
                                    width={150}
                                    alt="Hamster C"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {hamsterC.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {hamsterC.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2 mb-2">
                                <h2 className="font-black text-white text-3xl">{hamsterD.name}</h2>
                            </div>
                            <div className="p-2 mb-2 flex justify-center">
                                <Image
                                    src={_oliver}
                                    width={150}
                                    alt="Hamster D"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {hamsterD.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {hamsterD.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}