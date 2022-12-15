/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import {
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
} from "next/types";
import { useEffect, useState } from "react";
import LocationIcon from "../../assets/productPage/location.svg";
import RatingIcon from "../../assets/productPage/rating.svg";
import BookingForm from "../../components/Forms/BookingForm";
import Loader from "../../components/Loader/Loader";
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
        fallback: "blocking",
    };
};

// get static props from api
export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ id: string }>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const { id } = params;
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
            category: {
                select: {
                    name: true,
                },
            },
            location: {
                select: {
                    name: true,
                },
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product,
        },
        revalidate: 1,
    };
};

const Product: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    product,
}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [touched, setTouched] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const [id, setId] = useState<string>();
    const [bookingId, setBookingId] = useState<string>();

    const ownItem = id === product.owner.id;

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

    const deleteItem = async (itemId: string) => {
        fetch(`/api/items/delete/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (data) => {
                const deletedItem = await data.json();
                router.push(`/profile/${id}`);
            })
            .catch((e) => console.log(e));
    };

    const cancelOrder = async () => {
        setIsCanceling(true);
        console.log(bookingId, "boknings di");
        if (!bookingId) return console.log("!!!!!");
        fetch(`/api/booking/${bookingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (data) => {
                const deletedBooking = await data.json();
                router.reload();
            })
            .catch((e) => console.log(e));
    };

    return (
        <>
            <Head>
                <title>{`Hyrstacken - Annons ${product.title}`}</title>
                <meta name="description" content={`Annonssida för ${product.title}`} />
            </Head>

        <div className="w-full h-screen overflow-hidden font-nunito min-[800px]:flex min-[800px]:items-center min-[800px]:mt-[92px] ">
            <div className="h-1/2  bg-white min-[800px]:h-full min-[800px]:w-[60%] min-[800px]:flex min-[800px]:justify-center min-[800px]:items-center">
                {orderSubmitted ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-veryDarkBlue min-[800px]:w-5/6 min-[800px]:h-5/6 min-[800px]:rounded-2xl">
                        <h1 className="text-2xl font-bold text-white">
                            Förfrågan skickad!
                        </h1>
                        <p className="w-1/2 py-2 text-sm text-center text-white">
                            Vi meddelar dig så fort annonsören svarat. Du ser
                            alla meddelanden under dina notiser
                        </p>
                        <button onClick={() => router.push("/")} className="w-1/2 mt-10 bg-transparent border-2 rounded-full btn border-softRed">
                            TILLBAKA HEM
                        </button>
                    </div>
                ) : (
                    <img
                        src={
                            product.imageUrl ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt={product.title}
                        className="object-cover object-center w-full h-full min-[800px]:w-5/6 min-[800px]:h-5/6 min-[800px]:rounded-2xl "
                    />
                )}
            </div>
            <div className="w-full h-fit rounded-t-2xl  absolute top-[45%] bg-white overflow-hidden min-[800px]:relative min-[800px]:rounded-2xl  min-[800px]:h-5/6 min-[800px]:w-1/3 min-[800px]:top-0 min-[800px]:border-veryDarkBlue/[50%] min-[800px]:border-[1px]">
                <div className="flex flex-col h-full p-8 overflow-hidden">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="font-bold">
                        {product.picePerDay} kr
                        <span className="font-normal">/dag</span>
                    </p>
                    <p className="w-[95%] text-sm py-2">
                        {product.description}
                    </p>
                    <div className="flex flex-row flex-wrap items-center w-full py-5 text-sm text-white gap-x-5 ">
                        <div className="flex px-3 py-1 my-2 bg-veryDarkBlue rounded-3xl">
                            <LocationIcon className="self-center " />
                            <p className="pl-1">{product.location.name}</p>
                        </div>
                        <div className="flex px-3 py-1 my-2 bg-veryDarkBlue rounded-3xl">
                            <RatingIcon className="self-center" />
                            <p className="pl-1">{4.5} betyg</p>
                        </div>
                        <Link href={`/profile/${product.owner.id}`} id="profile-link">
                            <div className="flex items-center px-3 py-1 my-2 bg-veryDarkBlue rounded-3xl ">
                                <div className="avatar">
                                    <div className="w-5 rounded-full">
                                        <img
                                            alt="Profile picture"
                                            src={
                                                product.owner.image ||
                                                "https://placeimg.com/192/192/people"
                                            }
                                        />
                                    </div>
                                </div>
                                <p className="pl-1">
                                    {product.owner.name || "Anonym användare"}
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="pb-5 mt-auto">
                        <p className="mr-2 font-bold whitespace-nowrap">
                            {ownItem
                                ? "Ändra annons"
                                : orderSubmitted
                                ? "Väntar på svar från uthyrare"
                                : "Boka produkt"}
                        </p>
                        <div className="bg-[#26324540] w-full h-px" />
                    </div>

                    {ownItem ? (
                        <div>
                            <div className="justify-center pt-5 card-actions">
                                <button
                                    className={`btn rounded-full font-bold tracking-widest w-full bg-transparent border-softRed border-2 text-softRed `}
                                    onClick={() =>
                                        router.push(`/editItem/${product.id}`)
                                    }
                                >
                                    Redigera annons
                                </button>
                            </div>
                            <div className="justify-center pt-5 card-actions">
                                <button
                                    className={`btn text-white rounded-full font-bold tracking-widest w-full border-0 bg-softRed `}
                                    onClick={() => deleteItem(product.id)}
                                >
                                    Ta bort annons
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {id && !orderSubmitted ? (
                                <BookingForm
                                    itemId={product.id}
                                    userId={id}
                                    orderSubmitted={setOrderSubmitted}
                                    setBookingId={setBookingId}
                                />
                            ) : orderSubmitted ? (
                                <>
                                {!isCanceling ? (
                                    <div className="justify-center pt-5 card-actions">
                                        <button
                                            className={`btn rounded-full font-bold tracking-widest w-full bg-transparent border-softRed border-2 text-softRed `}
                                            onClick={() => cancelOrder()}
                                        >
                                            Avbryt förfrågan
                                        </button>
                                    </div>
                                ) : (
                                    <Loader />)}
                                </>
                            ) : (
                                "Logga in för att boka"
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Product;
