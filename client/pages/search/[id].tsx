import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Navigation } from "components/Navigation";
import { Content } from "components/Content";
import { Footer } from "styles";
import { IPaginate } from "interface";

export async function getServerSideProps({ query }: any) {
  const page = query.page || 1;

  const res = await fetch(
    `${process.env.API}/searchDatas/${query.id}?page=${page}&limit=${process.env.ITEM_LIMIT}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECURE}`,
      },
    }
  );

  const searchData = await res.json();

  return { props: { searchData } };
}

interface ISearchProps {
  searchData: IPaginate;
}

export default function Search({ searchData }: ISearchProps) {
  const router = useRouter();
  const query: any = router.query;

  if (!query.page) {
    query.page = 1;
  }

  useEffect(() => {
    if (Number(searchData.page) > searchData.totalPages || query.page == 0) {
      router.push("/");
    }
  }, [query.page]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{query.id} - found videos</title>
        <meta
          name="description"
          content="Find the videos and clips, realy hight quality."
        />
        <meta
          name="keywords"
          content={`${query.id}, portal, hd, free, tube, videos, search`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`${process.env.CLIENT}search/${query.id}`}
        />
        <link type="image/png" sizes="420x420" rel="icon" href="/favicon.png" />
        <meta name="application-name" content="movie" />
      </Head>

      <Navigation />

      <Content
        datas={searchData}
        route={`/search/${query.id}?page=`}
        title={query.id}
      />

      <Footer />
    </>
  );
}
