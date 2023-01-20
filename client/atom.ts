import { atom } from "recoil";
import { Hospital } from "./types/hospital";

export const selectedHospitalState = atom<Hospital | null>({
  key: "selectedHospital",
  default: null,
});
