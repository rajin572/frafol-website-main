"use client";
import { ChangeEvent, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormInstance } from "antd";

const SEARCH_DEBOUNCE_MS = 300;

/**
 * A search box whose text lives in the URL (`?search=`), which the server page reads to fetch.
 *
 * Two things made the old per-component copies behave strangely while typing:
 *  1. The URL → input sync wrote the URL's text back into the box. The URL is always a step behind
 *     what has been typed (debounce, then the server round trip), so typing "evento" could jump
 *     back to "even" and lose the last letters. The box is now left alone until the URL has caught
 *     up with what the visitor typed.
 *  2. The debounce function was created again on every render, so every render had its own timer
 *     and a quick typist could fire several navigations. There is now one timer.
 */
export const useUrlSearch = (
  form: FormInstance,
  { resetPage = false }: { resetPage?: boolean } = {}
) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // What the visitor last typed and the URL has not shown yet; null when the URL is up to date.
  const typedAhead = useRef<string | null>(null);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    typedAhead.current = text;
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      // Read the URL when the timer fires, so params changed meanwhile (tab, filters) are kept.
      const params = new URLSearchParams(window.location.search);
      const before = params.toString();
      if (text) {
        params.set("search", text);
        if (resetPage) params.set("page", "1");
      } else {
        params.delete("search");
      }

      if (params.toString() === before) {
        typedAhead.current = null;
        return;
      }

      startTransition(() => {
        replace(`${pathName}?${params.toString()}`, { scroll: false });
      });
    }, SEARCH_DEBOUNCE_MS);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const urlText = searchParams.get("search") ?? "";
  useEffect(() => {
    if (typedAhead.current !== null) {
      // The box is ahead of the URL: never overwrite what is being typed.
      if (urlText === typedAhead.current) typedAhead.current = null;
      return;
    }
    // Back / forward, a reset button or a link changed the URL: show it in the box.
    if ((form.getFieldValue("search") ?? "") !== urlText) {
      form.setFieldsValue({ search: urlText });
    }
  }, [urlText, form]);

  return { onSearchChange, isPending };
};

export default useUrlSearch;
