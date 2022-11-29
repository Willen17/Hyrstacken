import { InferGetServerSidePropsType, NextPage } from "next";
import prisma from "../lib/prisma";
import ItemForm from "../components/Forms/ItemForm";
import Head from "next/head";
import AddIcon from "../assets/add.svg";

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return {
    props: {
      categories,
    },
  };
}

const CreateItem: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Hyrstacken - Skapa Annons</title>
        <meta name="description" content="Skapa en ny annons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen flex flex-col justify-between items-center font-nunito">
        <h1 className="font-bold text-2xl text-veryDarkBlue">
          Skapa ny annons
        </h1>
        <div className="bg-veryDarkBlue rounded-md text-center h-28 w-28 flex flex-col items-center justify-center -translate-x-10">
          <AddIcon />
          <p className="text-[#FAFAFA] text-sm pt-2">Annonsbild</p>
        </div>
        <ItemForm categories={categories} />
      </div>
    </>
  );
};

export default CreateItem;
