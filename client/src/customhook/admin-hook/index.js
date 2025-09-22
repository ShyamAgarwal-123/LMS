import {
  getAdminCoursesService,
  getCourseService,
  getMultipleVideoGETPreSignedURLS,
} from "@/service";
import {
  currentCourseDefault,
  useAllAdminCoursesState,
  useCurrentCourseCurriculumState,
  useCurrentCourseLandingPageState,
  useCurrentCourseState,
} from "@/store/admin";
import { useEffect, useState } from "react";

export const useAllAdminCourses = () => {
  const [allAdminCoursesState, setAllAdminCoursesState] =
    useAllAdminCoursesState();
  const [loading, setLoading] = useState(false);

  const getAdminCourses = async () => {
    setLoading(true);
    // await new Promise((r) => setTimeout(r, 2000));
    const data = await getAdminCoursesService();
    if (data.success) {
      setAllAdminCoursesState(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAdminCourses();
  }, []);

  return { allAdminCoursesState, setAllAdminCoursesState, loading };
};

export const useCurrentCourse = (id) => {
  const [currentCourseData, setCurrentCourseData] = useCurrentCourseState();
  const [loading, setLoading] = useState(true);

  const getCourse = async (courseId) => {
    setLoading(true);
    const response = await getCourseService(courseId);
    if (response.success) {
      const data = response.data;
      const videos = response.data.videos.map((video) => {
        return { _id: video._id, s3Key: video.s3Key };
      });

      const response2 = await getMultipleVideoGETPreSignedURLS(videos);
      console.log(response2);

      const updatedVideos = data.videos.map((video) => {
        return { ...video, videoUrl: response2.data[video._id] };
      });

      setCurrentCourseData((prev) => ({
        ...prev,
        courseId: data._id,
        courseLandingPageData: {
          title: data.title,
          category: data.category,
          description: data.description,
          level: data.level,
          pricing: data.pricing,
          objectives: data.objectives,
          primaryLanguage: data.primaryLanguage,
          subtitle: data.subtitle,
          welcomeMessage: data.welcomeMessage,
          image: data.thumbnail,
          imageId: data.thumbnail_s3_key,
        },
        isPublished: data.isPublished,
        courseCurriculumData: updatedVideos[0]
          ? updatedVideos
          : currentCourseDefault.courseCurriculumData,
      }));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getCourse(id);
    } else {
      setCurrentCourseData(currentCourseDefault);
    }
  }, [id]);

  return { currentCourseData, setCurrentCourseData, loading };
};
