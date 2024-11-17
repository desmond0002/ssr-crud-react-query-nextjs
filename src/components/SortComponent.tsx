"use client";

import { Flex, Select } from "antd";
import Title from "antd/es/typography/Title";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  params: URLSearchParams;
}

export const SortComponent: React.FC<IProps> = ({ params }) => {
  const router = useRouter();
  const nparams = new URLSearchParams(params);
  const url = usePathname();
  const handleSortChange = (newSortBy: string) => {
    nparams.set("sortBy", newSortBy);
    router.push(`${url}?${nparams.toString()}`);
  };
  return (
    <Flex gap={4}>
      <Title level={5}>Сортировка:</Title>
      <Select
        defaultValue={nparams.get("sortBy") || "ASC"}
        onChange={handleSortChange}
        options={[
          { value: "ASC", label: "По возрастанию цены" },
          { value: "DESC", label: "По убыванию цены" },
        ]}
      />
    </Flex>
  );
};
