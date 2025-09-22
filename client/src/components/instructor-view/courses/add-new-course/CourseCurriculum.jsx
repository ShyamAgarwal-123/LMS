import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { useToast } from "@/hooks/use-toast";
import {
  updateVideoDetailsSchema,
  uploadVideoDetailsSchema,
} from "@/inputValidationSchema/videoDetails.schema";
import {
  deleteS3ObjectService,
  deleteVideoDetailsService,
  getGetPreSignedURLService,
  getUploadPreSignedURLSevice,
  updateCourseLandingPageService,
  updateVideoDetailsService,
  uploadS3VideoDetailsService,
  uploadToS3Service,
} from "@/service";
import {
  currentCourseDefault,
  useCurrentCourseCurriculumState,
  useMediaUploadProgressPercentageState,
  useMediaUploadProgressState,
} from "@/store/admin";
import _, { forIn } from "lodash";
import { LucideDelete, UploadIcon } from "lucide-react";
import React from "react";

function CourseCurriculum({ courseId, isPublished }) {
  const [currentCourseCurriculumState, setCurrentCourseCurriculumState] =
    useCurrentCourseCurriculumState();
  const [mediaUploadProgress, setMediaUploadProgress] =
    useMediaUploadProgressState();
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useMediaUploadProgressPercentageState();
  const { toast } = useToast();

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
  async function handleRemove(e, index) {
    if (index !== 0 && !currentCourseCurriculumState[index].s3Key) {
      setCurrentCourseCurriculumState((prev) => {
        return prev.slice(0, index).concat(prev.slice(index + 1));
      });
    } else if (index !== 0 && currentCourseCurriculumState[index].s3Key) {
      const s3Key = currentCourseCurriculumState[index].s3Key;
      const data1 = await deleteS3ObjectService(s3Key);
      console.log(data1);
      if (!data1.success) {
        console.error("Failed to delete S3 object:", data1.message);
        alert("Failed to delete video from storage. Please try again.");
        return;
      }
      setCurrentCourseCurriculumState((prev) => {
        return prev.slice(0, index).concat(prev.slice(index + 1));
      });
    } else if (index == 0 && currentCourseCurriculumState[index].s3Key) {
      const s3Key = currentCourseCurriculumState[index].s3Key;
      const data1 = await deleteS3ObjectService(s3Key);
      console.log(data1);
      if (!data1.success) {
        console.error("Failed to delete S3 object:", data1.message);
        alert("Failed to delete video from storage. Please try again.");
        return;
      }
      setCurrentCourseCurriculumState([currentCourseDefault]);
    } else if (
      index == 0 &&
      (currentCourseCurriculumState[index].title ||
        currentCourseCurriculumState[index].freePreview)
    ) {
      setCurrentCourseCurriculumState([currentCourseDefault]);
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
    try {
      const file = e.target.files[0];
      if (!file) return;
      setMediaUploadProgress(true);
      const data1 = await getUploadPreSignedURLSevice(file.type, "videos");
      console.log(data1.data.uploadURL);
      if (!data1.success) {
        throw new Error(data1.message || "Failed to get upload URL");
      }
      const response = await uploadToS3Service(
        data1.data.uploadURL,
        file,
        setMediaUploadProgressPercentage
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to upload to S3");
      }
      const data2 = await getGetPreSignedURLService(data1.data.key);
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return {
              ...item,
              videoUrl: data2.data.getURL,
              s3Key: data2.data.key,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload video. Please try again.");
      setCurrentCourseCurriculumState((prev) =>
        prev.map((item, indx) => {
          if (indx === index) {
            return {
              ...currentCourseCurriculumState[0],
            };
          }
          return item;
        })
      );
    } finally {
      setMediaUploadProgress(false);
      setMediaUploadProgressPercentage(0);
    }
  }

  async function handleUpload(e, index) {
    const { _id, ...videoDetails } = currentCourseCurriculumState[index];
    const validatedInput = uploadVideoDetailsSchema.safeParse(videoDetails);
    if (!validatedInput.success) {
      console.log(validatedInput.error.errors[0].message);
      alert(`${validatedInput.error.errors[0].message}`);
      return;
    }
    const data = await uploadS3VideoDetailsService(videoDetails, courseId);

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
    let no_of_Lect = 0;
    let isFreePreview = false;
    for (let i = 0; i < currentCourseCurriculumState.length; i++) {
      if (currentCourseCurriculumState[i]._id) {
        no_of_Lect++;
      }
      if (currentCourseCurriculumState[i].freePreview) {
        isFreePreview = true;
      }
    }

    const { _id, ...newVideoDetails } = videoDetails;
    if (isPublished && !isFreePreview) {
      toast({
        title: "Alteast one video Should be Free in a publised course",
        variant: "destructive",
      });
      return;
    }

    const data = await updateVideoDetailsService(newVideoDetails, _id);
    if (!data.success) {
      toast({
        title: "Unable to Upadate the Course Curriculum",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Video Successfuly updated",
      variant: "success",
    });
  }

  async function handleDelete(e, index) {
    const video_id = currentCourseCurriculumState[index]._id;
    const s3Key = currentCourseCurriculumState[index].s3Key;

    if (!video_id) {
      console.error("No video ID found for deletion");
      return;
    }

    let no_of_Lect = 0;

    for (let i = 0; i < currentCourseCurriculumState.length; i++) {
      if (currentCourseCurriculumState[i]._id) {
        no_of_Lect++;
      }
    }

    if (no_of_Lect == 1 && isPublished) {
      alert("First unpublish to delete this lecture");
      return;
    }

    try {
      // setMediaUploadProgress(true);

      const data1 = await deleteS3ObjectService(s3Key);
      console.log("S3 deletion result:", data1);

      if (!data1.success) {
        console.error("Failed to delete S3 object:", data1.message);
        alert("Failed to delete video from storage. Please try again.");
        return;
      }

      const data2 = await deleteVideoDetailsService(courseId, video_id);
      console.log(data2);
      if (!data2.success) {
        console.error(
          "Failed to delete video details from database:",
          data2.message
        );
        alert(
          "Failed to delete video details from database. Please try again."
        );
        return;
      }

      if (currentCourseCurriculumState.length !== 1) {
        setCurrentCourseCurriculumState((prev) =>
          prev.slice(0, index).concat(prev.slice(index + 1))
        );
      } else {
        setCurrentCourseCurriculumState(
          currentCourseDefault.courseCurriculumData
        );
      }

      console.log("Video successfully deleted");
      alert("Video deleted successfully!");
    } catch (error) {
      console.error("Error during deletion process:", error);
      alert("An unexpected error occurred during deletion. Please try again.");
    } finally {
      // setMediaUploadProgress(false);
    }
  }

  async function handleReplace(e, index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const s3Key = currentCourseCurriculumState[index].s3Key;
      const videoId = currentCourseCurriculumState[index]._id;

      try {
        setMediaUploadProgress(true);
        const data1 = await deleteS3ObjectService(s3Key);
        if (!data1.success) {
          console.error("Failed to delete the Video from S3:", data1.message);
          alert("Failed to delete old video from storage. Please try again.");
          return;
        }

        const uploadData = await getUploadPreSignedURLSevice(
          file.type,
          "videos"
        );
        if (!uploadData.success) {
          throw new Error(uploadData.message || "Failed to get upload URL");
        }

        const response = await uploadToS3Service(
          uploadData.data.uploadURL,
          file,
          setMediaUploadProgressPercentage
        );

        if (response.status !== 200) {
          throw new Error("Failed to upload new video to S3");
        }
        console.log(uploadData.data.key);

        const getUrlData = await getGetPreSignedURLService(uploadData.data.key);
        if (!getUrlData.success) {
          throw new Error("Failed to get video URL");
        }
        setCurrentCourseCurriculumState((prev) =>
          prev.map((item, indx) => {
            if (indx === index) {
              return {
                ...item,
                videoUrl: getUrlData.data.getURL,
                s3Key: getUrlData.data.key,
              };
            }
            return item;
          })
        );
        if (videoId) {
          const { _id, ...videoDetails } = currentCourseCurriculumState[index];
          videoDetails.s3Key = getUrlData.data.key;
          const updateResult = await updateVideoDetailsService(
            videoDetails,
            videoId
          );
          if (!updateResult.success) {
            console.error("Failed to update video details in database");
            alert(
              "Video replaced but failed to update database. Please refresh and try again."
            );
          }
        }

        alert("Video replaced successfully!");
      } catch (error) {
        console.error("Replace error:", error);
        alert("Failed to replace video. Please try again.");

        const originalData = await getGetPreSignedURLService(s3Key);
        if (originalData.success) {
          setCurrentCourseCurriculumState((prev) =>
            prev.map((item, indx) => {
              if (indx === index) {
                return {
                  ...item,
                  videoUrl: originalData.data.getURL,
                  s3Key,
                };
              }
              return item;
            })
          );
        }
      } finally {
        setMediaUploadProgress(false);
        setMediaUploadProgressPercentage(0);
      }
    };
    input.click();
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
          className="bg-primary"
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
                  <Button
                    onClick={(e) => handleReplace(e, index)}
                    disabled={mediaUploadProgress}
                  >
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
                    className="lg:absolute lg:top-5 lg:right-28"
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
                    className="lg:absolute lg:top-5 lg:right-5"
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
