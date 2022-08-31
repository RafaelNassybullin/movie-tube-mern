import styled from "styled-components";
import Head from "next/head";
import Script from "next/script";
import { IMovieData } from "interface";

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API}/movieData`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECURE}`,
    },
  });

  const data = await res.json();

  const paths = data.map((item: IMovieData) => {
    return {
      params: { id: item._id.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const id = context.params.id;

  const res = await fetch(`${process.env.API}/movieData/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECURE}`,
    },
  });

  const data = await res.json();

  const vastLinkResponce = await fetch(`${process.env.API}/sponsorVastLink`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECURE}`,
    },
  });

  const vastLink = await vastLinkResponce.json();

  return {
    props: {
      video: data,
      vastLink,
    },
    revalidate: 10,
  };
}

interface IPlayerPage {
  video: any;
  vastLink: string;
}

export default function PlayerPage({ video, vastLink }: IPlayerPage) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{video.title}</title>
        <meta
          name="description"
          content={`${video.description}, portal, hd, free, tube, videos, search`}
        />
        <meta
          name="keywords"
          content={`${video.metatags}, portal, hd, free, tube, videos, search`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link type="image/png" sizes="420x420" rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href={`${process.env.CLIENT}player/${video._id}`}
        ></link>
        <meta name="application-name" content="movie" />
      </Head>

      <Script
        id={`${Math.floor(Math.random() * 5000) + 1}`}
        src={"../plyr.min.js"}
        onLoad={() => {
          //@ts-ignore
          new Plyr("#player", {
            ads: {
              enabled: true,
              tagUrl: vastLink[0].link,
            },
          });
        }}
      />

      <VideoWrapper>
        <video
          id="player"
          poster={video.poster}
          src={video.urlvideo}
          preload="none"
          controls
        ></video>
      </VideoWrapper>
    </>
  );
}

const VideoWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: -80px;
`;
