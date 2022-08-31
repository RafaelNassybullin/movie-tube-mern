import Link from "next/link";
import { Card } from "components/Card";
import { IMovieData } from "../interface";

interface IFilteredCardProps {
  datas: IMovieData[];
  videoId?: string;
}

export const FilterCard = ({ datas, videoId }: IFilteredCardProps) => {
  return (
    <>
      {datas.map((data) => {
        if (data._id !== videoId) {
          return (
            <Link key={data._id} href={`/video/${data._id}`}>
              <a>
                <Card data={data} />
              </a>
            </Link>
          );
        }
      })}
    </>
  );
};
