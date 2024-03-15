import Hamsters from "@/components/Hamsters";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

export default function HamstersPage() {
    return (
        <>
            <section id="heading">
                <Header/>
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