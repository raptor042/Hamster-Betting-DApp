"use client"

import About from "@/components/About";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import { store } from "@/store";
import { useContext } from "react";

export default function AboutPage() {
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
          <section id="navigation">
            <Nav value="about"/>
          </section>
          <section id="about_page">
            <About />
          </section>
        </>
      }
    </div>
  );
}
