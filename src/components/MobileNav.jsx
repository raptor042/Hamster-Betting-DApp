"use client"

import { store } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaTelegram, FaWeebly, FaXTwitter, FaXmark } from "react-icons/fa6";

export default function MobileNav({ value }) {
    const { state, dispatch } = useContext(store)
    const { showSideBar } = state

    const router = useRouter()

    const handleSideBar = e => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              showSideBar : false
            }
        })
    }

    const handleClick = route => {
        router.push(route)

        setTimeout(() => {
            dispatch({
                type : "Display/Hide SideBar",
                payload : {
                  showSideBar : false
                }
            })
        }, 2000)
    }

    return (
        <div id="mobile-nav" className="absolute sm:hidden flex flex-col w-screen h-screen bg-[#0052FE] opacity-90 px-8">
            <div className="basis-1/6 flex flex-row items-center justify-end">
                <FaXmark size={24} color="#fff" onClick={handleSideBar}/>
            </div>
            <div className="basis-3/6 flex flex-col items-center mb-4">
                <div onClick={() => handleClick("/hamsters")} className={clsx("mb-2", "text-center", value == "hamsters" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <span className={clsx(value == "hamsters" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>HAMSTERS</span>
                </div>
                <div onClick={() => handleClick("/bet")} className={clsx("mb-2", "mt-2", "text-center", value == "bet" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <span className={clsx(value == "bet" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>LIVE BET</span>
                </div>
                <div onClick={() => handleClick("/bets")} className={clsx("mb-2", "mt-2", "text-center", value == "bets" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <span className={clsx(value == "bets" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>BETS</span>
                </div>
                <div onClick={() => handleClick("/withdraw")} className={clsx("mb-2", "mt-2", "text-center", value == "withdraw" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <span className={clsx(value == "withdraw" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>WITHDRAW</span>
                </div>
                <div onClick={() => handleClick("/support")} className={clsx( "mt-2", "text-center", value == "support" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-6", "py-6")}>
                    <span className={clsx(value == "support" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>SUPPORT</span>
                </div>
            </div>
            <div className="basis-2/6 mt-12">
                <div className="grid grid-cols-3">
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
                </div>
            </div>
        </div>
    )
}