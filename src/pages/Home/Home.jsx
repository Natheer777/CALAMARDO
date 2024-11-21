import { Beverages, Come, Contact, Footer, Gps, Header, Menu, Message, Welcom } from "../../section/index"
import DashboareD from "../Dash/Dash";
export default function Home() {
  return (
    <>

      <Header />
      <Welcom />
      <Message />
      <Come /> 
      <Menu />
      <Beverages />
      <Contact />
      <Gps />
      <Footer /> 
      <DashboareD />
    </>
  );
}
