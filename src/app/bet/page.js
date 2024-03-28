"use client"

import Bet from "@/components/Bet";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import { store } from "@/store";
import { useContext } from "react";

export default function BetPage() {
  const { state } = useContext(store)
  const { showSideBar } = state

  return (
    <>
      {showSideBar && <MobileNav/>}
      {!showSideBar &&
        <>
          <section id="heading">
            <Header page="/bet"/>
          </section>
          <section id="navigation">
            <Nav value="bet"/>
          </section>
          <section id="live_bet">
            <Bet/>
          </section>
        </>
      }
    </>
  )
}