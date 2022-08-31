import Head from "next/head";
import { IPaginate } from "../interface";
import { NextRouter, useRouter } from "next/router";
import { Navigation } from "components/Navigation";
import { Content } from "components/Content";
import { Footer } from "styles";

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.API}/movieData?page=1&limit=${process.env.ITEM_LIMIT}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECURE}`,
      },
    }
  );

  const datas: IPaginate = await res.json();

  return {
    props: {
      datas,
    },
    revalidate: 10,
  };
}

interface IHomeProps {
  datas: IPaginate;
}

export default function Home({ datas }: IHomeProps) {
  const router: NextRouter = useRouter();
  const query: any = router.query;

  if (!query.page) {
    query.page = 1;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MovieTube - Watch Movie</title>
        <meta
          name="description"
          content={`top, portal, hd, free, tube, videos, search`}
        />
        <meta
          name="keywords"
          content={`top, hd, free, tube, videos, search`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link type="image/png" sizes="420x420" rel="icon" href="/favicon.png" />
        <link rel="canonical" href={`${process.env.CLIENT}`}></link>
        <meta name="application-name" content="movie" />
      </Head>

      <Navigation />

      <Content datas={datas} route={"/"} title={"watch movies"} />

      <Footer />
    </>
  );
}