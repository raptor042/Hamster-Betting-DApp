import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Support from "@/components/Support";

export default function SupportPage() {
    return (
        <>
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