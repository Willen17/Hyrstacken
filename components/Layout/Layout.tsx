import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface Props {
  children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <>
    <Header />
      {props.children}
    <Footer />
    </>
  )
}

export default Layout;