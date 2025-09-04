import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args) {
  return twMerge(clsx(...args));
}
