import ProductCard from "../components/ProductCard/ProductCard";

const Test = () => {
  return (
    <div className="h-screen flex justify-center items-center text-8xl text-blue-500 flex-col">
      {/* <div>
        <p className="font-nunito font-extralight">
          Låna verktyg istället för att köpa nytt
        </p>
      </div> */}
      <ProductCard />
    </div>
  );
};

export default Test;
