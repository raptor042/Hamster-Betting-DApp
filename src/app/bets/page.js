import Bets from "@/components/Bets";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

export default function BetsPage() {
    return (
        <>
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