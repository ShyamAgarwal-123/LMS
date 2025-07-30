import { useStudentViewCurrentCourse } from "@/customhook/user-hook";
import { useStudentViewCourseDetailsState } from "@/store/user";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const { courseId } = useParams();
  const { studentViewCourseDetails, loading } =
    useStudentViewCurrentCourse(courseId);
  return <div className="container mx-auto p-4"></div>;
}

export default StudentViewCourseDetailsPage;
