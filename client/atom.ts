import { atom } from "recoil";
import { Hospital } from "./types/hospital";
import { User } from "./types/user";

export const userState=atom<User | null>({
  key:"user",
  default:null;
})

export const selectedHospitalState = atom<Hospital | null>({
  key: "selectedHospital",
  default: null,
});
