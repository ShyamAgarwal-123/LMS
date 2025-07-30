import ConfigurableGridBackground from "@/components/custom-bg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useAllStudentViewCourses } from "@/customhook/user-hook";
import { filterOptions, sortOptions } from "@/store/user/studentViewCoursePage";
import { ArrowUpDownIcon, FilterIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CourseSkeleton from "./CourseSkeleton";

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const { allStudentViewCoursesState, setAllStudentViewCoursesState, loading } =
    useAllStudentViewCourses(filters, sort);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const handleFilterOnChange = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption.id);
      } else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    Object.keys(cpyFilters).forEach((key) => {
      if (cpyFilters[key].length === 0) {
        delete cpyFilters[key];
      }
    });
    setFilters(cpyFilters);
  };
  const createSearchParamsHelper = (filtersParams) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filtersParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  };
  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);
  return (
    <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mt-1">
        Explore Courses
      </h1>

      {/* Mobile Filter Button - Only visible below 900px */}
      <div className="lg2:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FilterIcon className="h-4 w-4" />
          Filters
          {Object.keys(filters).length > 0 && (
            <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {Object.keys(filters).length}
            </span>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg2:flex-row gap-6 lg2:gap-8">
        {/* Filters Sidebar - Hidden by default below 900px */}
        <aside
          className={`
          fixed lg2:relative top-0 left-0 z-50 w-full h-full lg2:w-80 
          lg2:h-fit bg-white lg2:bg-gradient-to-b from-white/80 to-purple-50/80 
          lg2:backdrop-blur-sm rounded-none lg2:rounded-2xl p-4 lg2:p-8 
          shadow-xl lg2:border border-purple-100/50 overflow-auto
          transition-transform duration-300
          ${
            showMobileFilters
              ? "translate-x-0"
              : "-translate-x-full lg2:translate-x-0"
          }
        `}
        >
          {/* Mobile Filter Header */}
          <div className="flex lg2:hidden items-center justify-between mb-4 pb-4 border-b">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileFilters(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop Filter Header */}
          <div className="hidden lg2:flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Filters
            </h2>
            {Object.keys(filters).length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({})}
                className="text-sm text-gray-500 hover:text-purple-600"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="divide-y divide-gray-100">
            {Object.keys(filterOptions).map((keyItem) => (
              <div key={keyItem} className="py-4 lg2:py-6 first:pt-4 last:pb-4">
                <h3 className="flex items-center gap-2 font-bold text-gray-800 tracking-wide text-sm mb-3 lg2:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  {keyItem.toUpperCase()}
                </h3>
                <div className="space-y-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className={`flex items-center gap-3 p-2.5 lg2:p-3 rounded-lg transition-all cursor-pointer
                        ${
                          filters[keyItem]?.includes(option.id)
                            ? "bg-purple-50 border-purple-200 shadow-sm"
                            : "hover:bg-gray-50/50"
                        }`}
                    >
                      <Checkbox
                        checked={filters[keyItem]?.includes(option.id) || false}
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                        className={`border-2 ${
                          filters[keyItem]?.includes(option.id)
                            ? "border-purple-500"
                            : "border-gray-300"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span
                          className={`text-sm ${
                            filters[keyItem]?.includes(option.id)
                              ? "text-purple-700 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </span>
                        {option.count && (
                          <span className="text-xs text-gray-400">
                            {option.count} courses
                          </span>
                        )}
                      </div>
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile filters */}
        {showMobileFilters && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg2:hidden"
            onClick={() => setShowMobileFilters(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <span className="text-sm font-medium text-gray-500">
              {(allStudentViewCoursesState &&
                allStudentViewCoursesState.length) ||
                0}{" "}
              courses found
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-50"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {loading ? (
              <CourseSkeleton />
            ) : allStudentViewCoursesState &&
              allStudentViewCoursesState.length > 0 ? (
              allStudentViewCoursesState.map((courseItem) => (
                <Card
                  onClick={() => navigate(`/course/details/${courseItem._id}`)}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                  key={courseItem?._id}
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
                            courseItem?.videos_id.length <= 1
                              ? "Lecture"
                              : "Lectures"
                          }`}
                        </span>
                        <span className="hidden sm:inline text-gray-300">
                          •
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {courseItem?.level.toUpperCase()} Level
                        </span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start gap-4 mt-2 sm:mt-auto">
                        <p className="font-bold text-xl sm:text-2xl text-purple-600">
                          ${courseItem?.pricing}
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
              ))
            ) : (
              <div className="text-center py-8 md:py-12 bg-white/50 backdrop-blur-sm rounded-xl">
                <h2 className="text-xl font-semibold text-gray-600">
                  No Courses Found
                </h2>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
