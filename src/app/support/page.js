"use client"

import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Support from "@/components/Support";
import { store } from "@/store";
import { useContext } from "react";

export default function SupportPage() {
    const { state } = useContext(store)
    const { showSideBar } = state

    return (
        <>
            {showSideBar && <MobileNav/>}
            {!showSideBar &&
                <>
                    <section id="heading">
                        <Header page="/support"/>
                    </section>
                    <section id="navigation">
                        <Nav value="support"/>
                    </section>
                    <section id="_support">
                        <Support/>
                    </section>
                </>
            }
        </>
    )
}