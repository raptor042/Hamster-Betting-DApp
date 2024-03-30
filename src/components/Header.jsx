"use client"

import Image from "next/image";

import hamster from "../../public/hamster.png"
import ConnectWallet from "./ConnectWallet";

import { FaXTwitter, FaTelegram, FaDice, FaBars, FaWeebly } from "react-icons/fa6"
import Link from "next/link";

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useContext, useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store";

export default function Header({ page }) {
    const [user, setUser] = useState(false)
    const [balance, setBalance] = useState("--")
    const [bal, setBal] = useState(page == "/" || page == "/admin" ? true : false)
    const [loading, setLoading] = useState(false)
    
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

            const user = await betting.users(address)
            console.log(user)

            setBalance(ethers.formatEther(user[1]))

            if(user.user == address) {
                setUser(true)
            }
        }

        if(isConnected) {
            userExists()
        }
    }, [address, isConnected, provider, user])

    const handleClick = async (e) => {
        e.preventDefault()

        const signer = await provider.getSigner()

        const betting = new ethers.Contract(
            BETTING_CA,
            BETTING_ABI,
            signer
        )

        if(isConnected) {
            setLoading(true)

            try {
                await betting.createUser()
            } catch (error) {
                console.log(error)
                setLoading(false)
                toast.error("You already have an account.")
            }

            betting.on("User_Created", (user, e) => {
                console.log(user)
                setLoading(false)
                setUser(true)
                toast.success("Your betting account has been created.")
            })
        } else {
            toast.error("Wallet not connected.")
        }
    }

    return (
        <div id="header" className="bg-[#0052FE] border-b border-white">
            <ToastContainer/>
            <div className="hidden sm:grid grid-cols-3 gap-4 py-4 px-10">
                <div className="flex flex-row">
                    <div className="basis-1/4">
                        <div className="hover:animate-spin">
                            <Image
                                src={hamster}
                                width={100}
                                height={100}
                                alt="Hamster Image"
                            />
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <div className="my-2">
                            <ConnectWallet/>
                        </div>
                    </div>
                </div>
                {bal && <div className="grid grid-cols-3">
                    <div className="flex justify-center items-center">
                        <Link href="https://t.me/racinghamstersbot">
                            <FaTelegram size={48} color="#fff" className=""/>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="https://x.com/racinghamsters">
                            <FaXTwitter size={48} color="#fff" className=""/>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="https://rev.racinghamsters.com/">
                            <FaWeebly size={48} color="#fff" className=""/>
                        </Link>
                    </div>
                </div>}
                {!bal && 
                    <div className="flex flex-row justify-end">
                        <div className="my-2 rounded-lg bg-[#112330] animate-pulse hover:animate-none p-4">
                            <h1 className="font-medium text-white text-md">Balance : {Number(balance).toFixed(4)} ETH</h1>
                        </div>
                    </div>
                }
                {!user && 
                    <div className="px-10 flex justify-end">
                        <div className="my-2">
                            <button onClick={handleClick} className="rounded-lg animate-pulse hover:animate-none font-black text-white text-center text-xl bg-[#112330] p-4">
                                {!loading && "SIGN IN"}
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
                            </button>
                        </div>
                    </div>
                }
                {user && 
                    <div className="px-10 flex justify-end">
                        <div className="my-2 rounded-lg flex flex-row items-center justify-center p-4 bg-[#112330] animate-pulse hover:animate-none">
                            <div className="basis-2/3">
                                <Link href="/bet" className="mr-2 text-white font-black text-xl">PLAY</Link>
                            </div>
                            <div className="basis-1/3">
                                <FaDice size={42} color="#fff" className="ml-2"/>
                            </div>
                        </div>
                    </div>
                }
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
                                <button onClick={handleClick} className="rounded-lg animate-pulse hover:animate-none font-black text-white text-center text-xs bg-[#112330] p-2">
                                    {!loading && "SIGN IN"}
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
                                </button>
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