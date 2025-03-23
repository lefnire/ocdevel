import {useNavigate} from "react-router";
import {useEffect} from "react";

export default function Redirects({params, matches}) {
  const navigate = useNavigate();
  useEffect(() => {
    // TODO remove since we're using SST Router
    const path = params["*"]
    if (path.startsWith("podcast")) {
      navigate("/mlg")
    } else if ([
      "20240110-fitness-desk",
      // "blog/20240109-fitness-desk"
    ].includes(path)) {
      navigate("/walk")
    } else {
      navigate("/")
    }
  }, [])
  return null;
}