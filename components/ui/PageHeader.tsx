"use client";

import { Heading } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import type { FC } from "react";

const pathToTitle: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/profiel": "Profiel",
  "/dashboard/instellingen": "Instellingen",
};

const PageHeader: FC = () => {
  const pathname = usePathname();
  const title = pathToTitle[pathname] || "Pagina";

  return (
    <Heading size="lg" mb={6}>
      {title}
    </Heading>
  );
};

export default PageHeader;