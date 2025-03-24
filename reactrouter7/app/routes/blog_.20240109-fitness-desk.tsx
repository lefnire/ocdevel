import {redirect, redirectDocument, useNavigate} from "react-router";
import {useEffect} from "react";

// export function loader() {
//   console.log("redirecting")
//   return redirectDocument("/walk")
// }

export default function Redirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/walk")
  }, [])
  return null;
}

export function links() {
  return [
    { rel: "canonical", href: "https://ocdevel.com/walk" },
  ];
}