"use client"

import { store } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";
import { FaDiscord, FaTelegram, FaXTwitter, FaXmark } from "react-icons/fa6";

export default function MobileNav({ value }) {
    const { state, dispatch } = useContext(store)
    const { showSideBar } = state

    const handleSideBar = e => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              showSideBar : false
            }
        })
    }

    return (
        <div id="mobile-nav" className={showSideBar ? "absolute top-10 left-0 sm:hidden flex flex-col w-screen h-screen bg-[#1A2C38] opacity-90 px-8" : "hidden"}>
            <div className="basis-1/6 flex flex-row items-center justify-end">
                <FaXmark size={24} color="#fff" onClick={handleSideBar}/>
            </div>
            <div className="basis-3/6 flex flex-col items-center mb-4">
                <div className={clsx("mb-2", "text-center", value == "hamsters" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <Link href="/hamsters" className={clsx(value == "hamsters" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>HAMSTERS</Link>
                </div>
                <div className={clsx("mb-2", "mt-2", "text-center", value == "bet" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <Link href="/bet" className={clsx(value == "bet" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>LIVE BET</Link>
                </div>
                <div className={clsx("mb-2", "mt-2", "text-center", value == "bets" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <Link href="/bets" className={clsx(value == "bets" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>BETS</Link>
                </div>
                <div className={clsx("mb-2", "mt-2", "text-center", value == "withdraw" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <Link href="/withdraw" className={clsx(value == "withdraw" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>WITHDRAW</Link>
                </div>
                <div className={clsx( "mt-2", "text-center", value == "support" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <Link href="/support" className={clsx(value == "support" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>SUPPORT</Link>
                </div>
            </div>
            <div className="basis-2/6 mt-12">
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
            </div>
        </div>
    )
}