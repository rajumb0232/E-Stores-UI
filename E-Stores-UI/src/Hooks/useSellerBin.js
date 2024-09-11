import { useContext } from "react";
import { SellerBinContext } from "../Context/SellerBin";

export const useSellerBin = () => useContext(SellerBinContext);