/* eslint-disable @next/next/no-img-element */



const SmallProductCard = ({item}: any) => {
  

  return (
    <>
      <div className="p-2 cursor-pointer">
        <div className="flex gap-4 p-2 text-white rounded-md bg-veryDarkBlue">
            <img className="object-cover w-24 overflow-hidden rounded-lg aspect-square" src={item.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="" />
          <div className="self-center flex-grow">
            <p>{item.title}</p>
            <p>{item.picePerDay}</p>
            <div>
            <div className="flex items-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="6" fill="#E37E7E"/>
              <path d="M6.01562 7.8324C5.84896 7.8324 5.71875 7.79516 5.625 7.72067C5.54167 7.64618 5.48958 7.5419 5.46875 7.40782L5.09375 2.73743C5.07292 2.51397 5.14062 2.3352 5.29687 2.20112C5.45312 2.06704 5.69271 2 6.01562 2C6.31771 2 6.54687 2.06704 6.70312 2.20112C6.85937 2.3352 6.92187 2.51397 6.89062 2.73743L6.51563 7.40782C6.50521 7.5419 6.45312 7.64618 6.35937 7.72067C6.27604 7.79516 6.16146 7.8324 6.01562 7.8324ZM6.01562 10C5.71354 10 5.46875 9.93296 5.28125 9.79888C5.09375 9.6648 5 9.49348 5 9.28492C5 9.07635 5.09375 8.90875 5.28125 8.78212C5.46875 8.64804 5.71354 8.58101 6.01562 8.58101C6.31771 8.58101 6.55729 8.64804 6.73437 8.78212C6.91146 8.90875 7 9.07635 7 9.28492C7 9.49348 6.91146 9.6648 6.73437 9.79888C6.55729 9.93296 6.31771 10 6.01562 10Z" fill="#FAFAFA"/>
              </svg>
              <span className="ml-1">Tillfälligt uthyrd</span>
            </div>
            </div>
          </div>
          <svg className="self-center mr-7" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.98483 8.83278L8.83301 7.9846L0.848405 -3.49018e-07L0.000230752 0.848173L7.13538 7.98333L0.000125224 15.1186L0.848299 15.9668L7.98356 8.8315L7.98483 8.83278Z" fill="#FAFAFA"/>
          </svg>
        </div>
      </div>
    </>
  )
}

export default SmallProductCard