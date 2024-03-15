import Link from "next/link";
import { FaDiscord, FaHeadset, FaTelegram, FaXTwitter } from "react-icons/fa6";

export default function Support() {
    return (
        <div id="support" className="bg-[#1A2C38] p-16">
            <div className="">
                <div className="rounded-lg bg-[#0F212E] border border-[#8D969C] px-16 py-8">
                    <div className="flex justify-center px-8 py-4 mb-8">
                        <div className="flex flex-row">
                            <div className="p-4">
                                <FaHeadset size={60} color="#fff" className=""/>
                            </div>
                            <div className="p-4">
                                <h1 className="text-center text-white font-black text-6xl">SUPPORT</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 px-40 py-4">
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
            </div>
        </div>
    )
}