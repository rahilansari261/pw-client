import { useState, useEffect } from "react";
const baseUrl = "https://pw-backend.onrender.com/api/v1";
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  async function fetchData() {
    try {
      const response = await fetch(`${baseUrl}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async (formData) => {
    try {
      const response = await fetch(`${baseUrl}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData, postData };
}

export default useFetch;
