import React, { useEffect, useState } from "react";
import { useGetAllPostsQuery } from "../../features/apiSlice";
import { Link } from "react-router-dom";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList, ListOnScrollProps } from "react-window";
import { ICombinedInterface } from "../../types/types";

import styles from "./styles.module.css";

const RenderList = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(3545);
  const [pageList, setPageList] = useState<ICombinedInterface[]>([]);

  const { data } = useGetAllPostsQuery();

  useEffect(() => {
    setTotalItems(() => (Array.isArray(data) ? data.length : 0));
    setPageList(() => (Array.isArray(data) ? data : []));
  }, [data]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = pageList[index];
    const text =
      "№" + item.id + " Title: " + item.title + ". Body: " + item.body;
    const isLongText = text.length > 170;
    const shortText = isLongText ? text.slice(0, 152) + "..." : text;

    return (
      <div style={style} className={styles.row}>
        <p>{shortText}</p>
        {isLongText && (
          <Link to={`/post/${item.id}`} className={styles.read__more}>
            <div className={styles.read__more_text}>Просмотр</div>
          </Link>
        )}
      </div>
    );
  };

  const loadMoreItems = async () => {
    if (Array.isArray(data)) {
      setTotalItems((prevTotalItems) => prevTotalItems + data.length);
      setPageList((prevstate) => [...prevstate, ...data]);
    }
  };
  const handleScroll: (props: ListOnScrollProps) => any = (e) => {
    const { scrollDirection, scrollOffset } = e;
    if (scrollDirection === "forward") {
      if (scrollOffset > 0 && scrollOffset >= offset) {
        setOffset((prevstate) => prevstate + 2500);
        loadMoreItems();
      }
    }
  };
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          onScroll={handleScroll}
          height={height}
          width={width}
          itemCount={totalItems}
          itemSize={40}
          onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
            if (
              visibleStartIndex !== startIndex ||
              visibleStopIndex !== endIndex
            ) {
              setStartIndex(visibleStartIndex);
              setEndIndex(visibleStopIndex);
            }
          }}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default RenderList;
