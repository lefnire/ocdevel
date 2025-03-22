import {Button} from "react-bootstrap";
import {FaYoutube} from "react-icons/fa";
import React from "react";

export function VideoButton({label="Video", href}: {label?: string, href: string}) {
  // px-1
  const padding = {style: {paddingLeft: 1, paddingRight: 1}}
  return <Button
    variant='link'
    size="sm"
    className="p-1"
    href={href}
    target="_blank"
  >
    <div className="d-flex align-items-center justify-content-center">
      <span {...padding} className="ps-0"><FaYoutube size={20} /></span>
      <span {...padding} className="flex-grow-1">{label}</span>
    </div>

  </Button>
}