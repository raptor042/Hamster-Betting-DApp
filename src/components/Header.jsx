"use client"

import Image from "next/image";

import hamster from "../../public/hamster.svg"
import ConnectWallet from "./ConnectWallet";

import { FaXTwitter, FaDiscord, FaTelegram, FaDice } from "react-icons/fa6"
import Link from "next/link";

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
    const [user, setUser] = useState(false)
    const [bettingCA, setBettingCA] = useState()

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    useEffect(() => {
        const userExists = async () => {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            setBettingCA(betting)

            const user = await betting.users(address)
            console.log(user)

            if(user.user == address) {
                setUser(true)
            }
        }

        if(isConnected) {
            userExists()
        }
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()

        if(isConnected) {
            await bettingCA.createUser()

            bettingCA.on("User_Created", (user, e) => {
                console.log(user)
                setUser(true)

                toast.success("Your betting account has been created.")
            })
        } else {
            toast.error("Wallet not connected.")
        }
    }

    return (
        <div id="header" className="bg-[#1A2C38] border-b border-[#8D969C]">
            <ToastContainer/>
            <div className="grid grid-cols-3 gap-4 py-6 px-10">
                <div className="flex flex-row">
                    <div className="basis-1/4">
                        <div className="hover:animate-spin">
                            <Image
                                src={hamster}
                                width={80}
                                height={80}
                                alt="Hamster Image"
                            />
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <div className="my-2 mx-4">
                            <ConnectWallet/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <FaTelegram size={48} color="#fff" className=""/>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <FaXTwitter size={48} color="#fff" className=""/>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <FaDiscord size={48} color="#fff" className=""/>
                        </Link>
                    </div>
                </div>
                {!user && <div className="px-20 flex justify-end">
                    <div>
                        <button onClick={handleClick} className="rounded-lg animate-pulse hover:animate-none font-black text-white text-center text-2xl bg-[#112330] p-6">SIGN IN</button>
                    </div>
                </div>}
                {user && <div className="px-20 flex justify-end">
                    <div className="rounded-lg flex flex-row items-center justify-center p-4 bg-[#112330] animate-pulse hover:animate-none">
                        <div className="basis-2/3">
                            <Link href="/" className="mr-2 text-white font-black text-3xl">PLAY</Link>
                        </div>
                        <div className="basis-1/3">
                            <FaDice size={42} color="#fff" className="ml-2"/>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}