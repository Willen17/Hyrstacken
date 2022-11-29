/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import LocationIcon from "../../assets/location.svg";
import RatingIcon from "../../assets/rating.svg";

type ProductCardProps = {
    item: {
        title: string;
        id: string;
        description: string;
        imageUrl: string | null;
        picePerDay: number;
        category: { name: string };
    };
};

const ProductCard = ({ item }: ProductCardProps) => {
    const [imgSrc, setImgSrc] = useState(item.imageUrl);

    let location = "Hisingen";
    let rating = "4.5 Betyg";

    return (
        <div className="w-[340px] max-[370px]:w-[310px] md:m-4 py-3 justify-center items-center flex-col flex text-sm text-primary font-semibold relative self-center">
            <div className="flex bg-veryDarkBlue rounded-3xl px-2 py-4 w-24 h-7 absolute top-6 right-8 text-xs justify-center">
                <LocationIcon className="self-center" />
                <p className="pl-1 text-info font-normal self-center">
                    {location}
                </p>
            </div>
            <div className="flex bg-veryDarkBlue rounded-3xl px-2 py-4 w-24 h-7 absolute top-6 left-8 text-xs justify-center">
                <RatingIcon className="self-center" />
                <p className="pl-1 text-info font-semibold self-center">
                    {rating}
                </p>
            </div>
            <img
                className="w-full h-80 rounded-md"
                alt="Produktkort"
                src={imgSrc ?? ""}
                onError={() =>
                    setImgSrc(
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    )
                }
            ></img>
            <div className="pt-2 flex flex-row justify-between w-full">
                <h2>{item.title}</h2>
                <p>{item.picePerDay}/dag</p>
            </div>
        </div>
    );
};

export default ProductCard;
