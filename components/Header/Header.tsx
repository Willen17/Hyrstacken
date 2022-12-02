import { signIn, signOut, useSession } from "next-auth/react";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import CloseIcon from "../../public/assets/close-icon.svg";

import MenuIcon from "../../public/assets/menu-icon.svg";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import SearchIcon from '../../public/assets/search-icon-white.svg'
import AddIcon from '../../public/assets/add-icon.svg'

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    useEffect(() => {
        const windowWidth = () => {
            if (window.innerWidth > 768) {
                setMenuIsOpen(false);
            }
        };
        window.addEventListener("resize", windowWidth);

        return () => window.removeEventListener("resize", windowWidth);
    });

    function useWindowOffset() {
        const [position, setPosition] = useState<number>(0);
        const [visible, setVisible] = useState<boolean>(true);

        const handleScroll = () => {
            let moving = window.pageYOffset;

            setVisible(position > moving);
            setPosition(moving);
        };

        useEffect(() => {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        });
        return visible;
    }

    function useVisibleStart() {
        const [start, setStart] = useState<boolean>(true);

        const handleScroll = () => {
            let moving = window.pageYOffset;

            if (moving > 200) {
                setStart(false);
            } else {
                setStart(true);
            }
        };

        useEffect(() => {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        });
        return start;
    }
    const visibleStart = useVisibleStart();
    const visibleHeader = useWindowOffset();

    const { data: session, status } = useSession();
    console.log(session);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-10 duration-[750ms] ${
                !visibleHeader ? "top-[-6rem]" : ""
            } ${!visibleStart ? "bg-veryDarkBlue" : ""}`}
        >
            <div className="py-[2rem] px-[2rem] sm:px-[4rem] flex justify-center items-center text-blue-500 md:py-[1rem]">
                <div className="w-[100%] flex items-center justify-between">
                    <Image src={Logo} alt="Logotype" />
                    <MenuIcon
                        className="block md:hidden"
                        onClick={() => setMenuIsOpen(!menuIsOpen)}
                    />
                    <div
                        onClick={() => setMenuIsOpen(false)}
                        className={`w-screen h-screen top-0 left-0 bg-blackish bg-opacity-60 ${
                            menuIsOpen ? "absolute block" : "hidden"
                        }`}
                    />
                    <div
                        className={`absolute items-center justify-center flex flex-col gap-10 text-veryDarkBlue bg-softRed rounded-l-xl md:flex-row md:bg-transparent md:h-fit h-[100vh] top-0 w-[80%] md:w-fit md:flex md:static transition-all duration-[450ms] ${
                            menuIsOpen ? "left-[20%]" : "left-[100%]"
                        }`}
                    >
                        <CloseIcon
                            className={` md:hidden ${
                                menuIsOpen
                                    ? "absolute right-[2rem] top-[2rem]"
                                    : ""
                            }`}
                            onClick={() => setMenuIsOpen(false)}
                        />

                        <Link href={"/searchResults"} className="flex items-center gap-3">
                            <SearchIcon />
                            <span className="text-xl text-white">Annonser</span>
                        </Link>

                        { session ? (
                            <Fragment>
                                <Link href={"/createItem"}>
                                    <PrimaryButton><AddIcon/>Skapa annons</PrimaryButton>
                                </Link>
                                <button className={`text-lg md:text-white ${menuIsOpen ? "text-white" : "text-veryDarkBlue"}`} onClick={() => signOut()}>Logga ut</button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <PrimaryButton onClick={() => signIn()}>Logga in</PrimaryButton>
                            </Fragment>  
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
