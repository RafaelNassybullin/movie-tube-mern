import { Container, CardWrapper } from "styles";
import { FilterCard } from "components/FilterCard";
import { MainTitle } from "styles";
import { IPaginate } from "interface";
import { PaginateBtn } from "components/PaginateBtn";
import { FC } from "react";

interface IContentProps {
  datas: IPaginate;
  videoId?: string;
  title?: string;
  route?: string;
}

export const Content: FC<IContentProps> = ({
  datas,
  videoId,
  title,
  route,
}) => {
  return (
    <section>
      <Container>
        {!!datas.docs.length && <MainTitle>{title}</MainTitle>}
        {!datas.docs.length && (
          <h1 style={{ color: "black" }}>
            По запросу <span style={{ color: "crimson" }}>{title}</span> ничего
            не найдено
          </h1>
        )}
        <CardWrapper>
          {!!datas.docs.length && (
            <FilterCard datas={datas.docs} videoId={videoId} />
          )}
        </CardWrapper>
        <PaginateBtn data={datas} route={route} />
      </Container>
    </section>
  );
};
