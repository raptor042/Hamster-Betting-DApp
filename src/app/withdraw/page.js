import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Withdraw from "@/components/Withdraw";

export default function WithdrawPage() {
    return (
        <>
            <MobileNav/>
            <section id="heading">
                <Header page="/withdraw"/>
            </section>
            <section id="navigation">
                <Nav value="withdraw"/>
            </section>
            <section id="withrawal">
                <Withdraw/>
            </section>
        </>
    )
}