"use client"

import Link from "next/link"
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

export default function Home() {
    return (
        <div id="home" className="bg-[url('../../public/hamster.jpeg')] bg-cover bg-no-repeat bg-center h-screen">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3  container mx-auto px-4 py-12">
                <div className="md:col-span-2">
                    <div className="hidden sm:block">
                        <div className="p-4">
                            <h1 className="font-black text-white text-6xl mb-4">HAMSTER RACING</h1>
                            <p className="font-bold text-white text-sm mt-4 mb-4">Hamsters is a betting platform where you can bet on live hamsters. The hamsters are real and the bets are real. The hamsters are running on a track and the first hamster to cross the finish line wins.</p>
                            <p className="font-bold text-white text-sm mt-4">You can bet on the winning hamster and win money if you are right.</p>
                        </div>
                        <div className="text-center bg-[#0F212E] hover:bg-[#142632] rounded-lg p-4 mt-6">
                            <Link href="/about" className="text-white hover:text-[#7A848B] font-black text-lg">MORE INFO</Link>
                        </div>
                    </div>
                    <div className="h-full sm:hidden flex justify-center items-center">
                        <div className="">
                            <h1 className="font-black text-center text-white text-2xl mb-4">HAMSTER RACING</h1>
                            <p className="font-bold text-center text-white text-sm mt-4 mb-4">Hamsters is a betting platform where you can bet on live hamsters. The hamsters are real and the bets are real. The hamsters are running on a track and the first hamster to cross the finish line wins.</p>
                            <p className="font-bold text-center text-white text-sm mt-4">You can bet on the winning hamster and win money if you are right.</p>
                            <div className="text-center bg-[#0F212E] hover:bg-[#142632] rounded-lg p-4 mt-6">
                                <Link href="/about" className="text-white hover:text-[#7A848B] font-black text-lg">MORE INFO</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:col-span-3 bg-blue-400 p-2 rounded">
                    <ReactTwitchEmbedVideo channel="hamsgolive" layout={"video"} width={"100%"} height={"100%"}/>
                </div>
            </div>
        </div>
    )
}