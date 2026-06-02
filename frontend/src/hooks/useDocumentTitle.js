import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Jobify` : "Jobify - Find Your Dream Job";
  }, [title]);
};

export default useDocumentTitle;
