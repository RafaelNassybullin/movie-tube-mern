import Head from "next/head";
import { IPaginate } from "../interface";
import { useRouter } from "next/router";
import { Navigation } from "components/Navigation";
import { Content } from "components/Content";
import { Footer } from "styles";

interface IParams {
  params: { id: string };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API}/movieData?page=1&limit=12`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECURE}`,
    },
  });

  const data: IPaginate = await res.json();

  const paths: IParams[] = [];

  Array(data.totalDocs)
    .fill("*")
    .map((_, x) => paths.push({ params: { id: `${x + 1}` } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: IParams) {
  const id = context.params.id;

  const res = await fetch(
    `${process.env.API}/movieData?page=${id}&limit=${process.env.ITEM_LIMIT}`,
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

interface IMainIDpageProps {
  datas: IPaginate;
}

export default function MainIDpage({ datas }: IMainIDpageProps) {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MovieTube - Watch top movies</title>
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
        <link rel="canonical" href={`${process.env.CLIENT}${query.id}`}></link>
        <meta name="application-name" content="movie" />
      </Head>

      <Navigation />

      <Content datas={datas} route={"/"} title={"watch movies"} />

      <Footer />
    </>
  );
}
