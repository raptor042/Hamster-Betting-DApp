import Bet from "@/components/Bet";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <MobileNav/>
      <section id="heading">
        <Header/>
      </section>
      <section id="navigation">
        <Nav value="bet"/>
      </section>
      <section id="live_bet">
        <Bet/>
      </section>
    </>
  )
}