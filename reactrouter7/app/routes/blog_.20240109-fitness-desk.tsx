import {redirect, redirectDocument, useNavigate} from "react-router";
import {useEffect} from "react";

export function loader() {
  return redirectDocument("/walk")
}

export default function Redirect() {
  return null;
}