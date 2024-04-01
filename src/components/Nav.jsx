"use client"

import { store } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";

export default function Nav({ value }) {
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
        <div id="nav" className="bg-[#0052FE]">
            <div className="hidden sm:grid grid-cols-6 gap-4 px-16 py-4">
                <div onClick={handleSideBar} className={clsx("text-center", value == "hamsters" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/hamsters" className={clsx(value == "hamsters" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>HAMSTERS</Link>
                </div>
                <div onClick={handleSideBar} className={clsx("text-center", value == "bet" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/bet" className={clsx(value == "bet" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>LIVE BET</Link>
                </div>
                <div onClick={handleSideBar} className={clsx("text-center", value == "bets" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/bets" className={clsx(value == "bets" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>BETS</Link>
                </div>
                <div onClick={handleSideBar} className={clsx("text-center", value == "withdraw" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/withdraw" className={clsx(value == "withdraw" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>WITHDRAW</Link>
                </div>
                <div onClick={handleSideBar} className={clsx("text-center", value == "about" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/about" className={clsx(value == "about" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>ABOUT</Link>
                </div>
                <div onClick={handleSideBar} className={clsx("text-center", value == "support" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/support" className={clsx(value == "support" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>SUPPORT</Link>
                </div>
            </div>
        </div>
    )
}