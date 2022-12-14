/* eslint-disable @next/next/no-img-element */
import Chevron from "/public/assets/chevron.svg";

const SmallProductCard = ({ item }: any) => {
    return (
        <>
            <div className="w-full p-2 cursor-pointer">
                <div className="flex gap-4 p-2 text-white rounded-md bg-veryDarkBlue">
                    <img
                        className="object-cover w-24 overflow-hidden rounded-lg aspect-square"
                        src={
                            item.imageUrl ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt=""
                    />
                    <div className="self-center flex-grow">
                        <p>{item.title}</p>
                        <p className="text-sm">{item.picePerDay} kr/dag</p>
                    </div>
                    <Chevron className="self-center mr-7 fill-white" />
                </div>
            </div>
        </>
    );
};

export default SmallProductCard;
