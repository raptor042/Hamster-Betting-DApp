import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Support from "@/components/Support";

export default function SupportPage() {
    return (
        <>
            <MobileNav/>
            <section id="heading">
                <Header/>
            </section>
            <section id="navigation">
                <Nav value="support"/>
            </section>
            <section id="_support">
                <Support/>
            </section>
        </>
    )
}