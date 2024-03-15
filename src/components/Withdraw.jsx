"use client"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Withdraw() {
    const [balance, setBalance] = useState("--")
    const [amount, setAmount] = useState(0)
    const [hamster, setHamster] = useState(false)

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    useEffect(() => {
        const getBalance = async () => {
            const signer = await provider.getSigner()

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            const user = await betting.users(address)
            console.log(user)

            setBalance(ethers.formatEther(user[1]))
        }

        if(isConnected) {
            getBalance()
        }
    }, [])

    const withdraw = async (e) => {
        e.preventDefault()

        if(isConnected) {
            if(amount > 0 && amount <= balance) {
                const signer = await provider.getSigner()

                const betting = new ethers.Contract(
                    BETTING_CA,
                    BETTING_ABI,
                    signer
                )

                await betting.withdrawal(ethers.parseEther(amount), { value: ethers.parseEther("0") })

                setHamster(true)
                
                betting.on("Withdrawal", (user, amount, e) => {
                    console.log(user, amount)
                    toast.success(`Withdrawal of ${ethers.formatEther(amount)} ETH was successful.`)
                    setHamster(false)
                })
            } else if(amount > balance) {
                toast.error("Insufficent funds.")
            } else if(amount <= 0) {
                toast.error("Amount must be greater than zero")
            }
        } else {
            toast.error("Wallet not connected.")
        }
    }

    return (
        <div id="withdraw" className="bg-[#1A2C38] p-10">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-16 py-8">
                <h1 className="p-8 text-center text-white font-black text-4xl mb-8">YOUR BALANCE IS {balance} ETH</h1>
                <div className="flex justify-center items-center">
                    <div className="">
                        <div className="mb-4">
                            <input onChange={(e) => setAmount(e.target.value)} className="w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" placeholder="0.005 ETH" />
                        </div>
                        <div className="mt-4 flex justify-center">
                            {!hamster && <button onClick={withdraw} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xl bg-[#45E4AE] p-4">Withdraw</button>}
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
            </div>
        </div>
    )
}