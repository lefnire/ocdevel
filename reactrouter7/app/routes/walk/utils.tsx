import Button from 'react-bootstrap/cjs/Button';
import {FaYoutube} from "@react-icons/all-files/fa/FaYoutube";

export function VideoButton({
  label="Video",
  href,
}: {
  label?: string,
  href: string,
}) {
  // px-1
  const padding = {style: {paddingLeft: 1, paddingRight: 1}}
  return <Button
    variant='link'
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

// TODO consolidate this with above
export function VideoButtonLg({
  label="Video",
  href,
}: {
  label?: string,
  href: string,
}) {
  // px-1
  return <div>
    <Button
      className='my-2'
      variant='outline-primary'
      href={href}
      target="_blank"
    >
      <div className="d-flex align-items-center justify-content-center gap-2">
        <span><FaYoutube size={25} /></span>
        <span className="flex-grow-1">{label}</span>
      </div>
    </Button>
  </div>
}