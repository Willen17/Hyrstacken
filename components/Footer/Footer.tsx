import Logo from "../../public/assets/logo.png";
import BackgroundImg from "../../public/assets/footer-bgr.png";
import InstaIcon from "../../public/assets/insta.svg";
import TikTokIcon from "../../public/assets/tiktok.svg";
import FbIcon from "../../public/assets/fb.svg";
import Image from "next/image";
import { Fragment, useState } from "react";
import Link from "next/link";

interface FooterLinks {
    title: string;
    links: {
        title: string;
        href: string;
    }[];
}

const footerLinks: FooterLinks[] = [
    {
        title: "Cirkulär Ekonomi",
        links: [
            {
                title: "Vad är det?",
                href: "/wip",
            },
            {
                title: "Hållbarhet",
                href: "/wip",
            },
            {
                title: "Framtiden",
                href: "/wip",
            },
            {
                title: "C2C",
                href: "/wip",
            },
        ],
    },
    {
        title: "Företag",
        links: [
            {
                title: "Om oss",
                href: "/wip",
            },
            {
                title: "Vår vision",
                href: "/wip",
            },
            {
                title: "Varför oss?",
                href: "/wip",
            },
            {
                title: "Kontakta oss",
                href: "/wip",
            },
        ],
    },
    {
        title: "Så funkar det",
        links: [
            {
                title: "Konsument",
                href: "/wip",
            },
            {
                title: "Annonsör",
                href: "/wip",
            },
            {
                title: "Villkor",
                href: "/wip",
            },
            {
                title: "Säkerhet",
                href: "/wip",
            },
        ],
    },
    {
        title: "Länkar",
        links: [
            {
                title: "Skapa annons",
                href: "/createItem",
            },
            {
                title: "Visa produkter",
                href: "/searchResults",
            },
            {
                title: "Min profil",
                href: "/profile",
            },
            {
                title: "Hjälp",
                href: "/wip",
            },
        ],
    },
];

const Footer = () => {
    const [isInput, setIsInput] = useState(false);
    return (
        <div className="relative bottom-0 flex lg:flex-col justify-center h-[1300px] lg:h-[700px]">
            <Image
                src={BackgroundImg}
                alt="train and mountain"
                className="absolute top-0 left-0 object-cover object-top h-[100%]"
            />
            <div className="absolute w-full max-w-[1234px] top-[56%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 flex flex-col gap-[4rem] px-[2rem] md:px-[4rem]">
                <Image src={Logo} alt="logotype" />
                <div className="flex justify-between flex-col gap-[3rem] lg:flex-row">
                    <ul className="text-white flex flex-col gap-[2rem] lg:flex-row lg:gap-[5rem]">
                        {footerLinks.map((link, index) => (
                            <Fragment key={index}>
                                <div className="flex flex-col gap-1">
                                    <li className="font-bold">{link.title}</li>
                                    <ul className="flex flex-col">
                                        {link.links.map(
                                            (deepLink, deepIndex) => (
                                                <Link
                                                    className="text-lg font-light"
                                                    key={deepIndex}
                                                    href={deepLink.href}
                                                >
                                                    {deepLink.title}
                                                </Link>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </Fragment>
                        ))}
                    </ul>
                    <div className="flex flex-col text-white">
                        <p className="font-bold mb-[.4rem]">Anmäl nyhetsbrev</p>
                        <label>
                            <input
                                type="text"
                                placeholder="John@Example.com"
                                className="bg-transparent border-b-[1px] w-[15rem] text-lg text-light focus:outline-none"
                                onFocus={() => setIsInput(true)}
                                onBlur={() => setIsInput(false)}
                            />
                            <button
                                type="button"
                                className="border-b-[1px] text-lg"
                            >
                                Anmäl
                            </button>
                            {isInput && <p className="text-sm text-error">Vad kul att du vill prenumerera på vårt nyhetsbrev. Det är dock ännu inte implementerat!</p>}
                        </label>
                    </div>
                </div>
                <div className="flex justify-between text-white">
                    <p>&copy; Hyrstacken AB 2022</p>
                    <div className="flex items-center gap-3">
                        <a href="#">
                            <FbIcon />
                        </a>
                        <a href="#">
                            <TikTokIcon />
                        </a>
                        <a href="#">
                            <InstaIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
