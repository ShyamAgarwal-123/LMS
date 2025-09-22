import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthPage from "./pages/auth";

import { RouterProvider } from "react-router";
import RouteGuard from "./components/route-guard";
import AdminPage from "./pages/admin";
import StudentLayout from "./components/student-view/StudentLayout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./components/instructor-view/courses/add-new-course/AddNewCoursePage";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/courseDetailsPage";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<RouteGuard element={<StudentLayout />} />}>
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
      </Route>
      <Route
        path="course/details/:courseId"
        element={<RouteGuard element={<StudentViewCourseDetailsPage />} />}
      />
      <Route path="auth" element={<RouteGuard element={<AuthPage />} />} />
      <Route path="admin" element={<RouteGuard element={<AdminPage />} />} />
      <Route
        path="admin/create-new-course"
        element={<RouteGuard element={<AddNewCoursePage />} />}
      />
      <Route
        path="admin/:courseId"
        element={<RouteGuard element={<AddNewCoursePage />} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
