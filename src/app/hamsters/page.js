"use client"

import Hamsters from "@/components/Hamsters";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import { store } from "@/store";
import { useContext } from "react";

export default function HamstersPage() {
    const { state } = useContext(store)
    const { showSideBar } = state

    return (
        <>
            {showSideBar && <MobileNav/>}
            {!showSideBar &&
                <>
                    <section id="heading">
                        <Header page="/hamsters"/>
                    </section>
                    <section id="navigation">
                        <Nav value="hamsters"/>
                    </section>
                    <section id="hamsters">
                        <Hamsters/>
                    </section>
                </>
            }
        </>
    )
}