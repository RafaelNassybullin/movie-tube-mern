import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Navigation } from "components/Navigation";
import { Content } from "components/Content";
import { Footer } from "styles";
import { IPaginate } from "interface";

export async function getServerSideProps({ query }: any) {
  const page = query.page || 1;

  const categoryResponce = await fetch(
    `${process.env.API}/movieData/categories/${query.id}?page=${page}&limit=${process.env.ITEM_LIMIT}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECURE}`,
      },
    }
  );

  const categoryData = await categoryResponce.json();
  return { props: { categoryData } };
}

interface ICategoryPageProps {
  categoryData: IPaginate;
}

export default function CategoryPage({ categoryData }: ICategoryPageProps) {
  const router = useRouter();
  const query: any = router.query;

  if (!query.page) {
    query.page = 1;
  }

  useEffect(() => {
    if (
      Number(categoryData.page) > categoryData.totalPages ||
      query.page == 0
    ) {
      router.push("/");
    }
  }, [query.page]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Movie - category {query.id}</title>
        <meta
          name="description"
          content={`${query.id}, portal, hd, free, tube, videos, search`}
        />
        <meta
          name="keywords"
          content={`${query.id}, portal, hd, free, tube, videos, search`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link type="image/png" sizes="420x420" rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href={`${process.env.CLIENT}category/${query.id}`}
        ></link>
        <meta name="application-name" content="movie" />
      </Head>

      <Navigation />

      <Content
        datas={categoryData}
        route={`/category/${query.id}?page=`}
        title={query.id}
      />

      <Footer />
    </>
  );
}
