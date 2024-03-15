"use client"

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useEffect, useState } from "react"

import { BETTING_ABI, BETTING_CA } from "@/context/config"
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

export default function Bets() {
    const bet = {
        id: "--",
        wager: "--",
        hamster: "--",
        outcome: "--"
    }
    const [bets, setBets] = useState([bet])

    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    useEffect(() => {
        const getBets = async () => {
            const signer = await provider.getSigner()
            const outcomes = ["Won", "Lost", "Pending"]
            const hamsters = ["Nil", "Rocky", "Charlie", "Teddy", "Oliver"]

            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            // const bets = await betting.getBets(address)
            const bets = await betting.getBets()
            console.log(bets)

            let _bets = []
            bets.forEach((bet) => {
                const _bet = {
                    id: bet[0],
                    wager: ethers.formatEther(bet[1]),
                    hamster: hamsters[Number(bet[2])],
                    outcome: outcomes[Number(bet[3])]
                }
                _bets.push(_bet)
            })
            setBets(_bets)
        }

        if(isConnected) {
            getBets()
        }
    }, [])

    return (
        <div id="bets" className="bg-[#1A2C38] p-4">
            <ToastContainer/>
            <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-16 py-4">
                <h1 className="p-8 text-center text-white font-black text-6xl">BET HISTORY</h1>
                <div className="px-16 py-4">
                    <table className="table-auto w-full rounded-lg border-collapse border border-[#8D969C]">
                        <thead>
                            <tr className="bg-[#1A2C38]">
                                <th className="p-4 text-white font-bold text-2xl border border-[#8D969C]">BetID</th>
                                <th className="p-4 text-white font-bold text-2xl border border-[#8D969C]">Wager</th>
                                <th className="p-4 text-white font-bold text-2xl border border-[#8D969C]">Hamster</th>
                                <th className="p-4 text-white font-bold text-2xl border border-[#8D969C]">Outcome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bets.map((bet, index) => (
                                    <tr key={index} className={clsx(index % 2 == 0 ? "" : "bg-[#1A2C38]")}>
                                        <td className="p-4 text-white font-normal text-lg border border-[#8D969C]">{bet.id}</td>
                                        <td className="p-4 text-white font-normal text-lg border border-[#8D969C]">{bet.wager} ETH</td>
                                        <td className="p-4 text-white font-normal text-lg border border-[#8D969C]">{bet.hamster}</td>
                                        <td className={clsx("p-4", "font-normal", "text-lg", "border", "border-[#8D969C]", bet.outcome == "Won" ? "text-[#45E4AE]" : "text-[#DE8508]")}>{bet.outcome}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}