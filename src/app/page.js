import Header from "@/components/Header";
import Home from "@/components/Home";
import MobileNav from "@/components/MobileNav";

export default function HomePage() {
  return (
    <>
      <MobileNav/>
      <section id="heading">
        <Header page="/"/>
      </section>
      <section id="home_page">
        <Home/>
      </section>
    </>
  )
}