import clsx from "clsx";
import Link from "next/link";

export default function Nav({ value }) {
    return (
        <div id="nav" className="bg-[#1A2C38]">
            <div className="grid grid-cols-5 gap-4 px-16 py-4">
                <div className={clsx("text-center", value == "hamsters" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/hamsters" className={clsx(value == "hamsters" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>HAMSTERS</Link>
                </div>
                <div className={clsx("text-center", value == "bet" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/" className={clsx(value == "bet" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>LIVE BET</Link>
                </div>
                <div className={clsx("text-center", value == "bets" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/bets" className={clsx(value == "bets" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>BETS</Link>
                </div>
                <div className={clsx("text-center", value == "withdraw" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/withdraw" className={clsx(value == "withdraw" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>WITHDRAW</Link>
                </div>
                <div className={clsx("text-center", value == "support" ? "bg-[#142632]" : "bg-[#0F212E]", "hover:bg-[#142632]", "rounded-lg", "px-2", "py-6")}>
                    <Link href="/support" className={clsx(value == "support" ? "text-[#7A848B]" : "text-white", "hover:text-[#7A848B]", "font-black", "text-lg")}>SUPPORT</Link>
                </div>
            </div>
        </div>
    )
}