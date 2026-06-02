import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

function FilterCard() {
  const { allJobs } = useSelector((store) => store.job);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(String(selectedValue)));

    // Cleanup function to reset searchedQuery on unmount
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [selectedValue, dispatch]);

  const getUniqueValues = (key) => {
    const values = allJobs?.map((job) => job[key]).filter(Boolean);
    return [...new Set(values?.map((value) => value.toLowerCase()))];
  };

  const uniqueTitles = getUniqueValues("title");
  const uniqueLocations = getUniqueValues("location");

  return (
    <div className="w-full p-6 rounded-2xl glass shadow-lg border border-gray-100 animate-fade-in-up sticky top-24">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-extrabold text-xl text-gray-900">Filter Jobs</h1>
        {selectedValue && (
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full cursor-pointer hover:bg-primary/20 transition-colors" onClick={() => setSelectedValue("")}>
            Clear
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">Refine your job search</p>
      <hr className="mb-6 border-gray-100" />

      {/* Title Filter */}
      <div className="mt-4">
        <h2 className="font-bold text-md text-gray-800 mb-4">Job Titles</h2>
        <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-3">
          <div className="flex items-center space-x-3 group">
            <RadioGroupItem value="" id="all-jobs" className="text-primary border-gray-300 group-hover:border-primary transition-colors" />
            <Label htmlFor="all-jobs" className="text-gray-600 font-medium cursor-pointer group-hover:text-gray-900 transition-colors">All Jobs</Label>
          </div>
          {uniqueTitles.map((title, idx) => (
            <div key={idx} className="flex items-center space-x-3 group">
              <RadioGroupItem value={title} id={`title-${idx}`} className="text-primary border-gray-300 group-hover:border-primary transition-colors" />
              <Label htmlFor={`title-${idx}`} className="text-gray-600 font-medium cursor-pointer group-hover:text-gray-900 transition-colors">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <hr className="my-6 border-gray-100" />

      {/* Location Filter */}
      <div className="mt-4">
        <h2 className="font-bold text-md text-gray-800 mb-4">Locations</h2>
        <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-3">
          <div className="flex items-center space-x-3 group">
            <RadioGroupItem value="" id="all-locations" className="text-primary border-gray-300 group-hover:border-primary transition-colors" />
            <Label htmlFor="all-locations" className="text-gray-600 font-medium cursor-pointer group-hover:text-gray-900 transition-colors">All Locations</Label>
          </div>
          {uniqueLocations.map((location, idx) => (
            <div key={idx} className="flex items-center space-x-3 group">
              <RadioGroupItem value={location} id={`loc-${idx}`} className="text-primary border-gray-300 group-hover:border-primary transition-colors" />
              <Label htmlFor={`loc-${idx}`} className="text-gray-600 font-medium cursor-pointer group-hover:text-gray-900 transition-colors">
                {location}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default FilterCard;
