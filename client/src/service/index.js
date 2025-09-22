import { axiosInstanceWithAuth } from "@/api/axiosInstance.js";
import axios from "axios";

export const signUpService = async (formData) => {
  try {
    const response = await axiosInstanceWithAuth.post(`/user/signup`, formData);
    return response.data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const signInService = async (formData) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(`/user/signin`, formData);
    console.log(data);
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
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
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
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

export const uploadCourseThumbnailService = async (formData, courseId) => {
  try {
    const { data } = await axiosInstanceWithAuth.put(
      `/course/uploadThumbnail/${courseId}`,
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

export const getStudentAllPurchsedCourseService = async () => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `/course/purchasedCourses`
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

export const getUploadPreSignedURLSevice = async (file, folder) => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `/s3/upload-url?file=${encodeURIComponent(
        file
      )}&folder=${encodeURIComponent(folder)}`
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
export const uploadS3VideoDetailsService = async (formData, courseId) => {
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

export const uploadToS3Service = async (
  signedURL,
  file,
  onProgressCallback
) => {
  try {
    const response = await axios.put(signedURL, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(progress);
      },
    });
    return response;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const getGetPreSignedURLService = async (key) => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `/s3/get-url?key=${encodeURIComponent(key)}`
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

export const getMultipleVideoGETPreSignedURLS = async (videos) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(`/s3/multi-get-url`, {
      videos,
    });
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const deleteS3ObjectService = async (key) => {
  try {
    const { data } = await axiosInstanceWithAuth.delete(
      `/s3/delete?key=${encodeURIComponent(key)}`
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

export const getPublicS3ObjectUrlService = async (key) => {
  try {
    const { data } = await axiosInstanceWithAuth.get(
      `s3/public-url?key=${encodeURIComponent(key)}`
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

// payment related services

export const createPaymentOrder = async (courseId) => {
  try {
    const { data } = await axiosInstanceWithAuth.post("/payment/create-order", {
      courseId,
    });
    return data;
  } catch (error) {
    const data = error?.response?.data;
    if (data) {
      return data;
    }
    return error;
  }
};

export const verifyPayment = async (payload) => {
  try {
    const { data } = await axiosInstanceWithAuth.post(
      "/payment/verify",
      payload
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
