"use client"

import Admin from "@/components/Admin";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { BETTING_ABI, BETTING_CA } from "@/context/config";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
    const { address, isConnected } = useWeb3ModalAccount()

    const { walletProvider } = useWeb3ModalProvider()

    let provider;

    if(walletProvider) {
        provider = new ethers.BrowserProvider(walletProvider)
    }

    useEffect(() => {
        const getOwner = async () => {
            const signer = await provider.getSigner()
    
            const betting = new ethers.Contract(
                BETTING_CA,
                BETTING_ABI,
                signer
            )

            const isAdmin = await betting.admin(address)
            console.log(isAdmin)

            if(!isAdmin) {
                toast.error("You are not an adminstrator.")

                window.location.assign("https://www.racinghamsters.com/bet")
            }
        }

        if(isConnected) {
            getOwner()
        }
    }, [address, isConnected, provider])

    return (
        <>
            <MobileNav/>
            <ToastContainer/>
            <section id="heading">
                <Header page="/admin"/>
            </section>
            <section id="adminstrator">
                <Admin/>
            </section>
        </>
    )
}