import { useState } from "react";
import axios from "axios";
const baseUrl = "https://pw-backend.onrender.com/api/v1";

function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchData = async (url) => {
    try {
      const response = await axios.get(`${baseUrl}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const postData = async (formData, url) => {
    try {
      const response = await axios.post(`${baseUrl}/${url}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData, postData };
}

export default useFetch;
