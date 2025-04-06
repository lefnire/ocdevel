import {useNavigate} from "react-router";
import {useCallback} from "react";
import Button from "react-bootstrap/cjs/Button";
import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft";

interface BackButton {
  to?: string
  label?: string
}
export const BackButton = ({to, label="Back"}: BackButton) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  }, [to])

  return <Button
    className="text-dark mb-2"
    variant="link"
    onClick={onClick}
  >
    <FaArrowLeft /> {label}
  </Button>
};