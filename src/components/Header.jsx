"use client"

import Image from "next/image";

import hamster from "../../public/hamster.svg"
import ConnectWallet from "./ConnectWallet";

import { FaXTwitter, FaDiscord, FaTelegram, FaDice, FaBars } from "react-icons/fa6"
import Link from "next/link";

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useContext, useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store";

export default function Header() {
    const [user, setUser] = useState(false)
    const [bettingCA, setBettingCA] = useState()

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    const { state, dispatch } = useContext(store)
    const { showSideBar } = state

    const handleSideBar = e => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              showSideBar : true
            }
        })
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
            <div className="hidden sm:grid grid-cols-3 gap-4 py-6 px-10">
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
                            <Link href="/bet" className="mr-2 text-white font-black text-3xl">PLAY</Link>
                        </div>
                        <div className="basis-1/3">
                            <FaDice size={42} color="#fff" className="ml-2"/>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="sm:hidden w-full flex flex-row py-3 px-5">
                <div className="basis-1/6">
                    <div className="hover:animate-spin">
                        <Image
                            src={hamster}
                            width={40}
                            height={40}
                            alt="Hamster Image"
                        />
                    </div>
                </div>
                <div className="basis-1/2">
                    <ConnectWallet/>
                </div>
                {!user && 
                    <div className="basis-2/6">
                        <div className="flex justify-end">
                            <div>
                                <button onClick={handleClick} className="rounded-lg animate-pulse hover:animate-none font-black text-white text-center text-xs bg-[#112330] p-2">SIGN IN</button>
                            </div>
                        </div>
                    </div>
                }
                {user && 
                    <div className={showSideBar ? "hidden" : "basis-2/6"}>
                        <div className="flex justify-end">
                            <div className="cursor-pointer rounded-lg flex flex-row items-center justify-center p-2 bg-[#112330] animate-pulse hover:animate-none">
                                <div className="" onClick={handleSideBar}>
                                    <FaBars size={24} color="#fff" className=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}