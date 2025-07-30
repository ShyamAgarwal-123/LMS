import { Button } from "@/components/ui/button";
import { useAllStudentViewCourses } from "@/customhook/user-hook";
import { courseCategories } from "@/store/admin";

function StudentHomePage() {
  const { allStudentViewCoursesState, setAllStudentViewCoursesState, loading } =
    useAllStudentViewCourses();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-5xl font-bold mb-4">Learning that gets you</h1>
          <p>Skills for your present and your future. Get Started with Us</p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            className="rounded-lg w-full shadow-lg h-auto"
            width={600}
            height={400}
            src="https://c8.alamy.com/comp/2BDAAKE/vector-horizontal-banner-of-lms-2BDAAKE.jpg"
            alt="#"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allStudentViewCoursesState &&
          allStudentViewCoursesState.length > 0 ? (
            allStudentViewCoursesState.map((courseItem) => (
              <div
                className="border rounded-lg overflow-hidden hover:scale-[1.1] transition-[0.5] translate-y-2"
                key={courseItem.title}
              >
                <img
                  src={courseItem?.thumbnail}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-[16px] font-bold">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
