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
import { useAllAdminCourses } from "@/customhook/admin-hook";
import { Delete, Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { allAdminCoursesDefault } from "@/store/admin";

function AdminCourseComponent() {
  const navigate = useNavigate();
  const { allAdminCoursesState, setAllAdminCoursesState, loading } =
    useAllAdminCourses();
  const handleEdit = (courseId) => {
    console.log(courseId);
    navigate(`/admin/${courseId}`);
  };
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="sm:text-2xl text-2xl font-bold">
          All Couses
        </CardTitle>
        <Button
          onClick={() => {
            navigate("/admin/create-new-course");
          }}
          className="sm:p-6 p-3 bg-blue-500 text-black font-bold hover:bg-blue-400"
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
