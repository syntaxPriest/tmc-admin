import {
    useState,
    useEffect,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
  } from "react";
  import ResponsivePagination from "react-responsive-pagination";
  // import "react-responsive-pagination/themes/classic.css";
//   import { Filters } from "../pages/properties/search";
  
  
  interface Props<T extends object> {
    children?: ReactNode;
    data?: T[];
    itemsPerPage: number;
    pageCount?: number;
    fetchPageData?: any;
    state?: string | null | undefined;
    totalItems?: number;
    page?: any;
    activeType?: string;
    activeGroup?: string;
    q?: string;
    sellerId?: string | number | null | undefined;
    status?: string;
    setPage?: Dispatch<SetStateAction<number | undefined>>;
    setData?: Dispatch<SetStateAction<Array<Object>>>;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    setDisplayedItems?: Dispatch<SetStateAction<T[] | undefined>>;
  }
  export const Paginate = <T extends object>({
    children,
    itemsPerPage,
    data,
    pageCount,
    // setDisplayedItems,
    page,
    setPage,
  }: Props<T>) => {
    const [itemOffset, setItemOffset] = useState(0);
  
    const endOffset = itemOffset + itemsPerPage;
  
    // useEffect(() => {
    //   if (data.length) {
    //     const currentItems = data.slice(itemOffset, endOffset);
    //     setDisplayedItems(currentItems);
    //   }
    // }, [itemOffset, data.length]);
  
    // Invoke when user click to request another page.
    const changePage = (event: any) => {
      setPage && setPage(event);
    };
  
    const customPageCount = pageCount ? Math.ceil(pageCount) : 0;
  
    return (
      <>
        <ResponsivePagination
          current={page}
          total={customPageCount}
          pageLinkClassName="page-link"
          className="pagination"
          pageItemClassName="page-item"
          activeItemClassName="page-active"
          disabledItemClassName="my-disabled"
          previousLabel="&#10140;"
          nextLabel="&#10140;"
          previousClassName="prevButton"
          nextClassName="nextButton"
          onPageChange={(newPage: number) => {
            changePage(newPage);
            window.scroll(0, 0);
          }}
        />
      </>
    );
  };
  
  const PrevLabel = ({ page, setPage }: any) => {
    return (
      <button
        className="flex items-center py-4"
        onClick={() => {
          if (page > 1) {
            setPage((page: number) => page - 1);
          }
        }}
      >
        Previous
      </button>
    );
  };
  const NextLabel = ({ page, setPage, totalItems }: any) => {
    return (
      <button
        className="flex items-center py-4 rounded-full"
        onClick={() => {
          if (page < totalItems) {
            setPage((page: number) => page + 1);
          }
        }}
      >
        Next
      </button>
    );
  };
  