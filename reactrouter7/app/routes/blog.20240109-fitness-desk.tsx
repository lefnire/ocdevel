import {redirect, useNavigate} from "react-router";
import {useEffect} from "react";

export default function Redirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/walk")
  }, [])
  return null;
}