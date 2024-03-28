"use client"

import Header from "@/components/Header";
import Home from "@/components/Home";
import MobileNav from "@/components/MobileNav";
import { store } from "@/store";
import { useContext } from "react";

export default function HomePage() {
  const { state } = useContext(store)
  const { showSideBar } = state

  return (
    <div className="">
      {showSideBar && <MobileNav/>}
      {!showSideBar &&
        <>
          <section id="heading">
            <Header page="/"/>
          </section>
          <section id="home_page">
            <Home/>
          </section>
        </>
      }
    </div>
  )
}