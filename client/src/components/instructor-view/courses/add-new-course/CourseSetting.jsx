import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteCourseThumbnailService,
  deleteS3ObjectService,
  getPublicS3ObjectUrlService,
  getUploadPreSignedURLSevice,
  uploadCourseThumbnailService,
  uploadToS3Service,
} from "@/service";
import {
  useCurrentCourseLandingPageState,
  useMediaUploadProgressPercentageState,
  useMediaUploadProgressState,
} from "@/store/admin";
import React from "react";

function CourseSetting({ courseId }) {
  const [currentCourseData, setCurrentCourseData] =
    useCurrentCourseLandingPageState();
  const [mediaUploadProgress, setMediaUploadProgress] =
    useMediaUploadProgressState();
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useMediaUploadProgressPercentageState();
  async function handleImageUpload(e) {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      return;
    }
    try {
      setMediaUploadProgress(true);
      const data = await getUploadPreSignedURLSevice(
        selectedImage.type,
        "thumbnails"
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to get upload URL");
      }

      const response = await uploadToS3Service(
        data.data.uploadURL,
        selectedImage,
        setMediaUploadProgressPercentage
      );

      if (response.status !== 200) {
        throw new Error("Failed to upload to S3");
      }

      const data3 = await getPublicS3ObjectUrlService(data.data.key);

      if (!data3.success) {
        throw new Error("Failed to Get Public Url");
      }
      const data4 = await uploadCourseThumbnailService(
        {
          url: data3.data.publicURL,
          key: data3.data.key,
        },
        courseId
      );
      console.log(data4);
      if (!data4.success) {
        throw new Error("Failed to Upload Thumbnail in Db, try again");
      }
      setCurrentCourseData((prev) => {
        return {
          ...prev,
          image: data3.data.publicURL,
          imageId: data3.data.key,
        };
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload thumbnail. Please try again.");
    } finally {
      setMediaUploadProgress(false);
      setMediaUploadProgressPercentage(0);
    }
  }
  async function handleReplace(e, index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const s3Key = currentCourseData.imageId;

      try {
        setMediaUploadProgress(true);
        const data = await deleteS3ObjectService(s3Key);
        if (!data.success) {
          console.error("Failed to delete the Video from S3:", data.message);
          alert(
            "Failed to delete old thumbnails from storage. Please try again."
          );
          return;
        }

        const data1 = await getUploadPreSignedURLSevice(
          file.type,
          "thumbnails"
        );
        if (!data1.success) {
          throw new Error(data1.message || "Failed to get upload URL");
        }

        const response = await uploadToS3Service(
          data1.data.uploadURL,
          file,
          setMediaUploadProgressPercentage
        );

        if (response.status !== 200) {
          throw new Error("Failed to upload new thumbnails to S3");
        }
        const data2 = await getPublicS3ObjectUrlService(data1.data.key);

        if (!data2.success) {
          throw new Error("Failed to Get Public Url");
        }

        const data3 = await uploadCourseThumbnailService(
          {
            url: data2.data.publicURL,
            key: data2.data.key,
          },
          courseId
        );
        console.log(data3);
        if (!data3.success) {
          throw new Error("Failed to Upload Thumbnail in Db, try again");
        }
        setCurrentCourseData((prev) => ({
          ...prev,
          image: data2.data.publicURL,
          imageId: data2.data.key,
        }));
        alert("Successfuly Replaced the course Thumbnail");
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload thumbnail. Please try again.");
        const originalData = await getPublicS3ObjectUrlService(s3Key);
        if (originalData.success) {
          setCurrentCourseData((prev) => ({
            ...prev,
            image: originalData.data.publicURL,
            imageId: originalData.data.key,
          }));
        }
      } finally {
        setMediaUploadProgress(false);
        setMediaUploadProgressPercentage(0);
      }
    };
    input.click();
  }
  async function handleDelete() {}

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="px-2">
          {mediaUploadProgress && (
            <MediaProgressBar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadProgressPercentage}
            />
          )}
        </div>
        <div className="w-full flex gap-20 justify-between items-center flex-col-reverse">
          <div className="flex flex-col gap-3 w-full">
            <Label>Upload Course Image</Label>
            {currentCourseData.imageId ? (
              <Button onClick={handleReplace}>Replace</Button>
            ) : (
              <Input
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                className="file:cursor-pointer file:bg-blue-300 file:rounded-sm file:px-2 file:font-semibold file:text-blue-700 cursor-pointer"
              />
            )}
          </div>
          <img src={currentCourseData.image} width={"100"} height={"100"} />
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSetting;
