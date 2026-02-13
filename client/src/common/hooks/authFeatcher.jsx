import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducer"; // your slice
import { useGetUserQuery } from "../../services/apiSlice";

export default function AuthFetcher() {
  const dispatch = useDispatch();
  const { data: user, isSuccess } = useGetUserQuery();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
    }
  }, [isSuccess, user, dispatch]);

  return null; // doesn’t render anything
}
