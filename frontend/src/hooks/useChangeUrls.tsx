"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import useDebounce from "./useDebounce";

const SEARCH_DELAY = 300; // delay 300ms

const useSearchUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  // ambil current search
  const currentSearch = searchParams.get("search") || "";

  // helper untuk update URL
  const setSearchParam = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!search) {
      params.delete("search");
    } else {
      params.set("search", search);
    }

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      router.replace(newUrl);
    }
  };

  // Handler input search dengan debounce
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    debounce(() => setSearchParam(search), SEARCH_DELAY); // ✅ delay ditambahkan
  };

  // Handler clear search
  const handleClearSearch = () => {
    setSearchParam("");
  };

  return {
    currentSearch,
    handleSearch,
    handleClearSearch,
  };
};

export default useSearchUrl;
