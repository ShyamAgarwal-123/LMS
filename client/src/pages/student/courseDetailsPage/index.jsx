import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useStudentViewCurrentCourse } from "@/customhook/user-hook";
import { useStudentViewCourseDetailsState, useUserState } from "@/store/user";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  LockIcon,
  Play,
  PlayCircle,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPaymentOrder, verifyPayment } from "@/service";
import { useToast } from "@/hooks/use-toast";

function StudentViewCourseDetailsPage() {
  const { courseId } = useParams();
  const [{ user }] = useUserState();
  const { toast } = useToast();

  const navigate = useNavigate();
  const { studentViewCourseDetails: course, loading } =
    useStudentViewCurrentCourse(courseId);
  const handlePurchaseCourse = async () => {
    try {
      const orderRes = await createPaymentOrder(courseId);
      const order = orderRes?.data?.order;
      if (!order) {
        toast({
          title: "Error",
          description: "Failed to create payment order. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Laksay",
        description: course?.title,
        order_id: order.id,
        prefill: {
          name: user?.username,
          email: user?.email,
        },
        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: courseId,
              price_paid: order.amount / 100,
            });
            if (verifyRes?.success) {
              toast({
                title: "Payment Successful!",
                description:
                  "You have successfully purchased the course. Enjoy learning!",
                variant: "success",
              });
              // Refresh course state or navigate to course content
              window.location.reload(); // Simple refresh for now
            } else {
              toast({
                title: "Payment Verification Failed",
                description:
                  "There was an issue verifying your payment. Please contact support.",
                variant: "destructive",
              });
            }
          } catch (verifyError) {
            toast({
              title: "Payment Verification Error",
              description:
                "Failed to verify payment. Please contact support if amount was deducted.",
              variant: "destructive",
            });
          }
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast({
          title: "Payment Failed",
          description: `Payment failed: ${
            response.error.description || "Please try again."
          }`,
          variant: "destructive",
        });
      });
      rzp.open();
    } catch (error) {
      toast({
        title: "Payment Error",
        description:
          "Failed to initiate payment. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };
  const progress = Math.floor(
    (course?.completedLessons / course?.totalLessons) * 100
  );
  const [activeVideo, setActiveVideo] = useState(0);
  const getLevelBadgeClass = (level) => {
    const key = (level || "").toString().toLowerCase();
    if (key.includes("begin"))
      return "bg-green-100 text-green-700 border-green-200";
    if (key.includes("inter"))
      return "bg-amber-100 text-amber-700 border-amber-200";
    if (key.includes("adv")) return "bg-red-100 text-red-700 border-red-200";
    return "";
  };
  const getVideoIcon = (type, completed, isPurchased, freePreview) => {
    if (!isPurchased && !freePreview) return <LockIcon className="w-5 h-5" />;
    if (completed) return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (type === "exercise")
      return <FileText className="w-5 h-5 text-muted-foreground" />;
    return <PlayCircle className="w-5 h-5 text-muted-foreground" />;
  };
  if (loading) {
    return "loading...";
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Course Not Found
          </h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <Badge
                className={`mb-3 tracking-wide ${getLevelBadgeClass(
                  course.level
                )}`}
              >
                {course.level}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4 capitalize">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {course.totalLessons} lessons
                </div>
              </div>
            </div>

            {course.isPurchased ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    Course Progress
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {course.completedLessons}/{course.totalLessons} completed
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {progress}% complete
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader className="p-0">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Instructor
                  </h3>
                  <p className="text-muted-foreground">{course.instructor}</p>
                </div>

                <Separator />

                {course.isPurchased ? (
                  <Button className="w-full" size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                ) : (
                  <Button
                    onClick={handlePurchaseCourse}
                    className="w-full"
                    size="lg"
                  >
                    Buy now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">
                Video Lessons
              </h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {course.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`flex items-center p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors ${
                      activeVideo === index ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getVideoIcon(
                          video.type,
                          video.completed,
                          course.isPurchased,
                          video.freePreview
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {video.duration}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {video.type === "exercise" ? "Exercise" : "Video"}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {video.completed ? "Review" : "Watch"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">
                Course Overview
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {course.totalLessons}
                    </div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {course.duration}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {course.students.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Students
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {course.level}
                    </div>
                    <div className="text-sm text-muted-foreground">Level</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Dummy section future me develop karenge */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">
                Course Resources
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Course Slides (PDF)", size: "2.4 MB", type: "PDF" },
                  { name: "Source Code Examples", size: "1.8 MB", type: "ZIP" },
                  { name: "Exercise Solutions", size: "950 KB", type: "ZIP" },
                  {
                    name: "Additional Reading List",
                    size: "180 KB",
                    type: "PDF",
                  },
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
