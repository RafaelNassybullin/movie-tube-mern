import { VideoPlayer } from "components/VideoPlayer";
import Head from "next/head";
import { Navigation } from "components/Navigation";
import { Content } from "components/Content";
import { Footer } from "styles";
import { IPromo, IMovieData, IPaginate } from "interface";

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

  const playlistResponce = await fetch(
    `${process.env.API}/random/${data.category}?page=1&limit=${process.env.ITEM_LIMIT}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECURE}`,
      },
    }
  );

  const playlist = await playlistResponce.json();

  return {
    props: {
      video: data,
      playlist,
    },
    revalidate: 10,
  };
}

interface IVideoProps {
  video: IMovieData;
  playlist: IPaginate;
}

export default function Video({ video, playlist }: IVideoProps) {
  const randomLikes = Math.floor(Math.random() * 25000) + 1;

  const secondsToDuration = (seconds: any) => {
    let duration = "PT";
    let remainder: any = seconds;

    const designations: any = [
      ["D", 86400],
      ["H", 3600],
      ["M", 60],
      ["S", 1],
    ];

    designations.forEach(([sign, seconds]: any) => {
      const value = Math.floor(remainder / seconds);
      remainder = remainder % seconds;

      if (value) {
        duration += `${value}${sign}`;
      }
    });

    if (duration === "PT") {
      duration = "PT0S";
    }

    return duration;
  };

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={video.description} />
        <link type="image/png" sizes="420x420" rel="icon" href="/favicon.png" />
        <meta charSet="utf-8" />
        <meta name="keywords" content={video.metatags} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`${process.env.CLIENT}video/${video._id}`}
        />
        <meta name="application-name" content="movie" />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={video.description} />
        <meta
          property="og:url"
          content={`${process.env.CLIENT}video/${video._id}`}
        />
        <meta
          property="og:video"
          content={`${process.env.CLIENT}player/${video._id}`}
        />
        <meta property="og:site_name" content="movie" />
        <meta property="og:image" content={video.poster} />
        <meta
          property="video:duration"
          content={`${video.duration
            .split(":")
            .reduce((acc, time) => 60 * +acc + time)}`}
        />
        <meta
          property="ya:ovs:upload_date"
          content={new Date(+video.date).toLocaleDateString("en-CA")}
        />
        <meta property="ya:ovs:likes" content={`${randomLikes}`} />
        <meta property="ya:ovs:views_total" content={video.views} />
        <meta property="ya:ovs:quality" content="HD" />
        <meta property="video:tag" content={video.metatags} />
        <meta property="ya:ovs:content_url" content={video.urlvideo} />
        <meta property="video:actor" content={video.category} />
        <meta property="ya:ovs:person" content={video.category} />
        <meta property="ya:ovs:status" content="published" />
        <meta property="ya:ovs:available_platform" content="Desktop" />
        <meta property="ya:ovs:available_platform" content="Mobile" />
        <meta property="ya:ovs:person:role" content="Actor" />
        <meta property="og:type" content="video.other" />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="ya:ovs:adult" content="true" />
        <meta property="ya:ovs:allow_embed" content="true" />
        <meta property="ya:ovs:comments" content="0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: video.title,
              description: video.description,
              thumbnailUrl: video.poster,
              playerType: "HTML5",
              uploadDate: `${new Date(+video.date).toLocaleDateString(
                "en-CA"
              )}`,
              url: `${process.env.CLIENT}video/${video._id}`,
              duration: `${secondsToDuration(
                video.duration
                  .split(":")
                  .reduce((acc, time) => 60 * +acc + time)
              )}`,
              isFamilyFriendly: "false",
              embedUrl: `${process.env.CLIENT}player/${video._id}`,
              interactionStatistic: [
                {
                  "@type": "InteractionCounter",
                  interactionType: {
                    "@type": "https://schema.org/LikeAction",
                  },
                  userInteractionCount: `${randomLikes}`,
                },
                {
                  "@type": "InteractionCounter",
                  interactionType: {
                    "@type": "https://schema.org/WatchAction",
                  },
                  userInteractionCount: video.views,
                },
              ],
              thumbnail: {
                "@type": "ImageObject",
                contentUrl: video.poster,
                width: "800",
                height: "450",
              },
              keywords: video.metatags,
              contentUrl: video.urlvideo,
              actors: [
                {
                  "@type": "Person",
                  name: video.category,
                },
              ],
            }),
          }}
        />
      </Head>

      <Navigation />

      <VideoPlayer video={video} />

      <Content datas={playlist} videoId={video._id} />

      <Footer />
    </>
  );
}
