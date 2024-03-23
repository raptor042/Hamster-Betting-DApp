"use client"

import ReactTwitchEmbedVideo from "react-twitch-embed-video"

export default function Live() {
  return (
     <div id="live" className="bg-[#0052FE] p-2 sm:p-8 h-screen sm:h-full">
            <div className="sm:rounded-lg sm:bg-[#0F212E] sm:border sm:border-[#8D969C] sm:px-16 sm:py-4">
                <h1 className="p-2 sm:p-8 text-center text-white font-black text-xl sm:text-6xl">LIVE STREAM</h1>
                <div className="px-1 py-2 sm:px-4 sm:py-4">
                    <ReactTwitchEmbedVideo channel="hamsgolive" layout={"video-with-chat"} width={"100%"} height={"600px"}/>
                </div>
            </div>
        </div>
  )
}