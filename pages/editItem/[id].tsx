import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import categories from "../../components/Categories/categories";
import ItemForm from "../../components/Forms/ItemForm";
import prisma from "../../lib/prisma";

// get static paths from api
export const getStaticPaths = async () => {
    const items = await prisma.item.findMany({
        select: {
            id: true,
        },
    });

    const paths = items.map((item) => ({
        params: { id: item.id.toString() },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

// get static props from api
export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ id: string }>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const { id } = params;
    const product = await prisma.item.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            picePerDay: true,
            imageUrl: true,
            categoryId: true,
            locationId: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });

    const locations = await prisma.location.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    if (!product) {
        return {
            notFound: true,
        };
    }

    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return {
        props: {
            product,
            categories,
            locations,
        },
        revalidate: 1,
    };
};

const CreateItem: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    product,
    categories,
    locations,
}) => {
    return (
        <>
            <Head>
                <title>Hyrstacken - Skapa Annons</title>
                <meta name="description" content="Skapa en ny annons" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container max-w-2xl mx-auto font-nunito mt-[70px] min-[800px]:mt-[100px]">
                <ItemForm
                    categories={categories}
                    product={product}
                    locations={locations}
                />
            </div>
        </>
    );
};

export default CreateItem;
