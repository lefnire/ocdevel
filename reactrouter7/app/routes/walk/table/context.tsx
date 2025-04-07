import type {Table} from "@tanstack/react-table";
import type {Row as Product} from "~/content/treadmills/computed";
import {createContext} from "react";

type TableContext = { table: Table<Product>, dataObj: {[k: string]: Product} }
// @ts-ignore
export const TableContext = createContext<TableContext>({table: {}})