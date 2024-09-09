import { useContext } from "react";
import { StarterDataContext } from "../Context/Starter";

export const useStarter = () => useContext(StarterDataContext);