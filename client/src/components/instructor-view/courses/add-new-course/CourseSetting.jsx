import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteCourseThumbnailService,
  uploadCourseThumbnailService,
} from "@/service";
import {
  useCurrentCourseLandingPageState,
  useMediaUploadProgressPercentageState,
  useMediaUploadProgressState,
} from "@/store/admin";
import { Upload } from "lucide-react";
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
    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);
      setMediaUploadProgress(true);
      const data = await uploadCourseThumbnailService(
        imageFormData,
        courseId,
        setMediaUploadProgressPercentage
      );
      if (data.success) {
        setCurrentCourseData((prev) => ({
          ...prev,
          image: data?.data?.thumbnail || prev.image,
          imageId: data?.data?.thumbnail_id || prev.imageId,
        }));
      } else {
        console.log(data);
      }
      setMediaUploadProgress(false);
    }
  }
  async function handleReplace(e, index) {
    const publicId = currentCourseData.imageId;
    setMediaUploadProgress(true);
    const data = await deleteCourseThumbnailService(
      courseId,
      publicId,
      setMediaUploadProgressPercentage
    );
    if (data.success) {
      setCurrentCourseData((prev) => ({
        ...prev,
        image: data?.data?.image,
        imageId: "",
      }));
    }
    setMediaUploadProgress(false);
  }

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
          <img src={currentCourseData.image} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSetting;
