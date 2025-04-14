import {Link} from "react-router";
import Alert from "react-bootstrap/cjs/Alert";
import {FaWalking} from "@react-icons/all-files/fa/FaWalking";
import {FaMicrophone} from "@react-icons/all-files/fa/FaMicrophone";

export function MyAds({className=""}: {className?: string}) {
  return <Alert variant="primary" className={className}>
    <Link to="/walk"><FaWalking /> Try a walking desk</Link> to stay sharp while you study or work!
    <a href="/creator"><FaMicrophone /> Try Descript</a> for AI-enhanced content creation.
  </Alert>
}