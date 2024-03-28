"use client"

import Bets from "@/components/Bets";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import { store } from "@/store";
import { useContext } from "react";

export default function BetsPage() {
    const { state } = useContext(store)
    const { showSideBar } = state

    return (
        <>
            {showSideBar && <MobileNav/>}
            {!showSideBar &&
                <>
                    <section id="heading">
                        <Header page="/bets"/>
                    </section>
                    <section id="navigation">
                        <Nav value="bets"/>
                    </section>
                    <section id="_bets">
                        <Bets/>
                    </section>
                </>
            }
        </>
    )
}