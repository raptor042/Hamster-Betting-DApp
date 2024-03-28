"use client"

import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Withdraw from "@/components/Withdraw";
import { store } from "@/store";
import { useContext } from "react";

export default function WithdrawPage() {
    const { state } = useContext(store)
    const { showSideBar } = state

    return (
        <>
            {showSideBar && <MobileNav/>}
            {!showSideBar &&
                <>
                    <section id="heading">
                        <Header page="/withdraw"/>
                    </section>
                    <section id="navigation">
                        <Nav value="withdraw"/>
                    </section>
                    <section id="withrawal">
                        <Withdraw/>
                    </section>
                </>
            }
        </>
    )
}