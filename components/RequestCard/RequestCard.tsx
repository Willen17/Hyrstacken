import SearchIcon from "../../assets/search.svg";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../PrimaryButton/SecondaryButton";

type Props = {
    createdAt: string;
    itemName: string;
    startDate: string;
    endDate: string;
    renter: string;
};

const RequestCard = ({
    createdAt,
    itemName,
    startDate,
    endDate,
    renter,
}: Props) => {
    return (
        <div className="flex flex-col w-full p-4 mt-4 text-white rounded-md gap-y-4 bg-veryDarkBlue">
            <p className="text-sm">{createdAt}</p>
            <p>Ny förfrågan</p>
            <div>
                En bokningsförfrågan på
                <span className="text-softRed"> {itemName} </span>
                har skapats från
                <span className="font-bold"> {startDate} </span>
                till
                <span className="font-bold"> {endDate} </span>
                av
                <span className="text-softRed"> {renter} </span>
                <div className="flex mt-4 gap-x-4">
                    <PrimaryButton small>Acceptera</PrimaryButton>
                    <SecondaryButton small white>
                        Neka
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
