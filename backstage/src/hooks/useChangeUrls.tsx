"use client";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent } from "react";
import { useCallback } from "react";
import useDebounce from "./useDebounce";

const useChangeUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const debounce = useDebounce();

  // Ambil params dari window.location.search
  const getCurrentParams = () => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };

  const currentParams = getCurrentParams();

  const currentLimit = currentParams.get("limit") || String(LIMIT_DEFAULT);
  const currentPage = currentParams.get("page") || String(PAGE_DEFAULT);
  const currentSearch = currentParams.get("search") || "";
  const currentCategory = currentParams.get("category") || "";
  const currentIsOnline = currentParams.get("isOnline") || "";
  const currentIsFeatured = currentParams.get("isFeatured") || "";

  // helper buat update URL
  const setParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const params = getCurrentParams();

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;
      const currentUrl = `${pathname}${window.location.search}`;

      if (newUrl !== currentUrl) {
        router.replace(newUrl);
      }
    },
    [pathname, router]
  );

  // URL updater utama
  const setUrl = useCallback(() => {
    setParams({
      limit: currentLimit || LIMIT_DEFAULT,
      page: currentPage || PAGE_DEFAULT,
      search: currentSearch || "",
    });
  }, [setParams, currentLimit, currentPage, currentSearch]);

  const setUrlExplore = useCallback(() => {
    setParams({
      limit: currentLimit || LIMIT_DEFAULT,
      page: currentPage || PAGE_DEFAULT,
      category: currentCategory || "",
      isOnline: currentIsOnline || "",
      isFeatured: currentIsFeatured || "",
    });
  }, [
    setParams,
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  ]);

  // Handlers
  const handleChangePage = (page: number) => {
    setParams({ page });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    setParams({ limit: selectedLimit, page: PAGE_DEFAULT });
  };

  const handleChangeCategory = (category: string) => {
    setParams({ category, page: PAGE_DEFAULT });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    setParams({ isOnline, page: PAGE_DEFAULT });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    setParams({ isFeatured, page: PAGE_DEFAULT });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    debounce(() => {
      setParams({ search, page: PAGE_DEFAULT });
    }, DELAY);
  };

  const handleClearSearch = () => {
    setParams({ search: "", page: PAGE_DEFAULT });
  };

  const isParamsReady = !!currentLimit && !!currentPage;

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,

    setUrl,
    setUrlExplore,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,

    isParamsReady,
  };
};

export default useChangeUrl;
