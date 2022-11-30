/* eslint-disable @next/next/no-img-element */
import router from "next/router";
import { GetStaticProps, NextPage } from "next/types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ArrowBackIcon from "../../assets/productPage/arrowBack.svg";
import CalendarIcon from "../../assets/productPage/calendar.svg";
import LocationIcon from "../../assets/productPage/location.svg";
import RatingIcon from "../../assets/productPage/rating.svg";
import prisma from "../../lib/prisma";

// get static paths from api
export const getStaticPaths = async () => {
    const items = await prisma.item.findMany({
        select: {
            id: true,
        },
    });

    const paths = items.map((item) => ({
        params: { id: item.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
};

// get static props from api

type Product = {
    id: number;
    title: string;
    description: string;
    picePerDay: number;
    imageUrl: string;
    ownerId: string;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const product = await prisma.item.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            picePerDay: true,
            imageUrl: true,
            ownerId: true,
        },
    });
    return {
        props: {
            product,
        },
    };
};

const Product: NextPage<{ product: Product }> = ({ product }) => {
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
        <div className="w-full h-screen overflow-hidden font-nunito min-[900px]:flex min-[900px]:items-center">
            <div className="h-1/2  bg-white min-[900px]:h-full min-[900px]:w-[60%] min-[900px]:flex min-[900px]:justify-center min-[900px]:items-center">
                <div
                    onClick={() => router.back()}
                    className="cursor-pointer absolute bg-softRed h-10 w-10 rounded-lg flex items-center justify-center top-[1.2rem] left-[1.2rem]"
                >
                    <ArrowBackIcon className="text-white" />
                </div>
                {orderSubmitted ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-veryDarkBlue min-[900px]:w-5/6 min-[900px]:h-5/6 min-[900px]:rounded-2xl">
                        <h1 className="text-2xl font-bold text-white">
                            Förfrågan skickad!
                        </h1>
                        <p className="w-1/2 py-2 text-sm text-center text-white">
                            Vi meddelar dig så fort annonsören svarat. Du ser
                            alla meddelanden under dina notiser
                        </p>
                        <button className="w-1/2 mt-10 bg-transparent border-2 rounded-full btn border-softRed">
                            TILLBAKA HEM
                        </button>
                    </div>
                ) : (
                    <img
                        src={product.imageUrl || item.img}
                        alt={product.title}
                        className="object-cover object-center w-full h-full min-[900px]:w-5/6 min-[900px]:h-5/6 min-[900px]:rounded-2xl "
                    />
                )}
            </div>
            <div className="w-full h-fit rounded-t-2xl  absolute top-[45%] bg-white overflow-hidden min-[900px]:relative min-[900px]:rounded-2xl  min-[900px]:h-5/6 min-[900px]:w-1/3 min-[900px]:top-0 min-[900px]:border-veryDarkBlue/[50%] min-[900px]:border-[1px]">
                <div className="flex flex-col h-full p-8 overflow-hidden justify-evenly">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="font-bold">
                        {product.picePerDay} SEK
                        <span className="font-normal">/dag</span>
                    </p>
                    <p className="w-[95%] text-sm py-2">
                        {product.description}
                    </p>
                    <div className="flex flex-row flex-wrap items-center w-full py-5 text-sm text-white gap-x-5 ">
                        <div className="flex px-3 py-1 my-2 bg-veryDarkBlue rounded-3xl">
                            <LocationIcon className="self-center " />
                            <p className="pl-1">{item.location}</p>
                        </div>
                        <div className="flex px-3 py-1 my-2 bg-veryDarkBlue rounded-3xl">
                            <RatingIcon className="self-center" />
                            <p className="pl-1">{item.score} betyg</p>
                        </div>
                        <div className="flex items-center px-3 py-1 my-2 bg-veryDarkBlue rounded-3xl ">
                            <div className="avatar">
                                <div className="w-5 rounded-full">
                                    <img
                                        alt="Profile picture"
                                        src={item.creatorPic}
                                    />
                                </div>
                            </div>
                            <p className="pl-1">{item.creator}</p>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-between pb-5">
                        <p className="mr-2 font-bold whitespace-nowrap">
                            Boka produkt
                        </p>
                        <div className="bg-[#26324540] w-full h-px" />
                    </div>

                    <div className="flex justify-between w-full font-bold">
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
                    <div className="flex justify-between w-full py-5 font-bold">
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
                    <p className="text-xs text-error">
                        {touched &&
                            dateError &&
                            "Vänligen fyll i ett korrekt datum. Startdatum kan inte vara efter slutdatum."}
                    </p>

                    <div className="justify-center pt-5 card-actions">
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
