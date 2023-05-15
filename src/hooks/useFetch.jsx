import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);        
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {        
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
