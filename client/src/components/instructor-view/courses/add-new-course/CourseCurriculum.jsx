import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import {
  updateVideoDetailsSchema,
  uploadVideoDetailsSchema,
} from "@/inputValidationSchema/videoDetails.schema";
import {
  deleteVideoDetailsService,
  deleteVideoService,
  updateCourseLandingPageService,
  updateVideoDetailsService,
  uploadVideoDetailsService,
  uploadVideoService,
} from "@/service";
import {
  currentCourseDefault,
  useCurrentCourseCurriculumState,
  useMediaUploadProgressPercentageState,
  useMediaUploadProgressState,
} from "@/store/admin";
import _ from "lodash";
import { LucideDelete, UploadIcon } from "lucide-react";
import React from "react";

function CourseCurriculum({ courseId }) {
  const [currentCourseCurriculumState, setCurrentCourseCurriculumState] =
    useCurrentCourseCurriculumState();
  const [mediaUploadProgress, setMediaUploadProgress] =
    useMediaUploadProgressState();
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useMediaUploadProgressPercentageState();

  function handleNewLecture() {
    if (
      !currentCourseCurriculumState[currentCourseCurriculumState.length - 1]._id
    ) {
      alert("Uplaod The Current Lecture");
      return;
    }
    setCurrentCourseCurriculumState((prev) => [
      ...prev,
      currentCourseDefault.courseCurriculumData[0],
    ]);
  }
  function handleRemove(e, index) {
    if (index !== 0 && !currentCourseCurriculumState[index].videoUrl) {
      setCurrentCourseCurriculumState((prev) => {
        return prev.slice(0, index).concat(prev.slice(index + 1));
      });
    } else alert("One Lecture is Required");
  }

  function handleInput(e, index) {
    const newtitle = e.target.value;
    setCurrentCourseCurriculumState((prev) =>
      prev.map((item, ind) => {
        if (ind === index) {
          const newiteam = { ...item };
          newiteam.title = newtitle;
          return newiteam;
        } else return item;
      })
    );
  }

  function handleSwitch(currentValue, index) {
    const newFreePreview = currentValue;
    setCurrentCourseCurriculumState((prev) =>
      prev.map((item, ind) => {
        if (ind === index) {
          const newiteam = { ...item };
          newiteam.freePreview = newFreePreview;
          return newiteam;
        } else return item;
      })
    );
  }

  async function handleSingleLectureUpload(e, index) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setMediaUploadProgress(true);
    const data = await uploadVideoService(
      formData,
      setMediaUploadProgressPercentage
    );
    console.log(data);

    if (data.success) {
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return {
              ...item,
              videoUrl: data?.data?.videoUrl,
              public_id: data?.data?.public_id,
            };
          }
          return item;
        })
      );
    } else {
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return currentCourseCurriculumState[0];
          }
          return item;
        })
      );
    }
    setMediaUploadProgress(false);
  }

  async function handleUpload(e, index) {
    const { _id, ...videoDetails } = currentCourseCurriculumState[index];

    const validatedInput = uploadVideoDetailsSchema.safeParse(videoDetails);
    if (!validatedInput.success) {
      console.log(validatedInput);
      return;
    }
    const data = await uploadVideoDetailsService(videoDetails, courseId);
    console.log(data);

    if (data.success) {
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (index === indx) {
            return {
              ...item,
              _id: data.data._id,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      console.log("error", data);
    }
  }

  async function handleUpdate(e, index) {
    const videoDetails = currentCourseCurriculumState[index];
    const validatedInput = updateVideoDetailsSchema.safeParse(videoDetails);
    if (!validatedInput.success) {
      console.log(validatedInput);
      return;
    }
    const { _id, ...newVideoDetails } = videoDetails;
    const data = await updateVideoDetailsService(newVideoDetails, _id);
  }

  async function handleDelete(e, index) {
    const _id = currentCourseCurriculumState[index]._id;
    if (!_id) {
      return;
    }
    const data = await deleteVideoDetailsService(courseId, _id);
    if (!data) {
      if (currentCourseCurriculumState.length !== 1) {
        setCurrentCourseCurriculumState((prev) =>
          prev.slice(0, index).concat(prev.slice(index + 1))
        );
      } else {
        setCurrentCourseCurriculumState(
          currentCourseDefault.courseCurriculumData
        );
      }
    }
  }

  async function handleReplace(e, index) {
    const publicId = currentCourseCurriculumState[index].public_id;
    const videoId = currentCourseCurriculumState[index]._id;
    setMediaUploadProgress(true);
    const data = await deleteVideoService(
      publicId,
      videoId,
      setMediaUploadProgressPercentage
    );
    if (data.success) {
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return {
              ...item,
              videoUrl: "",
            };
          }
          return item;
        })
      );
    }
    setMediaUploadProgress(false);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="sm:text-2xl text-xl">Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={mediaUploadProgress}
          onClick={handleNewLecture}
          className="bg-blue-600 "
        >
          Add Lecture
        </Button>
        {mediaUploadProgress && (
          <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        )}
        <div className="mt-4 space-y-4">
          {currentCourseCurriculumState.map((cirriculumItem, index) => (
            <div
              className="border p-5 rounded-md md:relative flex flex-col"
              key={index + 1}
            >
              <div className="flex gap-5 items-center lg:flex-row flex-col ">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture Title"
                  className="max-w-full lg:max-w-96 min-w-40"
                  value={cirriculumItem.title}
                  onChange={(e) => handleInput(e, index)}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={cirriculumItem.freePreview}
                    id={`freePreview-${index + 1}`}
                    onCheckedChange={(currentValue) =>
                      handleSwitch(currentValue, index)
                    }
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6 flex md:flex-row flex-col md:gap-2 gap-5 w-full items-center">
                {cirriculumItem.videoUrl && (
                  <VideoPlayer
                    url={cirriculumItem.videoUrl}
                    className="md:w-[450px] h-[200px] w-full"
                  />
                )}
                {cirriculumItem.videoUrl ? (
                  <Button onClick={(e) => handleReplace(e, index)}>
                    Replace
                  </Button>
                ) : (
                  <Input
                    disabled={mediaUploadProgress}
                    type="file"
                    accept="video/*"
                    className="file:cursor-pointer justify-center mb-4 cursor-pointer file:bg-blue-300 file:rounded-sm file:px-2 file:font-semibold file:text-blue-700"
                    onChange={(e) => handleSingleLectureUpload(e, index)}
                  />
                )}
              </div>
              <div className="flex gap-5 lg:block justify-center mt-5 sm:justify-start">
                {cirriculumItem._id ? (
                  <Button
                    disabled={mediaUploadProgress}
                    className="bg-blue-500 lg:absolute lg:top-5 lg:right-28"
                    onClick={(e) => handleUpdate(e, index)}
                  >
                    Update
                  </Button>
                ) : (
                  <button
                    disabled={mediaUploadProgress}
                    onClick={(e) => handleUpload(e, index)}
                    className="lg:absolute lg:top-5 lg:right-20 h-8 cursor-pointer"
                  >
                    <UploadIcon />
                  </button>
                )}
                {cirriculumItem._id ? (
                  <Button
                    disabled={mediaUploadProgress}
                    onClick={(e) => handleDelete(e, index)}
                    className="bg-blue-500 lg:absolute lg:top-5 lg:right-5"
                  >
                    Delete
                  </Button>
                ) : (
                  <button
                    className="lg:absolute lg:top-5 lg:right-5 h-8"
                    onClick={(e) => handleRemove(e, index)}
                  >
                    <LucideDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
