import router, { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ArrowBackIcon from "../../assets/productPage/arrowBack.svg";
import { useSession } from "next-auth/react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/PrimaryButton/SecondaryButton";
import heroImg from "../../public/assets/hero-img.jpg";
import Image from "next/image";
import ProfileForm from "../Forms/ProfileForm";

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    const url = useRouter();
    const session = useSession();
    const [fireRequestModal, setFireRequestModal] = useState<boolean>(false);
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

    useEffect(() => {
        if (session && !session.data?.user?.name) setFireRequestModal(true);
        else setFireRequestModal(false);
    }, [session]);

    return (
        <>
            {fireRequestModal && id ? (
                <Fragment>
                    <Image
                        src={heroImg}
                        alt="heroImage"
                        className="object-cover object-center w-screen h-screen"
                    />
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-blackish bg-opacity-60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-8 max-w-[20rem] min-[460px]:max-w-[25rem] min-[630px]:max-w-[30rem] min-[730px]:max-w-[40rem] min-[930px]:max-w-[50rem] h-fit rounded-lg bg-white flex gap-6 max-[350px]:gap-2 flex-col justify-center items-center">
                        <h2 className="text-3xl min-[460px]:text-4xl min-[730px]:text-5xl text-center font-cabin font-bold text-softRed">
                            Halloj
                        </h2>
                        <p className="max-w-lg text-center">
                            Nu är du snart redo att använda ditt konto på
                            hyrstacken. Allt du behöver göra först är att sätta
                            prägel på din profil genom att välja ett
                            användarnamn.
                        </p>
                        <ProfileForm
                            id={id}
                            fromModal={true}
                            image={session.data?.user?.image}
                        />
                    </div>
                </Fragment>
            ) : (
                <>
                    {url.pathname !== "/" && (
                        <div
                            id="back-btn"
                            onClick={() => router.back()}
                            className="cursor-pointer absolute bg-softRed h-10 w-10 rounded-lg flex items-center justify-center top-[1.2rem] left-[1.2rem] min-[800px]:mt-[92px]"
                        >
                            <ArrowBackIcon className="text-white"/>
                        </div>
                    )}
                    {props.children}
                    <Footer />
                    <Header />
                </>
            )}
        </>
    );
};

export default Layout;
