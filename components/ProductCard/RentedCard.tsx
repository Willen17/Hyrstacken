/* eslint-disable @next/next/no-img-element */
import Chevron from "../../public/assets/chevron.svg";

type Props = {
    bookingId: string;
    itemImage: string | null;
    itemTitle: string;
    pricePerDay: number;
    startDate: Date;
    endDate: Date;
    ownerName: string | null;
    ownerImage: string | null;
    status:
        | "PENDING"
        | "ACCEPTED"
        | "DECLINED"
        | "EXPIRED"
        | "CANCELLED"
        | "DONE";
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
    return (
        <div key={bookingId} className="relative w-full p-2">
            <span className="absolute left-0 w-full border-t border-white border-opacity-25 bottom-12" />
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
                    <p className="cursor-pointer text-softRed hover:text-hoverRed">
                        Avbryt bokning
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RentedCard;
