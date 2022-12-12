/* eslint-disable @next/next/no-img-element */
import { BookingStatus } from "@prisma/client";
import Chevron from "../../public/assets/chevron.svg";
import Waiting from "../../public/assets/waiting.svg";
import Confirmed from "../../public/assets/confirmed.svg";
import router from "next/router";

type Props = {
    bookingId: string;
    itemImage: string | null;
    itemTitle: string;
    pricePerDay: number;
    startDate: Date;
    endDate: Date;
    ownerName: string | null;
    ownerImage: string | null;
    status: BookingStatus;
};
const RentedCard = ({
    bookingId,
    itemImage,
    itemTitle,
    pricePerDay,
    startDate,
    endDate,
    ownerName,
    ownerImage,
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
            <div className="flex flex-col flex-grow gap-4 p-2 text-white rounded-md bg-veryDarkBlue">
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
                        <div className="flex justify-between w-2/3">
                            <p className="text-sm">{pricePerDay} kr/dag</p>
                            <p className="text-sm">
                                Totalt:
                                <span className="font-bold">
                                    {" "}
                                    {pricePerDay} * dagar
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-between w-2/3 text-sm font-light">
                            <p>{startDate.toISOString().split("T")[0]}</p>
                            <p>-</p>
                            <p>{endDate.toISOString().split("T")[0]}</p>
                        </div>
                    </div>

                    <Chevron className="self-center mr-7 fill-white" />
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-x-2">
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
                    {status === BookingStatus.PENDING && (
                        <p
                            className="cursor-pointer text-softRed hover:text-hoverRed"
                            onClick={() => deleteBooking(bookingId)}
                        >
                            Avbryt bokning
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RentedCard;
