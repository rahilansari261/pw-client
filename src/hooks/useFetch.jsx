import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice";
const baseUrl = "https://pw-backend.onrender.com/api/v1";

function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const fetchData = async (url) => {
    try {
      const response = await axios.get(`${baseUrl}/${url}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(response.data);
      setIsLoading(false);

      // dispatch(logout()); only call when status code is not 200
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
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData, postData, loginUser };
}

export default useFetch;
