import { useForm } from "react-hook-form";
import { itemSchema } from "../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { InferGetServerSidePropsType, NextPage } from "next";
import prisma from "../lib/prisma";
import ItemForm from "../components/Forms/ItemForm";
import Head from "next/head";

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    }
  });
  return {
    props: {
      categories,
    },
  };
};

const CreateItem: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({categories}) => {
  

  return (
    <>
      <Head>
        <title>Hyrstacken - Skapa Annons</title>
        <meta name="description" content="Skapa en ny annons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className="container mx-auto">
        <div className="flex w-full items-center">
          <h1 className="p-4 font-bold">Skapa Din Annons</h1>
          <span className="flex-grow border-t border-dashed border-veryDarkBlue opacity-25"></span>
        </div>
        <ItemForm categories={categories} />    
      </div>
    </>   
  );
};

export default CreateItem;
