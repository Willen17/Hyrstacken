import type { NextPage, InferGetServerSidePropsType } from "next";
import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      title: true,
      description: true,
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
    <h1>Items</h1>
    {
      props.results.map((result) => {
        return (
          <div key={result.id} className="">
            <h2>{result.title}</h2>
            <p>{result.description}</p>
            <p>{result.category.name}</p>
          </div>
        )
      })
    }
  </div>;
};

export default SearchResults;
