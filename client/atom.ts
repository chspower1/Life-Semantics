import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Hospital } from "./types/hospital";
import { Reservation } from "./types/reservation";
import { User } from "./types/user";
const { persistAtom } = recoilPersist();

export const userAtom = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const selectedHospitalAtom = atom<Hospital | null>({
  key: "selectedHospital",
  default: null,
});
export const selectedReservationAtom = atom<Reservation | null>({
  key: "selectedReservation",
  default: null,
});
