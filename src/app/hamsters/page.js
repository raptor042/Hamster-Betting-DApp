import Hamsters from "@/components/Hamsters";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";

export default function HamstersPage() {
    return (
        <>
            <MobileNav/>
            <section id="heading">
                <Header page="/hamsters"/>
            </section>
            <section id="navigation">
                <Nav value="hamsters"/>
            </section>
            <section id="hamsters">
                <Hamsters/>
            </section>
        </>
    )
}