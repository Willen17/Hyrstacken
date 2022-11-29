import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Hyrstacken - Profilsida</title>
        <meta name="description" content="Profilsida" />
      </Head>

      <div className="container max-w-2xl mx-auto font-nunito">
        <div className="p-2 mt-5">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="44" height="44" rx="9.5" fill="#E37E7E" stroke="#E37E7E"/>
          <path d="M21.3868 31.6445L13.3355 23.8227C13.2135 23.7042 13.1269 23.5758 13.0756 23.4376C13.0252 23.2993 13 23.1512 13 22.9932C13 22.8351 13.0252 22.687 13.0756 22.5487C13.1269 22.4105 13.2135 22.2821 13.3355 22.1636L21.3868 14.3419C21.6105 14.1246 21.8898 14.0108 22.2249 14.0005C22.5608 13.9911 22.8507 14.1048 23.0947 14.3419C23.3387 14.5591 23.466 14.8305 23.4765 15.156C23.4863 15.4823 23.3692 15.764 23.1252 16.001L17.1477 21.8081H30.7801C31.1257 21.8081 31.4157 21.9214 31.6499 22.1482C31.8833 22.3757 32 22.6574 32 22.9932C32 23.3289 31.8833 23.6102 31.6499 23.837C31.4157 24.0645 31.1257 24.1783 30.7801 24.1783H17.1477L23.1252 29.9853C23.3488 30.2026 23.466 30.4791 23.4765 30.8149C23.4863 31.1507 23.3692 31.4272 23.1252 31.6445C22.9016 31.8815 22.6169 32 22.2713 32C21.9256 32 21.6308 31.8815 21.3868 31.6445Z" fill="#FAFAFA"/>
        </svg>
        </div>
        <div className="flex h-24 gap-4 p-2 mt-5">
          <img className="object-contain rounded-lg " src="https://scontent.fgse1-1.fna.fbcdn.net/v/t1.18169-9/10468068_754035597969135_5397732734853413913_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=e6HWbmiHtI8AX_U28Zu&_nc_ht=scontent.fgse1-1.fna&oh=00_AfACPcRIoTp4kwKp2K9HDImCpu3bXa01cylf7HgpIdBZyQ&oe=63AD9524" alt="" />
          <div className="self-center flex-1">
            <h1 className="text-2xl font-extrabold">Wille Luring</h1>
            <span>Medlem Sedan 2022</span>
          </div>
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="44" height="44" rx="9.5" fill="#E37E7E" stroke="#E37E7E"/>
          <g clip-path="url(#clip0_286_181)">
          <path d="M24.1667 12.5C24.464 12.5003 24.75 12.6142 24.9663 12.8183C25.1825 13.0225 25.3126 13.3014 25.33 13.5983C25.3475 13.8951 25.2509 14.1874 25.06 14.4155C24.8692 14.6435 24.5984 14.79 24.3032 14.8252L24.1667 14.8333H14.8333V31.1667H31.1667V21.8333C31.167 21.536 31.2809 21.25 31.485 21.0337C31.6891 20.8175 31.9681 20.6874 32.265 20.67C32.5618 20.6525 32.8541 20.7491 33.0821 20.94C33.3102 21.1308 33.4567 21.4016 33.4918 21.6968L33.5 21.8333V31.1667C33.5002 31.7553 33.2779 32.3223 32.8776 32.754C32.4773 33.1856 31.9287 33.45 31.3417 33.4942L31.1667 33.5H14.8333C14.2447 33.5002 13.6777 33.2779 13.246 32.8776C12.8144 32.4773 12.55 31.9287 12.5058 31.3417L12.5 31.1667V14.8333C12.4998 14.2447 12.7221 13.6777 13.1224 13.246C13.5227 12.8144 14.0713 12.55 14.6583 12.5058L14.8333 12.5H24.1667ZM31.4502 12.9002C31.6601 12.6909 31.9418 12.5694 32.2381 12.5604C32.5344 12.5514 32.823 12.6554 33.0453 12.8515C33.2677 13.0475 33.407 13.3208 33.4351 13.6159C33.4632 13.911 33.378 14.2057 33.1967 14.4402L33.0998 14.551L21.5498 26.0998C21.3399 26.3091 21.0582 26.4306 20.7619 26.4396C20.4656 26.4486 20.177 26.3446 19.9547 26.1485C19.7323 25.9525 19.593 25.6792 19.5649 25.3841C19.5368 25.089 19.622 24.7943 19.8033 24.5598L19.9002 24.4502L31.4502 12.9002Z" fill="#FAFAFA"/>
          </g>
          <defs>
          <clipPath id="clip0_286_181">
          <rect width="28" height="28" fill="white" transform="translate(9 9)"/>
          </clipPath>
          </defs>
          </svg>

        </div>
      <div className="relative flex items-center justify-between px-2 pb-5 mt-10">
        <p className="mr-2 font-bold whitespace-nowrap">
          Aktiva Annonser {" "}
          {/* get total ads by user */}
        <span>(7)</span>
        </p>
        <div className="bg-[#26324540] w-full h-px" />
      </div>
      {/* List max 5 ads by user */}
      {/* small ad card, link to ad */}
      <div className="p-2 ">
        <div className="flex h-24 gap-4 p-2 text-white rounded-md bg-veryDarkBlue">
            <img className="object-contain rounded-md" src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
          <div className="flex-grow ">
            <p>Spezialized MTB - Full Carbon</p>
            <p>3600kr/dag</p>
            <p>
            <div className="flex items-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="6" fill="#E37E7E"/>
              <path d="M6.01562 7.8324C5.84896 7.8324 5.71875 7.79516 5.625 7.72067C5.54167 7.64618 5.48958 7.5419 5.46875 7.40782L5.09375 2.73743C5.07292 2.51397 5.14062 2.3352 5.29687 2.20112C5.45312 2.06704 5.69271 2 6.01562 2C6.31771 2 6.54687 2.06704 6.70312 2.20112C6.85937 2.3352 6.92187 2.51397 6.89062 2.73743L6.51563 7.40782C6.50521 7.5419 6.45312 7.64618 6.35937 7.72067C6.27604 7.79516 6.16146 7.8324 6.01562 7.8324ZM6.01562 10C5.71354 10 5.46875 9.93296 5.28125 9.79888C5.09375 9.6648 5 9.49348 5 9.28492C5 9.07635 5.09375 8.90875 5.28125 8.78212C5.46875 8.64804 5.71354 8.58101 6.01562 8.58101C6.31771 8.58101 6.55729 8.64804 6.73437 8.78212C6.91146 8.90875 7 9.07635 7 9.28492C7 9.49348 6.91146 9.6648 6.73437 9.79888C6.55729 9.93296 6.31771 10 6.01562 10Z" fill="#FAFAFA"/>
              </svg>
              <span className="ml-1">Tillfälligt uthyrd</span>
            </div>
            </p>
          </div>
          <svg className="self-center mr-7" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.98483 8.83278L8.83301 7.9846L0.848405 -3.49018e-07L0.000230752 0.848173L7.13538 7.98333L0.000125224 15.1186L0.848299 15.9668L7.98356 8.8315L7.98483 8.83278Z" fill="#FAFAFA"/>
          </svg>
        </div>
      </div>


      </div>
    </>
  )
}

export default ProfilePage;
