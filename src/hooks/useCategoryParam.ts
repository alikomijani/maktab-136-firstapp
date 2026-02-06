import { useSearchParams } from "react-router";
import { validateCategory } from "../utils/category";
import { useCallback } from "react";

export default function useCategoryParam(): [
  string | undefined,
  (category: string | undefined) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = validateCategory(searchParams.get("category")); // xss attack
  const setCategory = useCallback((category: string | undefined) => {
    category = validateCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({ category: "" });
    }
  }, []);
  return [category, setCategory];
}
