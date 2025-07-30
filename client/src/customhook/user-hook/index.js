import {
  getAllStudentViewCoursesService,
  getStudentViewCourseDetailsService,
} from "@/service";
import {
  useAllStudentViewCoursesState,
  useStudentViewCourseDetailsState,
} from "@/store/user";
import { useEffect, useState } from "react";

export const useAllStudentViewCourses = (filters, sort) => {
  const [allStudentViewCoursesState, setAllStudentViewCoursesState] =
    useAllStudentViewCoursesState();
  const [loading, setLoading] = useState(false);
  async function fetchStudentAllCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    setLoading(true);
    const data = await getAllStudentViewCoursesService(query);
    console.log(data);

    if (data.success) {
      setAllStudentViewCoursesState(data?.data);
    } else if (data.statusCode === 404) {
      setAllStudentViewCoursesState([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (filters || sort) fetchStudentAllCourses(filters, sort);
  }, [filters, sort]);

  return {
    allStudentViewCoursesState,
    setAllStudentViewCoursesState,
    loading,
  };
};

export const useStudentViewCurrentCourse = (courseId) => {
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useStudentViewCourseDetailsState();
  const [loading, setLoading] = useState(false);

  const fetchStudentViewCourseDetails = async (courseId) => {
    setLoading(true);
    const data = await getStudentViewCourseDetailsService(courseId);
    console.log(data);
    setStudentViewCourseDetails(data?.data);
    setLoading(false);
  };
  useEffect(() => {
    if (courseId) {
      fetchStudentViewCourseDetails(courseId);
    }
  }, [courseId]);
  return { studentViewCourseDetails, loading };
};
