"use client";

import { Flex, Input } from "antd";
import Title from "antd/es/typography/Title";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  params: URLSearchParams;
}

export const FilterComponent: React.FC<IProps> = ({ params }) => {
  const router = useRouter();

  const url = usePathname();
  const nparams = new URLSearchParams(params);

  const handleFilterChange = (newFilterBy: string) => {
    nparams.set("filterBy", newFilterBy);
    nparams.set("page", "1");

    router.push(`${url}?${nparams.toString()}`);
  };
  return (
    <Flex gap={4}>
      <Title level={5} style={{ whiteSpace: "nowrap" }}>
        Фильтр:
      </Title>
      <Input
        type="text"
        defaultValue={nparams.get("filterBy") || ""}
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder="Введите название товара"
      />
    </Flex>
  );
};
