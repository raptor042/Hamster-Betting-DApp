import Bets from "@/components/Bets";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";

export default function BetsPage() {
    return (
        <>
            <MobileNav/>
            <section id="heading">
                <Header/>
            </section>
            <section id="navigation">
                <Nav value="bets"/>
            </section>
            <section id="_bets">
                <Bets/>
            </section>
        </>
    )
}