import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import _ from "lodash";

import {
  courseLandingPageDefault,
  languageOptions,
  courseLevelOptions,
  courseLandingPageFormFields,
  courseCategories,
} from "./courseLandingingPage";

import { courseCurriculumDefault } from "./courseCurriculum";
import {
  createCourseLandingPageService,
  updateCourseLandingPageService,
} from "@/service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Course Landing Page

export const courseLandingPageAtom = atom({
  key: "courseLandingPageAtom",
  default: courseLandingPageDefault,
});

export const useCourseLandingPageState = () =>
  useRecoilState(courseLandingPageAtom);

export const useCourseLandingPage = () => {
  const [courseLandingPageState, setCourseLandingPageState] =
    useCourseLandingPageState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = await createCourseLandingPageService(courseLandingPageState);
    if (data.success) {
      navigate(`/admin`);
      setCourseLandingPageState(courseCurriculumDefault);
    } else {
      console.log(data);
    }
    setLoading(false);
  };

  return {
    courseLandingPageState,
    setCourseLandingPageState,
    handleSubmit,
    loading,
  };
};

// course Curriculum store
export const courseCurriculumAtom = atom({
  key: "courseCurriculumAtom",
  default: courseCurriculumDefault,
});

export const useCourseCurriculumState = () =>
  useRecoilState(courseCurriculumAtom);

export const useCourseCurriculum = () => {
  const [courseCurriculumState, setCourseCurriculumState] =
    useCourseCurriculumState();
  return {
    courseCurriculumState,
    setCourseCurriculumState,
  };
};

// Current Course Store
export const currentCourseDefault = {
  courseId: "",
  courseLandingPageData: courseLandingPageDefault,
  courseCurriculumData: courseCurriculumDefault,
  isPublished: false,
  progress: 0,
};

export const currentCourseAtom = atom({
  key: "currentCourseAtom",
  default: currentCourseDefault,
});
export const useCurrentCourseState = () => useRecoilState(currentCourseAtom);

// Current Course Landing Page store

export const currentCourseLandingPageSelector = selector({
  key: "currentCourseLandingPageSelector",
  get: ({ get }) => {
    const courseData = get(currentCourseAtom);
    return courseData.courseLandingPageData;
  },
  set: ({ get, set }, newLandingPageData) => {
    const currentCourse = get(currentCourseAtom);
    set(currentCourseAtom, {
      ...currentCourse,
      courseLandingPageData: newLandingPageData,
    });
  },
});
export const useCurrentCourseLandingPageState = () =>
  useRecoilState(currentCourseLandingPageSelector);

export const useCurrentCourseLandingPage = () => {
  const [currentCourseLandingPageState, setCurrrentCourseLandingPageState] =
    useCurrentCourseLandingPageState();
  const [currentCourseState, setCurrentCourseState] = useCurrentCourseState();
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (e, id) => {
    setLoading(true);
    e.preventDefault();
    const currentCourseLandingPageData = {
      ...currentCourseState.courseLandingPageData,
      isPublished: currentCourseState.isPublished,
    };
    const data = await updateCourseLandingPageService(
      id,
      currentCourseLandingPageData
    );
    if (data.success) {
      console.log(data);
    } else {
      console.log(data);
    }
    setLoading(false);
  };
  return {
    currentCourseState,
    currentCourseLandingPageState,
    setCurrrentCourseLandingPageState,
    handleUpdate,
    loading,
  };
};

//Current  Course Curriculum store
export const currentCourseCurriculumSelector = selector({
  key: "currentCourseCurriculumSelector",
  get: ({ get }) => {
    const courseData = get(currentCourseAtom);
    return courseData.courseCurriculumData;
  },
  set: ({ get, set }, newCourseCurriculum) => {
    const currentCourse = get(currentCourseAtom);
    set(currentCourseAtom, {
      ...currentCourse,
      courseCurriculumData: newCourseCurriculum,
    });
  },
});

export const useCurrentCourseCurriculumState = () =>
  useRecoilState(currentCourseCurriculumSelector);

// All Admin Courses Store
export const allAdminCoursesDefault = [
  {
    _id: "",
    title: "",
    pricing: "",
    students: "",
    revenue: "",
    isPublished: false,
  },
];

export const allAdminCoursesAtom = atom({
  key: "allAdminCoursesAtom",
  default: allAdminCoursesDefault,
});
export const useAllAdminCoursesState = () =>
  useRecoilState(allAdminCoursesAtom);

// media store

export const mediaUploadProgressAtom = atom({
  key: "mediaUploadProgressAtom",
  default: false,
});

export const useMediaUploadProgressState = () =>
  useRecoilState(mediaUploadProgressAtom);

export const mediaUploadProgressPercentageAtom = atom({
  key: "mediaUploadProgressPercentage",
  default: 0,
});

export const useMediaUploadProgressPercentageState = () =>
  useRecoilState(mediaUploadProgressPercentageAtom);

export {
  courseLandingPageDefault,
  languageOptions,
  courseLevelOptions,
  courseLandingPageFormFields,
  courseCategories,
  courseCurriculumDefault,
};
