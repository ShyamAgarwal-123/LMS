import { CheckCircle, Clock, Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  course: {
    title,
    instructor,
    totalLessons,
    completedLessons,
    duration,
    imageUrl,
    status,
    courseId,
  },
}) => {
  const progress = Math.floor((completedLessons / totalLessons) * 100);
  const navigate = useNavigate();
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        );
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>;
      case "not-started":
        return <Badge variant="secondary">Not Started</Badge>;
      default:
        return null;
    }
  };
  return (
    <Card className="overflow-hidden hover:shadow-card-hover transition-shadow duration-300 border-card">
      <CardHeader className="p-0">
        <div className="relative">
          <img src={imageUrl} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4">{getStatusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 capitalize">
          {title}
        </h3>

        <p className="text-muted-foreground mb-4">{instructor}</p>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {completedLessons}/{totalLessons} lessons
            </span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {duration}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => navigate(`/course/details/${courseId}`)}
          className="w-full"
          variant={status === "completed" ? "outline" : "default"}
        >
          {status === "completed" ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Review Course
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              {status === "not-started" ? "Start Course" : "Continue Learning"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
