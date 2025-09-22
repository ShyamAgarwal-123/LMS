import { atom, useRecoilState } from "recoil";

export const sideBarAtom = atom({
  key: "sideBarAtom",
  default: false,
});

export const useSideBarState = () => useRecoilState(sideBarAtom);
