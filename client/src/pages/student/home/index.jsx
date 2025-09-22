import CourseCard from "@/components/purchased-course-card";
import StatsCard from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import {
  useAllStudentViewCourses,
  useStudentAllPurchasedCourses,
} from "@/customhook/user-hook";
import { courseCategories } from "@/store/admin";
import { useUserState } from "@/store/user";
import { BookOpen, Clock, IndianRupee, TrendingUp, Users } from "lucide-react";
import { use, useState } from "react";

function StudentHomePage() {
  const {
    studentAllPurchasedCoursesState,
    setStudentAllPurchasedCoursesState,
    loading,
  } = useStudentAllPurchasedCourses();
  console.log(studentAllPurchasedCoursesState);

  const [date, setDate] = useState(Date.now());
  const [user] = useUserState();
  let completedCourse = 0;
  studentAllPurchasedCoursesState.forEach((course) => {
    if (course.status === "completed") {
      completedCourse++;
    }
  });
  const hr = new Date(date).getHours();

  let greetings;
  if (hr > 4 && hr < 12) {
    greetings = "Good morning";
  } else if (hr >= 12 && hr < 16) {
    greetings = "Good afternoon";
  } else if (hr >= 16 && hr < 24) {
    greetings = "Good evening";
  } else {
    greetings = "Hey";
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  // let course = {
  //   title: "React Fundamentals",
  //   instructor: "Sarah Johnson",
  //   status: "completed",
  //   completedLessons: 24,
  //   totalLessons: 24,
  //   imageUrl:
  //     "https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png",
  //   duration: "18 hr",
  // };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold">
          {greetings}, {user.user.username} 👋
        </h1>
        <p className="text-muted-foreground">
          Let's continue your learning journey. You're doing great!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Enrolled Courses"
          value={studentAllPurchasedCoursesState.length}
          // change="+12.5% from last month"
          // changeType="positive"
          icon={Users}
          gradient
        />
        <StatsCard
          title="Hours Studied"
          value={"123"}
          // change="+8.2% from last month"
          // changeType="positive"
          icon={Clock}
        />
        <StatsCard
          title="Completed Courses"
          value={completedCourse}
          // change="2 new this month"
          // changeType="neutral"
          icon={BookOpen}
        />
        <StatsCard
          title="Completion Rate"
          value="87.3%"
          change="+5.1% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentAllPurchasedCoursesState.length > 0 ? (
              studentAllPurchasedCoursesState.map((course) => {
                return <CourseCard course={course} key={course._id} />;
              })
            ) : (
              <div>No Purchased Course</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomePage;
