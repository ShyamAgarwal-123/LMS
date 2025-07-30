import CommonForm from "@/components/common-form";
import _ from "lodash";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  courseLandingPageFormFields,
  useCourseLandingPage,
  useCurrentCourseLandingPage,
} from "@/store/admin";
import React, { useEffect } from "react";

function CourseLandingPage({ courseId, currentCourseData }) {
  const {
    courseLandingPageState,
    setCourseLandingPageState,
    handleSubmit,
    loading: submitLoading,
  } = useCourseLandingPage();

  const {
    currentCourseState,
    currentCourseLandingPageState,
    setCurrrentCourseLandingPageState,
    handleUpdate,
    loading: updateLoading,
  } = useCurrentCourseLandingPage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Landing Page</CardTitle>
        <CardDescription>
          {courseId
            ? "Wants to Update Your Course You Came At Right Place! Start Changing"
            : "Fill the Fields to Procced"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CommonForm
          buttonText={courseId ? "Update" : "Submit"}
          loading={submitLoading || updateLoading ? "Loading.." : null}
          courseId={courseId}
          handleSubmit={courseId ? handleUpdate : handleSubmit}
          formData={
            courseId ? currentCourseLandingPageState : courseLandingPageState
          }
          setFormData={
            courseId
              ? setCurrrentCourseLandingPageState
              : setCourseLandingPageState
          }
          formFields={courseLandingPageFormFields}
        />
      </CardContent>
    </Card>
  );
}

export default CourseLandingPage;
