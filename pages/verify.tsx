import Image from 'next/image'
import VerifyImg from '../public/assets/verify.png'

export default function Verify() {
  return (
    <div className="h-screen flex justify-center items-center max-[800px]:mb-[-5rem]">
      <div className='w-full h-full max-w-[1920px] max-[1250px]:flex-col flex justify-center items-center max-[1500px]:gap-[5rem] gap-[15rem]'>
        <div className='flex flex-col gap-5 max-[460px]:gap-3 max-[1250px]:absolute max-[1250px]:top-[14rem] max-[800px]:top-[7rem] max-[400px]:px-4 px-8'>
          <h1 className='font-cabin text-7xl font-bold text-veryDarkBlue max-[800px]:text-5xl max-[345px]:text-4xl'>Kolla din <span className='text-softRed'>mail!</span></h1>
          <p>Vi har skickat en aktiveringslänk till din mail.<br />Kontrollera mailen och använd länken från Hyrstacken för att logga in.</p>
          <p>Ser du inte mailet? Kolla din skräppost.</p>
        </div>
        <div className='h-full flex items-end max-[1250px]:absolute'>
          <Image src={VerifyImg} alt="success" className='h-[75vh] w-auto relative max-[640px]:h-[65vh] max-[1250px]:top-[15rem] max-[800px]:top-[7rem] min-[1250px]:top-[6rem]' />
        </div>
      </div>
    </div>
  )
}