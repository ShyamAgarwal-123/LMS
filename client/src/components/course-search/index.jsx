import { useState } from "react";
import { Search, TrendingUp, Users, Star, IndianRupee } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAllAdminCoursesState } from "@/store/admin";
import { useNavigate } from "react-router-dom";

function CourseSearch() {
  const [courses] = useAllAdminCoursesState();
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-heading font-semibold mb-4">
          Course Analytics
        </h2>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredCourses.length > 0 && (
          <div className="grid gap-2 mb-6">
            {filteredCourses.map((course) => (
              <Button
                key={course._id}
                variant={
                  selectedCourse._id === course._id ? "secondary" : "ghost"
                }
                className="justify-start h-auto p-3"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="text-left">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {course.students} students
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </Card>

      {selectedCourse && (
        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold mb-4">
            {selectedCourse.title}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Students</span>
              </div>
              <p className="text-2xl font-bold">{selectedCourse.students}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <IndianRupee className="h-4 w-4" />
                <span className="text-sm">Revenue</span>
              </div>
              <p className="text-2xl font-bold">
                &#8377;{selectedCourse.revenue.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span className="text-sm">Rating</span>
              </div>
              <p className="text-2xl font-bold">
                {selectedCourse.rating || 4.8}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Completion</span>
              </div>
              <p className="text-2xl font-bold">
                {selectedCourse.completion || 87}%
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/admin/${selectedCourse._id}`)}
            >
              Edit Course
            </Button>
            <Button variant="outline" size="sm">
              View Students
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default CourseSearch;
