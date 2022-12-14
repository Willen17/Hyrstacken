/* eslint-disable @next/next/no-img-element */

import { BookingStatus } from "@prisma/client";
import Chevron from "../../public/assets/chevron.svg";
import Waiting from "../../public/assets/waiting.svg";
import Confirmed from "../../public/assets/confirmed.svg";
import router from "next/router";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
    bookingId: string;
    itemId: string;
    itemImage: string | null;
    itemTitle: string;
    pricePerDay: number;
    startDate: Date;
    endDate: Date;
    ownerName: string | null;
    ownerImage: string | null;
    ownerId: string;
    status: BookingStatus;
};
const RentedCard = ({
    bookingId,
    itemId,
    itemImage,
    itemTitle,
    pricePerDay,
    startDate,
    endDate,
    ownerName,
    ownerImage,
    ownerId,
    status,
}: Props) => {
    const deleteBooking = async (bookingId: string) => {
        fetch(`/api/booking/${bookingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (data) => {
                const deletedItem = await data.json();
                router.reload();
            })
            .catch((e) => console.log(e));
    };

    const daysBetween = (startDate: Date, endDate: Date) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(
            Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
        );
        return diffDays;
    };

    const daysLeft = (endDate: Date) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        const diffDays = Math.round(
            Math.abs((today.getTime() - endDate.getTime()) / oneDay)
        );
        return diffDays;
    };

    return (
        <div key={bookingId} className="relative w-full p-2">
            <span className="absolute left-0 w-full border-t border-white border-opacity-25 bottom-12" />
            {status !== BookingStatus.DECLINED && (
                <div className="flex items-center mb-4 gap-x-2">
                    {status === BookingStatus.PENDING ? (
                        <Waiting className="w-6 h-6" />
                    ) : (
                        <Confirmed className="w-6 h-6" />
                    )}

                    <p>
                        {status === BookingStatus.PENDING
                            ? "Inväntar bokningsbekräftelse"
                            : "Aktiv bokning"}
                    </p>
                </div>
            )}
            <div className="flex flex-col flex-grow gap-4 p-2 pr-4 text-white rounded-md bg-veryDarkBlue">
                <Link href={`/product/${itemId}`}>
                    <div className="flex justify-between w-full cursor-pointer gap-x-4">
                        <img
                            className="object-cover w-24 h-24 overflow-hidden rounded-lg aspect-square"
                            src={
                                itemImage ||
                                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                            }
                            alt=""
                        />
                        <div className="flex flex-col flex-grow gap-y-2">
                            <p className="font-bold">{itemTitle}</p>
                            <div className="flex justify-between w-2/3 max-[490px]:flex-col">
                                <p className="text-sm">{pricePerDay} kr/dag</p>
                                <p className="text-sm">
                                    Totalt:
                                    <span className="font-bold">
                                        {" "}
                                        {pricePerDay *
                                            daysBetween(startDate, endDate)}
                                        {" kr"}
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-wrap text-sm font-light ">
                                <p>{startDate.toISOString().split("T")[0]}</p>
                                <p className="px-2">-</p>
                                <p>{endDate.toISOString().split("T")[0]}</p>
                            </div>
                        </div>
                        <Chevron className="self-center shrink-0 fill-white" />
                    </div>
                </Link>
                <Link href={`/profile/${ownerId}`}>
                    <div className="flex justify-between">
                        <div className="flex text-sm gap-x-2">
                            <p>
                                Uthyres av{" "}
                                <span className="font-bold">{ownerName}</span>
                            </p>
                            <div className="avatar">
                                <div className="w-5 rounded-full">
                                    <img
                                        alt="Profile picture"
                                        src={
                                            ownerImage ||
                                            "https://placeimg.com/192/192/people"
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {status === BookingStatus.PENDING ? (
                            <p
                                className="cursor-pointer text-softRed hover:text-hoverRed"
                                onClick={() => deleteBooking(bookingId)}
                            >
                                Avbryt bokning
                            </p>
                        ) : (
                            <>
                                {daysLeft(endDate) > 0 ? (
                                    <p className="self-center text-sm">
                                        Dagar kvar: {daysLeft(endDate)}
                                    </p>
                                ) : (
                                    <p className="self-center text-sm">
                                        Uthyrning slut
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RentedCard;
