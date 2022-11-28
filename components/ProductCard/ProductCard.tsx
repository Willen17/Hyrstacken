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
  const img =
    "https://images.unsplash.com/photo-1602528190586-757f42d99447?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

  let price = "3600kr/dag";
  let location = "Hisingen";
  let rating = "4.5 Betyg";

  return (
    <div className="w-[350px] md:mx-5 py-3 justify-center items-center flex-col flex text-sm text-primary font-semibold relative self-center">
      <div className="flex bg-veryDarkBlue rounded-3xl px-2 py-4 w-24 h-7 absolute top-6 right-8 text-xs justify-center">
        <LocationIcon className="self-center" />
        <p className="pl-1 text-info font-normal self-center">{location}</p>
      </div>
      <div className="flex bg-veryDarkBlue rounded-3xl px-2 py-4 w-24 h-7 absolute top-6 left-8 text-xs justify-center">
        <RatingIcon className="self-center" />
        <p className="pl-1 text-info font-semibold self-center">{rating}</p>
      </div>
      <img
        className="w-full h-80 rounded-md"
        alt="Produktkort"
        src={item.imageUrl ?? ""}
      ></img>
      <div className="pt-2 flex flex-row justify-between w-full">
        <h2>{item.title}</h2>
        <p>{item.picePerDay}</p>
      </div>
    </div>
  );
};

export default ProductCard;
