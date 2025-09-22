import ConfigurableGridBackground from "@/components/custom-bg";
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/CourseCurriculum";
import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/CourseLandingPage";
import CourseSetting from "@/components/instructor-view/courses/add-new-course/CourseSetting";
import LockComponent from "@/components/lock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentCourse } from "@/customhook/admin-hook";
import { useToast } from "@/hooks/use-toast";
import { togglePublishService } from "@/service";
import { useMediaUploadProgressState } from "@/store/admin";
import { progress } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Menu,
  PanelsRightBottomIcon,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddNewCoursePage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("course landing page");
  const [mediaUploadProgress, setMediaUploadProgress] =
    useMediaUploadProgressState();
  const { courseId } = useParams();
  const { currentCourseData, setCurrentCourseData, loading } =
    useCurrentCourse(courseId);
  const { toast } = useToast();

  const navigate = useNavigate();
  useEffect(() => {
    if (courseId) {
      setCurrentCourseData((prev) => {
        const is100 = prev.courseCurriculumData.find(
          (item) => item._id && item.freePreview
        );
        if (is100) {
          return { ...prev, progress: 100 };
        } else return { ...prev, progress: 50 };
      });
    } else {
      setCurrentCourseData((prev) => ({
        ...prev,
        progress: 0,
      }));
    }
  }, [courseId, currentCourseData.courseCurriculumData]);
  const isSmallScreen = screenWidth < 640;
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isSmallScreen]);

  async function handlePublishState() {
    const data = await togglePublishService(
      courseId,
      !currentCourseData.isPublished
    );
    if (data.success) {
      toast({
        description: data.message,
        variant: "success",
      });
      setCurrentCourseData({
        ...currentCourseData,
        isPublished: !currentCourseData.isPublished,
      });
    } else {
      toast({
        description: data.message,
        variant: "destructive",
      });
    }
  }

  if (courseId && loading) {
    return <div>Loading.....</div>;
  }
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <ConfigurableGridBackground className="border-2">
        {open && isSmallScreen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <div className="flex flex-col gap-3 sm:mx-16 pt-6 px-6 pb-2 mx-0">
          <div className="flex sm:flex-row justify-between mt-2 w-full flex-col gap-2">
            <div className="flex gap-2 items-center sm:justify-center justify-between">
              <div className="flex gap-2 items-center sm:justify-center">
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/admin");
                  }}
                />
                <h1 className="text-2xl font-bold ">
                  {courseId ? "Update Course" : "Create Course"}
                </h1>
                <span className="bg-white border-2 rounded-2xl px-2 text-xs">
                  {currentCourseData.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <div className="sm:hidden">{`${currentCourseData.progress}/100`}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center w-8 h-8 cursor-pointer">
                {open ? (
                  <X
                    className="sm:hidden transition-all duration-300"
                    onClick={() => setOpen(!open)}
                  />
                ) : (
                  <Menu
                    className="sm:hidden transition-all duration-300"
                    onClick={() => setOpen(!open)}
                  />
                )}
              </div>
              <Button
                onClick={handlePublishState}
                disabled={
                  currentCourseData.progress !== 100 || mediaUploadProgress
                }
                className="bg-primary transition-all"
              >
                {currentCourseData.isPublished
                  ? "Unpublish Course"
                  : "Publish Course"}
              </Button>
            </div>
          </div>
          <div className="bg"></div>
          {open && (
            <div
              className={`sm:flex sm:justify-between sm:w-full sm:items-center ${
                isSmallScreen
                  ? "absolute z-40 top-32 left-1 transition-transform duration-300"
                  : "transition-transform duration-300"
              }`}
            >
              <div>
                <Tabs
                  defaultValue="course landing page"
                  value={activeTab}
                  className={`${
                    isSmallScreen
                      ? "bg-white px-2 py-6 h-32 border rounded-sm"
                      : ""
                  }`}
                  onValueChange={(e) => setActiveTab(e)}
                >
                  <TabsList
                    className={`bg-transparent transition-transform duration-300 ${
                      isSmallScreen ? "flex-col items-start justify-center" : ""
                    }`}
                  >
                    <TabsTrigger
                      value="course landing page"
                      className="
               flex gap-1 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-2"
                    >
                      <PanelsRightBottomIcon className="h-5" />
                      <span
                        className={`${
                          activeTab === "course landing page" && "font-medium"
                        }`}
                        onClick={() => isSmallScreen && setOpen(false)}
                      >
                        Course Landing Page
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="cirriculum"
                      className="
               flex gap-1 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-2"
                    >
                      <GraduationCap />
                      <span
                        className={`${
                          activeTab === "cirriculum" && "font-medium"
                        }`}
                        onClick={() => isSmallScreen && setOpen(false)}
                      >
                        Curriculum
                      </span>
                    </TabsTrigger>

                    <TabsTrigger
                      value="settings"
                      className="flex gap-1 px-2 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-2"
                    >
                      <Settings className="h-4" />
                      <span
                        className={`${
                          activeTab === "settings" && "font-medium"
                        }`}
                        onClick={() => {
                          isSmallScreen && setOpen(false);
                        }}
                      >
                        Settings
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="sm:block hidden">{`${currentCourseData.progress}/100`}</div>
            </div>
          )}
        </div>
      </ConfigurableGridBackground>
      <div className="sm:mx-16 p-6 pt-10 min-h-screen mx-0">
        <Tabs value={activeTab}>
          <TabsContent value="course landing page">
            <CourseLandingPage
              currentCourseData={currentCourseData}
              courseId={courseId}
            />
          </TabsContent>
          <TabsContent value="cirriculum">
            <LockComponent isLock={!courseId}>
              <CourseCurriculum
                courseId={courseId}
                isPublished={currentCourseData.isPublished}
              />
            </LockComponent>
          </TabsContent>
          <TabsContent value="settings">
            <LockComponent isLock={!courseId}>
              <CourseSetting courseId={courseId} />
            </LockComponent>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AddNewCoursePage;
