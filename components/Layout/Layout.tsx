import router, { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ArrowBackIcon from "../../assets/productPage/arrowBack.svg";

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    const url = useRouter();
    return (
        <>
            {url.pathname !== "/" && (
                <div
                    onClick={() => router.back()}
                    className="cursor-pointer absolute bg-softRed h-10 w-10 rounded-lg flex items-center justify-center top-[1.2rem] left-[1.2rem] min-[800px]:mt-[92px]"
                >
                    <ArrowBackIcon className="text-white" />
                </div>
            )}
            {props.children}
            <Footer />
            <Header />
        </>
    );
};

export default Layout;
