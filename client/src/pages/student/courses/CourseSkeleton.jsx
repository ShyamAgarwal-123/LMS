import { Card, CardContent, CardTitle } from "@/components/ui/card";

function CourseSkeleton() {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="w-full sm:w-56 h-48 sm:h-40 flex-shrink-0 overflow-hidden rounded-xl bg-gray-200 animate-pulse"></div>
        <div className="flex-1 space-y-3">
          <div className="h-7 sm:h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4 mt-2 sm:mt-auto">
            <div className="h-7 sm:h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="sm:hidden h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSkeleton;
