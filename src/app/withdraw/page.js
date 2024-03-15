import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Withdraw from "@/components/Withdraw";

export default function WithdrawPage() {
    return (
        <>
            <section id="heading">
                <Header/>
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