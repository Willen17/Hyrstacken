import RatingIcon from "../assets/productPage/rating.svg";
import LocationIcon from "../assets/productPage/location.svg";
import CalendarIcon from "../assets/productPage/calendar.svg";

const Product = () => {
  return (
    <div className=" w-screen h-screen font-nunito overflow-hidden">
      <div className="h-1/2 w-screen bg-veryDarkBlue">
        <img
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Shoes"
          className="object-center object-cover h-full w-full"
        />
      </div>
      <div className="w-full  h-[55%] rounded-t-2xl  absolute top-[45%] bg-white">
        <div className="p-5 flex flex-col justify-evenly h-full">
          <h1 className="font-bold text-2xl">Spezialized MTB - full carbon</h1>
          <p className="font-bold">
            3600 SEK<span className="font-normal">/dag</span>
          </p>
          <p className="w-[90%] text-sm">
            Denna skiftnyckel är i bra kvalité och är köpt på Bauhaus för 3 år
            sedan. Har använts flitigt men funkar helt klart för ändamål som att
            skruva dit bultar med mera.
          </p>
          <div className="flex justify-between flex-wrap text-white text-sm items-center w-full">
            <div className="flex bg-veryDarkBlue rounded-3xl px-3 py-1">
              <LocationIcon className="self-center " />
              <p className="pl-1">Hisingen</p>
            </div>
            <div className="flex bg-veryDarkBlue  rounded-3xl px-3 py-1">
              <RatingIcon className="self-center" />
              <p className="pl-1">4.5 betyg</p>
            </div>
            <div className="flex bg-veryDarkBlue items-center rounded-3xl px-3 py-1">
              <div className="avatar">
                <div className="rounded-full w-5">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <p className="pl-1">Jesper</p>
            </div>
          </div>
          <div className="flex relative justify-between items-center">
            <p className="font-bold whitespace-nowrap mr-2">Boka produkt</p>
            <div className="bg-[#26324540] w-full h-px" />
          </div>

          <div className="flex font-bold justify-between">
            <p>Hämta:</p>
            <div className="flex">
              <CalendarIcon className="mr-2" />
              <p>2022-11-25</p>
            </div>
          </div>
          <div className="flex font-bold justify-between">
            <p>Lämna:</p>
            <div className="flex">
              <CalendarIcon className="mr-2" />
              <p>2022-11-25</p>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
