import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export const userDefault = {
  authenticated: false,
  user: null,
};

export const userAtom = atom({
  key: "userAtom",
  default: userDefault,
});

export const useUserState = () => useRecoilState(userAtom);

// student all courses data
export const allStudentViewCoursesDefault = [];

export const allStudentViewCoursesAtom = atom({
  key: "allStudentViewCoursesAtom",
  default: allStudentViewCoursesDefault,
});

export const useAllStudentViewCoursesState = () =>
  useRecoilState(allStudentViewCoursesAtom);

// Student view Course Details

export const studentViewCourseDetailsAtom = atom({
  key: "studentViewCourseDetailsAtom",
  default: null,
});

export const useStudentViewCourseDetailsState = () =>
  useRecoilState(studentViewCourseDetailsAtom);
