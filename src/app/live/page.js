import Header from "@/components/Header";
import Live from "@/components/Live";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";

export default function LivePage() {
    return (
        <>
            <MobileNav/>
            <section id="heading">
                <Header page="/play"/>
            </section>
            <section id="navigation">
                <Nav value="play"/>
            </section>
            <section id="live_stream">
                <Live/>
            </section>
        </>
    )
}