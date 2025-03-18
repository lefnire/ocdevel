import {useNavigate} from "react-router";
import {useEffect} from "react";

export default function Redirects({params, matches}) {
  const navigate = useNavigate();
  useEffect(() => {
    const path = params["*"]
    if (path.startsWith("podcast")) {
      navigate("/mlg")
    } else if ([
      "walk",
      "20240110-fitness-desk",
    ].includes(path)) {
      navigate("/blog/20240109-fitness-desk")
    } else {
      navigate("/")
    }
  }, [])
  return null;
}