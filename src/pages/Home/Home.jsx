import { Beverages, Come, Contact, Footer, Gps, Header, Menu, Message, Welcom } from "../../section/index"
// import Dash from '../Dash/Dash'
export default function Home() {
  return (
    <>
    {/* <Dash /> */}
      <Header />
      <Welcom />
      <Message />
      <Come /> 
      <Menu />
      <Beverages />
      <Contact />
      <Gps />
      <Footer /> 

    </>
  );
}
