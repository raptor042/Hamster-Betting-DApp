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
    
    const [rocky, setRocky] = useState(pool)
    const [charlie, setCharlie] = useState(pool)
    const [teddy, setTeddy] = useState(pool)
    const [oliver, setOliver] = useState(pool)

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

            const rocky = await betting.rockyPool()
            console.log(rocky)
            const _rocky = {
                name: rocky[0],
                wins: Number(rocky[1]),
                losses: Number(rocky[2])
            }
            setRocky(_rocky)

            const charlie = await betting.charliePool()
            console.log(charlie[0])
            const _charlie = {
                name: charlie[0],
                wins: Number(charlie[1]),
                losses: Number(charlie[2])
            }
            setCharlie(_charlie)

            const teddy = await betting.teddyPool()
            console.log(teddy[0])
            const _teddy = {
                name: teddy[0],
                wins: Number(teddy[1]),
                losses: Number(teddy[2])
            }
            setTeddy(_teddy)

            const oliver = await betting.oliverPool()
            console.log(oliver[0])
            const _oliver = {
                name: oliver[0],
                wins: Number(oliver[1]),
                losses: Number(oliver[2])
            }
            setOliver(_oliver)
        }

        if(isConnected) {
            getPools()
        }
    }, [])

    return (
        <div id="hams_ters" className="bg-[#1A2C38] p-4">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-16 py-4">
                <h1 className="p-8 text-center text-white font-black text-6xl">OUR HAMSTERS</h1>
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2">
                                <h2 className="font-black text-white text-3xl">{rocky.name}</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2">
                                <Image
                                    src={_rocky}
                                    width={150}
                                    alt="Rocky"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {rocky.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {rocky.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2">
                                <h2 className="font-black text-white text-3xl">{charlie.name}</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2">
                                <Image
                                    src={_charlie}
                                    width={150}
                                    alt="Charlie"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {charlie.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {charlie.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2">
                                <h2 className="font-black text-white text-3xl">{teddy.name}</h2>
                            </div>
                            <div className="p-2 flex justify-center mb-2">
                                <Image
                                    src={_teddy}
                                    width={150}
                                    alt="Teddy"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {teddy.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {teddy.losses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1A2C38] p-4">
                        <div className="">
                            <div className="text-center p-2 mb-2">
                                <h2 className="font-black text-white text-3xl">{oliver.name}</h2>
                            </div>
                            <div className="p-2 mb-2 flex justify-center">
                                <Image
                                    src={_oliver}
                                    width={150}
                                    alt="Oliver"
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#45E4AE] mr-2">
                                        <span className="font-bold text-md text-white">Won : {oliver.wins}</span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="text-center p-2 bg-[#DE8508] ml-2">
                                        <span className="font-bold text-md text-white">Lost : {oliver.losses}</span>
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