import { axiosInstanceWithAuth } from "@/api/axiosInstance.js";

export const signUpService = async (formData) => {
  try {
    const response = await axiosInstanceWithAuth.post(`/user/signup`, formData);
    return response.data;
  } catch ({ response }) {
    return response.data;
  }
};

export const signInService = async (formData) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(`/user/signin`, formData);
    console.log(data);
    return data;
  } catch ({ response }) {
    return response.data;
  }
};

export const getUserService = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.get(`/user/getUser`);
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      "/user/refreshAccessToken"
    );
    return data;
  } catch ({ response: { data } }) {
    return data;
  }
};

export const logoutService = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.post("/user/logout");
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const createCourseLandingPageService = async (formData) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(
      "/course/createCourse",
      formData
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const getAdminCoursesService = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.get(`/user/getAdminCourses`);
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const getCourseService = async (courseId) => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `/course/getCourse/${courseId}`
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const updateCourseLandingPageService = async (
  courseId,
  currentCourseLandingPageData
) => {
  try {
    const { data } = await axiosInstanceWithAuth.put(
      `/course/updateCourse/${courseId}`,
      currentCourseLandingPageData
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const uploadVideoService = async (formData, onProgressCallback) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(
      `/video/uploadVideo`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgressCallback(percentCompleted);
        },
      }
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const togglePublishService = async (courseId, isPublishedState) => {
  try {
    const { data } = await axiosInstanceWithAuth.put(
      `/course/togglePublish/${courseId}`,
      {
        isPublished: isPublishedState,
      }
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const uploadVideoDetailsService = async (formData, courseId) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(
      `/video/uploadVideoDetails/${courseId}`,
      formData
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const uploadCourseThumbnailService = async (
  formData,
  courseId,
  onProgressCallback
) => {
  try {
    const { data } = await axiosInstanceWithAuth.put(
      `/course/uploadThumbnail/${courseId}`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgressCallback(percentCompleted);
        },
      }
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};
export const deleteCourseThumbnailService = async (
  courseId,
  publicId,
  onProgressCallback
) => {
  try {
    const { data } = await axiosInstanceWithAuth.delete(
      `/course/deleteThumbnail/${courseId}`,
      {
        data: {
          publicId,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgressCallback(percentCompleted);
        },
      }
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const updateVideoDetailsService = async (formData, videoId) => {
  try {
    const { data } = await axiosInstanceWithAuth.put(
      `/video/updateVideoDetails/${videoId}`,
      formData
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const deleteVideoDetailsService = async (courseId, videoId) => {
  try {
    const { data } = await axiosInstanceWithAuth.delete(
      `/video/deleteVideoDetails/${courseId}/${videoId}`
    );

    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const deleteVideoService = async (
  publicId,
  videoId,
  onProgressCallback
) => {
  try {
    if (videoId) {
      const { data } = await axiosInstanceWithAuth.delete(
        `/video/deleteVideo/${videoId}`,
        {
          data: {
            publicId,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgressCallback(percentCompleted);
          },
        }
      );
      return data;
    } else {
      const { data } = await axiosInstanceWithAuth.delete(
        `/video/deleteVideo`,
        {
          data: {
            publicId,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgressCallback(percentCompleted);
          },
        }
      );
      return data;
    }
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const getStudentViewCourseDetailsService = async (courseId) => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `/course/getCourse/${courseId}`
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const getStudentAllCoursesService = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.get(`/user/studentAllCourses`);
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const getAllStudentViewCoursesService = async (query) => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `/course/allCourses?${query}`
    );
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};
