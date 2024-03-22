import Link from "next/link";
import { FaDiscord, FaHeadset, FaTelegram, FaWeebly, FaXTwitter } from "react-icons/fa6";

export default function Support() {
    return (
        <div id="support" className="bg-[#1A2C38] p-4 sm:p-16 sm:h-full h-screen">
            <div className="">
                <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-8 py-4 sm:px-16 sm:py-8">
                    <div className="flex justify-center px-8 py-2 sm:px-8 sm:py-4 mb-8">
                        <div className="flex flex-row">
                            <div className="hidden sm:block p-4">
                                <FaHeadset size={60} color="#fff" className=""/>
                            </div>
                            <div className="p-4">
                                <h1 className="text-center text-white font-black text-2xl sm:text-6xl">SUPPORT</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 sm:px-40 py-4">
                        <div className="grid grid-cols-3">
                            <div className="flex justify-center items-center">
                                <Link href="https://t.me/crypto_hamster_betting_bot">
                                    <FaTelegram size={48} color="#fff" className=""/>
                                </Link>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link href="https://x.com/racinghamsters">
                                    <FaXTwitter size={48} color="#fff" className=""/>
                                </Link>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link href="https://www.racinghamsters.com/">
                                    <FaWeebly size={48} color="#fff" className=""/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}