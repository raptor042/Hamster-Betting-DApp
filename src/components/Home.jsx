"use client"

export default function Home() {
    return (
        <div id="home" className="bg-[url('../../public/hamster.jpeg')] bg-cover bg-no-repeat bg-center">
            <div className="hidden sm:grid grid-cols-3 gap-4 px-16 py-10">
                <div className="p-4">
                    <h1 className="font-black text-white text-6xl mb-4">HAMSTER RACING</h1>
                    <p className="font-bold text-white text-sm mt-4 mb-4">Hamsters is a betting platform where you can bet on live hamsters. The hamsters are real and the bets are real. The hamsters are running on a track and the first hamster to cross the finish line wins.</p>
                    <p className="font-bold text-white text-sm mt-4">You can bet on the winning hamster and win money if you are right.</p>
                </div>
            </div>
            <div className="h-full sm:hidden flex justify-center items-center">
                <div className="">
                    <h1 className="font-black text-center text-white text-2xl mb-4">HAMSTER RACING</h1>
                    <p className="font-bold text-center text-white text-sm mt-4 mb-4">Hamsters is a betting platform where you can bet on live hamsters. The hamsters are real and the bets are real. The hamsters are running on a track and the first hamster to cross the finish line wins.</p>
                    <p className="font-bold text-center text-white text-sm mt-4">You can bet on the winning hamster and win money if you are right.</p>
                </div>
            </div>
        </div>
    )
}