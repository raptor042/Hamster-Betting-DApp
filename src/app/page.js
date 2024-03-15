import Bet from "@/components/Bet";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
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