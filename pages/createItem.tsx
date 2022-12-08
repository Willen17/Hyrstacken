import { InferGetServerSidePropsType, NextPage } from "next";
import prisma from "../lib/prisma";
import ItemForm from "../components/Forms/ItemForm";
import Head from "next/head";

export async function getServerSideProps() {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    const locations = await prisma.location.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    return {
        props: {
            categories,
            locations,
        },
    };
}

const CreateItem: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ categories, locations }) => {
    return (
        <>
            <Head>
                <title>Hyrstacken - Skapa Annons</title>
                <meta name="description" content="Skapa en ny annons" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container max-w-2xl mx-auto font-nunito mt-[70px] min-[800px]:mt-[100px]">
                <ItemForm categories={categories} locations={locations} />
            </div>
        </>
    );
};

export default CreateItem;
