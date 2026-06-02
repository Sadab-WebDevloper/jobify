import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

function CategoryCarousal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    if (query) {
      navigate("/browse");
    }
  };
  return (
    <div className="relative py-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center md:basis-1/2 lg:basis-1/3 px-3 py-4"
            >
              <Button
                variant="outline"
                className="rounded-full w-full text-center bg-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white border border-gray-200 shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium text-gray-700"
                onClick={() => searchJobHandler(cat)}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="bg-white hover:bg-gray-50 border-gray-200 text-primary shadow-md hover:scale-110 transition-transform" />
          <CarouselNext className="bg-white hover:bg-gray-50 border-gray-200 text-primary shadow-md hover:scale-110 transition-transform" />
        </div>
      </Carousel>
    </div>
  );
}

export default CategoryCarousal;
