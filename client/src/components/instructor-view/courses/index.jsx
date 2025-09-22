import _ from "lodash";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllAdminCourses } from "@/customhook/admin-hook";
import { Delete, Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { allAdminCoursesDefault, useAllAdminCoursesState } from "@/store/admin";

// Skeleton Loading Component
function CoursesSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-40" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right sm:pr-9">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AdminCourseComponent() {
  const navigate = useNavigate();
  const { allAdminCoursesState, setAllAdminCoursesState, loading } =
    useAllAdminCourses();
  // const [allAdminCoursesState] = useAllAdminCoursesState();
  const handleEdit = (courseId) => {
    console.log(courseId);
    navigate(`/admin/${courseId}`);
  };
  if (loading) {
    return <CoursesSkeleton />;
  }
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="sm:text-2xl text-2xl font-bold font-heading uppercase tracking-wider text-foreground">
          All Courses
        </CardTitle>
        <Button
          onClick={() => {
            navigate("/admin/create-new-course");
          }}
          className="sm:p-6 p-3 bg-primary font-bold"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right sm:pr-9">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-2">
            {allAdminCoursesState && allAdminCoursesState.length > 0 ? (
              allAdminCoursesState.map((course) => {
                if (_.isEqual(course, allAdminCoursesDefault[0])) {
                  return;
                }
                return (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>${course.revenue}</TableCell>
                    <TableCell className="text-right sm:flex-row flex-col flex sm:justify-end items-end">
                      <Button
                        onClick={() => handleEdit(course._id)}
                        variant="ghost"
                      >
                        <Edit className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost">
                        <Delete className="h-6 w-6w-full" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <h1>No Courses</h1>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminCourseComponent;
