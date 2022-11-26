import type { NextPage, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      category: {
        select: { name: true },
      },
    },
  });
  return {
    props: {
      results: items,
    },
  };
}

const SearchResults: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return <div className="">
    <h1 className=" font-nunito text-4xl">Annonser</h1>
    <div className="flex flex-wrap gap-2">
    {
      props.results.map((result) => {
        return (
          <div key={result.id} className="card w-96 bg-lightGray shadow-xl">
            {/* {result.imageUrl && <Image src={result.imageUrl as string} alt={result.title} width={300} height={300} />} */}
            <div className="card-body">
              <h2 className="card-title">{result.title}</h2>
              <p>{result.description}</p>
            <div className=" card-actions justify-end">
              <div className=" badge badge-outline">{result.category.name}</div>
            </div>
            </div>
          </div>
        )
      })
    }
    </div>
  </div>;
};

export default SearchResults;
