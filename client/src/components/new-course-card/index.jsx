import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const NewCourseCard = ({ courseItem }) => {
  const navigate = useNavigate();
  console.log(courseItem);

  return (
    <Card
      onClick={() => navigate(`/course/details/${courseItem._id}`)}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      <CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="w-full sm:w-56 h-48 sm:h-40 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={courseItem?.thumbnail}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={courseItem?.title}
          />
        </div>
        <div className="flex-1 space-y-3">
          <CardTitle className="text-xl sm:text-2xl font-bold hover:text-purple-600 transition-colors line-clamp-2">
            {courseItem?.title}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {`${courseItem?.videos_id?.length} ${
                courseItem?.videos_id.length <= 1 ? "Lecture" : "Lectures"
              }`}
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              {courseItem?.level.toUpperCase()} Level
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4 mt-2 sm:mt-auto">
            <p className="font-bold text-xl sm:text-2xl text-purple-600">
              &#8377; {Number(courseItem?.pricing).toLocaleString("en-IN")}
            </p>
            <Button
              variant="ghost"
              className="sm:hidden hover:text-purple-600"
              size="sm"
            >
              View Details →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewCourseCard;
