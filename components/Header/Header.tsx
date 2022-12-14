import { signIn, useSession } from "next-auth/react";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SearchIcon from "../../public/assets/search-icon-white.svg";
import AddIcon from "../../public/assets/add-icon.svg";
import NotisIcon from "../../public/assets/notis-icon.svg";
import ProfileIcon from "../../public/assets/profile-icon.svg";
import HomeIcon from "../../public/assets/home-icon.svg";

const Header = () => {
    const router = useRouter();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [id, setId] = useState<string>();

    useEffect(() => {
        fetch("/api/getSessionUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (data) => {
                const user = await data.json();
                setId(user.id);
            })
            .catch((e) => console.log(e));
    }, []);

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

    return (
        <Fragment>
            <header
                className={`fixed z-50 top-0 left-0 right-0 duration-[750ms] max-[800px]:hidden
        ${!visibleHeader ? "top-[-6rem]" : ""} 
        ${!visibleStart ? "bg-veryDarkBlue" : ""}
        ${router.pathname !== "/" ? "bg-veryDarkBlue" : ""}
        `}
            >
                <div className="py-[2rem] px-[2rem] sm:px-[4rem] flex justify-center items-center text-blue-500 md:py-[1rem]">
                    <div className="w-[100%] flex items-center justify-between">
                        <Link href={"/"} id="logotype-img">
                            <Image src={Logo} alt="Logotype" />
                        </Link>
                        <div
                            onClick={() => setMenuIsOpen(false)}
                            className={`w-screen h-screen top-0 left-0 bg-blackish bg-opacity-60 ${
                                menuIsOpen ? "absolute block" : "hidden"
                            }`}
                        />
                        {session ? (
                            <Fragment>
                                <div className="gap-10 flex-row items-center bg-transparent h-fit top-0 w-fit flex transition-all duration-[450ms]">
                                    <Link href={"/createItem"}>
                                        <PrimaryButton>
                                            <AddIcon />
                                            Ny annons
                                        </PrimaryButton>
                                    </Link>
                                    <Link
                                        href={"/searchResults"}
                                        className={
                                            router.pathname == "/searchResults"
                                                ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(100%+1.33rem)] before:w-[3rem] before:h-[2px] before:bg-white before:block"
                                                : "text-white text-xs flex flex-col items-center gap-2"
                                        }
                                    >
                                        <SearchIcon />
                                        <span className="text-xs text-white">
                                            Annonser
                                        </span>
                                    </Link>
                                    <Link
                                        href={"/wip"}
                                        className={
                                            router.pathname == "/wip"
                                                ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(100%+1.33rem)] before:w-[3rem] before:h-[2px] before:bg-white before:block"
                                                : "text-white text-xs flex flex-col items-center gap-2"
                                        }
                                    >
                                        <NotisIcon />
                                        <span className="text-xs text-white">
                                            Notiser
                                        </span>
                                    </Link>
                                    <Link
                                        href={`/profile/${id}`}
                                        className={
                                            router.pathname == "/profile/[id]"
                                                ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(100%+1.33rem)] before:w-[3rem] before:h-[2px] before:bg-white before:block"
                                                : "text-white text-xs flex flex-col items-center gap-2"
                                        }
                                    >
                                        <ProfileIcon />
                                        <span className="text-xs text-white">
                                            Profil
                                        </span>
                                    </Link>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="flex flex-row items-center gap-10">
                                <Link
                                        href={"/searchResults"}
                                        className={
                                            router.pathname == "/searchResults"
                                                ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(100%+1.33rem)] before:w-[3rem] before:h-[2px] before:bg-white before:block"
                                                : "text-white text-xs flex flex-col items-center gap-2"
                                        }
                                    >
                                        <SearchIcon />
                                        <span className="text-xs text-white">
                                            Annonser
                                        </span>
                                    </Link>
                                <PrimaryButton onClick={() => signIn()}>
                                    Logga in
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <Fragment>
                {session ? (
                    <nav className="fixed bottom-0 bg-veryDarkBlue w-full flex items-center z-10 justify-center py-[1rem] min-[800px]:hidden">
                        <ul className="flex items-center gap-7 min-[500px]:gap-10">
                            <Link
                                href={"/"}
                                className={
                                    router.pathname == "/"
                                        ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(0%-1.1rem)] before:w-[2rem] before:h-[2px] before:bg-white before:block"
                                        : "text-white text-xs flex flex-col items-center gap-2"
                                }
                            >
                                <li className="relative flex flex-col items-center gap-1 min-[500px]:gap-2">
                                    <HomeIcon
                                        fill={`${
                                            router.pathname == "/"
                                                ? "#fafafa"
                                                : "#fafafa"
                                        }`}
                                    />
                                    <span
                                        className={
                                            router.pathname == "/"
                                                ? "text-[#fafafa] text-xs"
                                                : "text-white text-xs"
                                        }
                                    >
                                        Hem
                                    </span>
                                </li>
                            </Link>
                            <Link
                                href={"/searchResults"}
                                className={
                                    router.pathname == "/searchResults"
                                        ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(0%-1.1rem)] before:w-[2rem] before:h-[2px] before:bg-white before:block"
                                        : "text-white text-xs flex flex-col items-center gap-2"
                                }
                            >
                                <li className="relative flex flex-col items-center gap-1 min-[500px]:gap-2">
                                    <SearchIcon
                                        fill={`${
                                            router.pathname == "/searchResults"
                                                ? "#CB6767"
                                                : "#fafafa"
                                        }`}
                                    />
                                    <span
                                        className={
                                            router.pathname == "/searchResults"
                                                ? "text-[#fafafa] text-xs"
                                                : "text-white text-xs"
                                        }
                                    >
                                        Annonser
                                    </span>
                                </li>
                            </Link>
                            <Link
                                href={"/createItem"}
                                className="flex flex-col min-[400px]:flex-row items-center justify-center gap-1 min-[500px]:gap-2 bg-transparent min-[400px]:bg-softRed rounded-[8px] p-0 min-[400px]:py-[.7rem] mb-[.2rem] min-[400px]:px-[1rem]"
                            >
                                <AddIcon />
                                <p className="text-xs text-white">Ny annons</p>
                            </Link>
                            <Link
                                href={"/wip"}
                                className={
                                    router.pathname == "/wip"
                                        ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(0%-1.1rem)] before:w-[2rem] before:h-[2px] before:bg-white before:block"
                                        : "text-white text-xs flex flex-col items-center gap-2"
                                }
                            >
                                <li className="relative flex flex-col items-center gap-1 min-[500px]:gap-2">
                                    <NotisIcon />
                                    <span className="text-xs text-white">
                                        Notiser
                                    </span>
                                </li>
                            </Link>
                            <Link
                                href={`/profile/${id}`}
                                className={
                                    router.pathname == "/profile/[id]"
                                        ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(0%-1.1rem)] before:w-[2rem] before:h-[2px] before:bg-white before:block"
                                        : "text-white text-xs flex flex-col items-center gap-2"
                                }
                            >
                                <li className="relative flex flex-col items-center gap-1 min-[500px]:gap-2">
                                    <ProfileIcon />
                                    <span className="text-xs text-white">
                                        Profil
                                    </span>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                ) : (
                    <nav className="fixed bottom-0 bg-veryDarkBlue w-screen flex items-center z-10 justify-center py-[1rem] min-[800px]:hidden">
                        <ul className="flex justify-center items-center gap-7 min-[500px]:gap-10 w-screen px-[2rem]">
                            <Link
                                href={"/"}
                                className={
                                    router.pathname == "/"
                                        ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(0%-1.1rem)] before:w-[2rem] before:h-[2px] before:bg-white before:block"
                                        : "text-white text-xs flex flex-col items-center gap-2"
                                }
                            >
                                <li className="relative flex flex-col items-center gap-1 min-[500px]:gap-2">
                                    <HomeIcon
                                        fill={`${
                                            router.pathname == "/"
                                                ? "#fafafa"
                                                : "#fafafa"
                                        }`}
                                    />
                                    <span
                                        className={
                                            router.pathname == "/"
                                                ? "text-[#fafafa] text-xs"
                                                : "text-white text-xs"
                                        }
                                    >
                                        Hem
                                    </span>
                                </li>
                            </Link>
                            <Link
                            id="add-btn"
                                href={"/searchResults"}
                                className={
                                    router.pathname == "/searchResults"
                                        ? "flex flex-col items-center gap-2 relative before:absolute before:bottom-[calc(0%-1.1rem)] before:w-[2rem] before:h-[2px] before:bg-white before:block"
                                        : "text-white text-xs flex flex-col items-center gap-2"
                                }
                            >
                                <li className="relative flex flex-col items-center gap-1 min-[500px]:gap-2">
                                    <SearchIcon
                                        fill={`${
                                            router.pathname == "/searchResults"
                                                ? "#CB6767"
                                                : "#fafafa"
                                        }`}
                                    />
                                    <span
                                        className={
                                            router.pathname == "/searchResults"
                                                ? "text-softRed text-xs"
                                                : "text-white text-xs"
                                        }
                                    >
                                        Annonser
                                    </span>
                                </li>
                            </Link>
                            <button
                                onClick={() => signIn()}
                                className="ml-[auto] min-[450px]:ml-[0px] flex flex-row items-center justify-center gap-2 bg-softRed rounded-[8px] py-[1rem] mb-[.2rem] px-[1rem]"
                            >
                                <p className="text-xs text-white">
                                    Logga in / Registrera
                                </p>
                            </button>
                        </ul>
                    </nav>
                )}
            </Fragment>
        </Fragment>
    );
};

export default Header;
