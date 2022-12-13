import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import SecondaryButton from "../components/PrimaryButton/SecondaryButton";
import DeskImg from '../public/assets/404-desk.png'
import MobImg from '../public/assets/404-mob.png'

export default function Curstom404() {
  const route = useRouter()

  return (
    <Fragment>
      <div className="h-[calc(100vh-6rem)] min-[460px]:h-[calc(100vh-10rem)] min-[800px]:h-[calc(100vh-3rem)] flex items-end overflow-x-hidden">
        <Image src={DeskImg} alt="404 image" className="h-auto w-full object-bottom hidden min-[460px]:block" />
        <Image src={MobImg} alt="404 image" className="h-auto w-full object-bottom hidden max-[460px]:block" />
        <div className="absolute top-[6rem] md:top-1/4 px-4 min-md:px-8 sm:left-[10%] flex flex-col justify-start gap-3">
          <h1 className="font-cabin text-4xl min-[380px]:text-5xl min-[640px]:text-6xl min-[860px]:text-7xl font-bold text-softRed max-w-3xl">Oops,<br />vi är visst vilse...</h1>
          <p className="max-w-md mb-5"><strong className="text-softRed">Error 404</strong> - Sidan du letar efter verkar tyvärr inte existera. Kontrollera gärna din url eller gå tillbaka via länken.</p>
          <SecondaryButton onClick={() => route.push('/')}>Ta mig tillbaka</SecondaryButton>
        </div>
      </div>
      <div className="h-[5rem] min-[460px]:h-[8rem] min-[550px]:h-[11.5rem] mb-[-12rem] min-[1025px]:mb-[-8rem] w-full bg-[#E37E7E]" />
    </Fragment>
  )
}