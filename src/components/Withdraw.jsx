"use client"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Withdraw() {
    const [balance, setBalance] = useState("--")
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)

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
    }, [address, isConnected, provider])

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

                setLoading(true)

                try {
                    await betting.withdrawal(ethers.parseEther(amount), { value: ethers.parseEther("0") })

                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    toast.error("An error occured while processing this request.")
                    setLoading(false)
                }
                
                betting.on("Withdrawal", (user, amount, e) => {
                    console.log(user, amount)

                    if(user == address) {
                        toast.success(`Withdrawal of ${ethers.formatEther(amount)} ETH was successful.`)
                        setLoading(false)
                    }
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
        <div id="withdraw" className="bg-[#0052FE] p-4 sm:p-10 h-screen sm:h-full">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-8 py-4 sm:px-16 sm:py-8">
                <h1 className="p-4 sm:p-8 text-center text-white font-black text-xl sm:text-4xl mb-8">YOUR BALANCE IS {balance} ETH</h1>
                <div className="flex justify-center items-center">
                    <div className="">
                        <div className="flex justify-center mb-2">
                            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="m-4 w-56 font-normal text-white text-sm px-2 py-4 rounded-lg bg-[#0F212E] border border-[#8D969C]" type="number" min={0.005} max={balance} step={0.005} placeholder="0.005 ETH" />
                        </div>
                        <div className="flex justify-center mb-4">
                            <button onClick={() => setAmount(0.005)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1 sm:p-2 sm:m-2">MIN</button>
                            <button onClick={() => setAmount(balance)} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xs bg-[#45E4AE] p-1 m-1 sm:p-2 sm:m-2">MAX</button>
                        </div>
                        <div className="mt-4 flex justify-center">
                            {!loading && <button onClick={withdraw} className="rounded-lg animate-pulse hover:animate-none font-medium text-white text-center text-xl bg-[#45E4AE] p-4">Withdraw</button>}
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
            </div>
        </div>
    )
}