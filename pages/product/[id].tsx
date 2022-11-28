import RatingIcon from "../../assets/productPage/rating.svg";
import LocationIcon from "../../assets/productPage/location.svg";
import CalendarIcon from "../../assets/productPage/calendar.svg";
import ArrowBackIcon from "../../assets/productPage/arrowBack.svg";
import DatePicker from "react-datepicker";
import { use, useEffect, useState } from "react";
import router from "next/router";

const Product = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateError, setDateError] = useState<boolean>();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const parsedStartDate = startDate.toISOString().split("T")[0];
  const parsedEndDate = endDate.toISOString().split("T")[0];

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (parsedStartDate >= parsedEndDate || parsedStartDate < currentDate) {
      setDateError(true);
    } else setDateError(false);
  }, [parsedStartDate, parsedEndDate]);

  const item = {
    img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    price: 3600,
    title: "Spezialized MTB - full carbon",
    description:
      "Denna skiftnyckel är i bra kvalité och är köpt på Bauhaus för 3 år sedan. Har använts flitigt men funkar helt klart för ändamål som att skruva dit bultar med mera.",
    location: "Hisingen",
    score: 4.5,
    creator: "Jesper",
    creatorPic: "https://placeimg.com/192/192/people",
  };

  const submitOrder = () => {
    console.log("start: ", parsedStartDate, " end: ", parsedEndDate);
    setOrderSubmitted(true);
  };

  return (
    <div className=" w-full h-screen font-nunito overflow-hidden laptop:flex  laptop:items-center">
      <div className="h-1/2  bg-white laptop:h-full laptop:w-[60%] laptop:flex laptop:justify-center laptop:items-center">
        <div
          onClick={() => router.back()}
          className="cursor-pointer absolute bg-softRed h-10 w-10 rounded-lg flex items-center justify-center top-[1.2rem] left-[1.2rem]"
        >
          <ArrowBackIcon className="text-white" />
        </div>
        {orderSubmitted ? (
          <div className="bg-veryDarkBlue flex flex-col justify-center items-center h-full w-full laptop:w-5/6 laptop:h-5/6 laptop:rounded-2xl">
            <h1 className="font-bold text-2xl text-white">
              Förfrågan skickad!
            </h1>
            <p className="text-center text-white w-1/2  text-sm py-2">
              Vi meddelar dig så fort annonsören svarat. Du ser alla meddelanden
              under dina notiser
            </p>
            <button className="btn border-softRed border-2 rounded-full bg-transparent mt-10 w-1/2">
              TILLBAKA HEM
            </button>
          </div>
        ) : (
          <img
            src={item.img}
            alt={item.title}
            className="object-center object-cover h-full w-full laptop:w-5/6 laptop:h-5/6 laptop:rounded-2xl "
          />
        )}
      </div>
      <div className="w-full h-fit rounded-t-2xl  absolute top-[45%] bg-white overflow-hidden laptop:relative laptop:rounded-2xl  laptop:h-5/6 laptop:w-1/3 laptop:top-0 laptop:border-veryDarkBlue/[50%] laptop:border-[1px]">
        <div className="p-8 flex flex-col justify-evenly h-full overflow-hidden">
          <h1 className="font-bold text-2xl">{item.title}</h1>
          <p className="font-bold">
            {item.price} SEK
            <span className="font-normal">/dag</span>
          </p>
          <p className="w-[95%] text-sm py-2">{item.description}</p>
          <div className="flex flex-wrap gap-x-5  smallPhone:justify-between flex-row text-white text-sm items-center w-full py-5">
            <div className="flex smallPhone:w-auto my-2 bg-veryDarkBlue rounded-3xl px-3 py-1">
              <LocationIcon className="self-center " />
              <p className="pl-1">{item.location}</p>
            </div>
            <div className="flex smallPhone:w-auto my-2 bg-veryDarkBlue  rounded-3xl px-3 py-1">
              <RatingIcon className="self-center" />
              <p className="pl-1">{item.score} betyg</p>
            </div>
            <div className="flex smallPhone:w-auto my-2 bg-veryDarkBlue items-center rounded-3xl px-3 py-1 ">
              <div className="avatar">
                <div className="rounded-full w-5">
                  <img src={item.creatorPic} />
                </div>
              </div>
              <p className="pl-1">{item.creator}</p>
            </div>
          </div>
          <div className="flex relative justify-between items-center pb-5">
            <p className="font-bold whitespace-nowrap mr-2">Boka produkt</p>
            <div className="bg-[#26324540] w-full h-px" />
          </div>

          <div className="flex w-full  font-bold justify-between">
            <p>Hämta:</p>
            <div className="flex  w-[6rem]">
              <CalendarIcon className="absolute -translate-x-5" />
              <DatePicker
                className="ml-3 cursor-pointer "
                selected={startDate}
                onChange={(date: Date) => {
                  setStartDate(date);
                }}
              />
            </div>
          </div>
          <div className="flex w-full font-bold justify-between py-5">
            <p>Lämna:</p>
            <div className="flex  w-[6rem]">
              <CalendarIcon className="absolute -translate-x-5" />
              <DatePicker
                className="ml-3 cursor-pointer "
                selected={endDate}
                onChange={(date: Date) => {
                  setTouched(true), setEndDate(date);
                }}
              />
            </div>
          </div>
          <p className="text-error text-xs">
            {touched &&
              dateError &&
              "Vänligen fyll i ett korrekt datum. Startdatum kan inte vara efter slutdatum."}
          </p>

          <div className="card-actions justify-center pt-5">
            <button
              className={`btn text-white rounded-full font-bold tracking-widest w-full border-0 bg-softRed ${
                dateError && "btn-disabled opacity-50"
              } ${
                orderSubmitted &&
                "bg-transparent border-softRed border-2 text-softRed"
              }`}
              onClick={() => submitOrder()}
            >
              {dateError
                ? "Välj datum först"
                : orderSubmitted
                ? "Avbryt förfrågan"
                : "Boka"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
