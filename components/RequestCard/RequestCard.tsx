import { BookingStatus } from "@prisma/client";
import router from "next/router";
import SuperJSON from "superjson";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../PrimaryButton/SecondaryButton";

type Props = {
    createdAt: Date;
    itemName: string;
    startDate: Date;
    endDate: Date;
    renter: string | null;
    renterImg: string | null;
    bookingId: string;
    status: BookingStatus;
    itemId: string;
};

const RequestCard = ({
    createdAt,
    itemName,
    startDate,
    endDate,
    renter,
    status,
    bookingId,
    itemId,
}: Props) => {
    const updateStatus = (status: BookingStatus, id: string) => {
        if (!status || !id) return console.log("undefineeeeeeeeeeeed");
        const data = { status, id };
        fetch("/api/booking/updateStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: SuperJSON.stringify(data),
        })
            .then(async (data) => {
                const body = await data.json();
                console.log(body);
                data.ok && router.reload();
            })
            .catch((e) => console.log(e));
    };
    return (
        <div className="flex flex-col w-full p-4 mt-4 text-white rounded-md gap-y-4 bg-veryDarkBlue">
            <p className="text-sm">{createdAt.toISOString().split("T")[0]}</p>
            <p>Ny förfrågan</p>
            <div>
                En bokningsförfrågan på
                <span className="text-softRed"> {itemName} </span>
                har skapats från
                <span className="font-bold">
                    {" "}
                    {startDate.toISOString().split("T")[0]}{" "}
                </span>
                till
                <span className="font-bold">
                    {" "}
                    {endDate.toISOString().split("T")[0]}{" "}
                </span>
                av
                <span className="text-softRed"> {renter} </span>
                <div className="flex mt-4 gap-x-4">
                    <PrimaryButton
                        onClick={() =>
                            updateStatus(BookingStatus.ACCEPTED, bookingId)
                        }
                        small
                    >
                        Acceptera
                    </PrimaryButton>
                    <SecondaryButton
                        onClick={() =>
                            updateStatus(BookingStatus.DECLINED, bookingId)
                        }
                        small
                        white
                    >
                        Neka
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
