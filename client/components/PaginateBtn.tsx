import { IPaginate } from "interface";
import Link from "next/link";
import { Button } from "styles";

interface IPaginateBtnProps {
  data: IPaginate;
  route?: string;
}

export const PaginateBtn = ({ data, route }: IPaginateBtnProps) => {
  return (
    <>
      {data.page === data.totalPages ? (
        ""
      ) : (
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        <Link href={`${route}${Number(data.page) + 1}`}>
          <a>
            <Button>Next page...</Button>
          </a>
        </Link>
      )}
    </>
  );
};
