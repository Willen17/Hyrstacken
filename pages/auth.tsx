import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import {
    getCsrfToken,
    getProviders,
    getSession,
    signIn,
    ClientSafeProvider,
} from "next-auth/react";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import Logo from '../public/assets/logo-blk.png'

export async function getServerSideProps(context: NextPageContext) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders();
    const csrfToken = await getCsrfToken({ req });

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            providers,
            csrfToken,
        },
    };
}

const Auth: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers, csrfToken }) => {
    return (
        <div className="h-screen flex items-center justify-center max-[460px]:px-4 max-[530px]:px-8 max-[800px]:pb-[6rem] max-[800px]:pt-[3rem] min-[800px]:pt-[6rem]">
            <div className="h-full max-w-[30rem] max-h-[55rem] flex flex-col justify-between py-8">
                <Image src={Logo} alt="logotyp" className="relative left-1/2 translate-x-[-50%]" />
                <div className="flex flex-col gap-8 min-[400px]:gap-16">
                    <div>
                        <h1 className="font-nunito font-bold text-3xl flex-grow text-veryDarkBlue">Välkommen!</h1>
                        <p>Logga in / Registrera dig här nedanför.</p>
                    </div>
                    <form method="post" action="/api/auth/signin/email" className="form-control flex flex-col gap-8 min-[400px]:gap-16">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <label htmlFor="email" className="input-group-vertical flex flex-col gap-2">
                            <span className="text-sm font-text-sm font-semibold font-nunito ml-1">Email</span>
                            <input className="input rounded-md input-bordered" id="email" name="email" type="text" placeholder="mailadress@exempel.se"/>
                            <p className="font-nunito font-light mt-2">Hyrstacken är lösenordsfritt. Klicka på länken från Hyrstacken som skickas till din mail efteråt för att logga in. Kolla din skräppost!</p>
                        </label>
                        <button type="submit" className="w-full bg-softRed rounded-md py-4 hover:bg-hoverRed font-bold font-nunito text-white">Logga in / Registrera</button>
                    </form>
                    { providers && Object.values(providers).map((provider) => {
                        if(provider.name === "Email") {
                            return null;
                        }
                        return (
                        <div key={provider.name}>
                            <button className="btn" onClick={() => signIn(provider.id, {callbackUrl: `${window.location.origin}`})}>
                            Sign in with {provider.name}
                            </button>
                        </div>
                        )
                    })}
                </div>
                <p className="text-center text-sm font-light">Genom att logga in / registrera dig så accepterar du våra allmäna användarvillkor</p>
            </div>
        </div>
  );
};

export default Auth;
