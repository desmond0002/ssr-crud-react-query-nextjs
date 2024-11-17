"use client";

import { Pagination, PaginationProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  params: URLSearchParams;
  totalCount: number;
}

export const PaginationComponent: React.FC<IProps> = ({
  totalCount,
  params,
}) => {
  const router = useRouter();

  const nparams = new URLSearchParams(params);

  const url = usePathname();
  const page = nparams.get("page") || "1";
  const limit = nparams.get("limit") || "10";

  const setLimit = (value: string) => {
    nparams.set("limit", value);
    router.push(`${url}?${nparams.toString()}`);
  };
  const getQuery = (value: string) => {
    nparams.set("page", value);
    return nparams.toString();
  };
  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    if (!isNaN(page)) router.push(`${url}?${getQuery(page.toString())}`);
    setLimit(pageSize.toString());
  };
  return (
    <Pagination
      defaultCurrent={parseInt(page)}
      defaultPageSize={parseInt(limit)}
      onChange={onChange}
      total={totalCount}
      pageSize={parseInt(limit)}
      pageSizeOptions={[1, 5, 10]}
      showSizeChanger={true}
    />
  );
};
