import RatingIcon from "../../assets/productPage/rating.svg";
import LocationIcon from "../../assets/productPage/location.svg";
import CalendarIcon from "../../assets/productPage/calendar.svg";
import ArrowBackIcon from "../../assets/productPage/arrowBack.svg";

const Product = () => {
  return (
    <div className=" w-full h-screen font-nunito overflow-hidden">
      <div className="h-1/2  bg-veryDarkBlue">
        <div className="absolute bg-softRed h-10 w-10 rounded-lg flex items-center justify-center top-[2%] left-[5%]">
          <ArrowBackIcon className="text-white" />
        </div>
        <img
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Shoes"
          className="object-center object-cover h-full w-full"
        />
      </div>
      <div className="w-full h-fit tablet:h-[55%] rounded-t-2xl  absolute top-[45%] bg-white overflow-y-scroll tablet:overflow-hidden">
        <div className="p-8 flex flex-col justify-evenly h-full overflow-hidden">
          <h1 className="font-bold text-2xl">Spezialized MTB - full carbon</h1>
          <p className="font-bold">
            3600 SEK<span className="font-normal">/dag</span>
          </p>
          <p className="w-[95%] text-sm py-2">
            Denna skiftnyckel är i bra kvalité och är köpt på Bauhaus för 3 år
            sedan. Har använts flitigt men funkar helt klart för ändamål som att
            skruva dit bultar med mera.
          </p>
          <div className="flex flex-col justify-between smallPhone:flex-row text-white text-sm items-center w-full py-5">
            <div className="flex w-full smallPhone:w-auto my-2 bg-veryDarkBlue rounded-3xl px-3 py-1">
              <LocationIcon className="self-center " />
              <p className="pl-1">Hisingen</p>
            </div>
            <div className="flex w-full smallPhone:w-auto my-2 bg-veryDarkBlue  rounded-3xl px-3 py-1">
              <RatingIcon className="self-center" />
              <p className="pl-1">4.5 betyg</p>
            </div>
            <div className="flex w-full smallPhone:w-auto my-2 bg-veryDarkBlue items-center rounded-3xl px-3 py-1">
              <div className="avatar">
                <div className="rounded-full w-5">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <p className="pl-1">Jesper</p>
            </div>
          </div>
          <div className="flex relative justify-between items-center pb-5">
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
          <div className="flex font-bold justify-between py-5">
            <p>Lämna:</p>
            <div className="flex">
              <CalendarIcon className="mr-2" />
              <p>2022-11-25</p>
            </div>
          </div>
          <div className="card-actions justify-center pt-5">
            <button className="btn text-white rounded-full font-bold tracking-widest w-full border-0 bg-softRed">
              Välj datum först
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
