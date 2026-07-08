import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";
import { useMemo } from "react";

function CategoryCarousal() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { allJobs } = useSelector((state) => state.job);

  const category = useMemo(() => {
    if (!allJobs || allJobs.length === 0) {
      return [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer",
      ];
    }
    return [...new Set(allJobs.map((job) => job.title))];
  }, [allJobs]);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
  };
  return (
    <div className="relative pt-12 pb-2 animate-fade-in-up bg-slate-900" style={{ animationDelay: '0.5s' }}>
      <Carousel className="w-full max-w-xl mx-auto my-4 relative z-10">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center md:basis-1/2 lg:basis-1/3 px-3 py-4"
            >
              <Button
                variant="outline"
                className="rounded-full w-full text-center bg-slate-800 text-slate-300 border-slate-700 hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 hover:text-white hover:border-transparent shadow-lg shadow-slate-900/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-teal-500/25 font-medium"
                onClick={() => searchJobHandler(cat)}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="bg-slate-800 text-teal-400 border-slate-700 hover:bg-slate-700 hover:text-teal-300 shadow-md hover:scale-110 transition-transform" />
          <CarouselNext className="bg-slate-800 text-teal-400 border-slate-700 hover:bg-slate-700 hover:text-teal-300 shadow-md hover:scale-110 transition-transform" />
        </div>
      </Carousel>
    </div>
  );
}

export default CategoryCarousal;
