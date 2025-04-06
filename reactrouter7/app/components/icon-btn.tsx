import Button from "react-bootstrap/cjs/Button";
import {memo, type PropsWithChildren, type ReactElement} from "react";
import type {ButtonProps} from "react-bootstrap/cjs/Button";

export const sizes = {
  sm: {k: 'sm', v: 16},
  lg: {k: 'lg', v: 20},
  base: {k: undefined, v: 20},
}

type IconButton = {
  icon: ReactElement
  icon2?: ReactElement
  label: string
  btnProps: ButtonProps

  left?: boolean
  vr?: boolean
  size?: 'sm' | 'lg' | undefined
  className?: string
  href?: string
}
export const IconButton = ({
  icon,
  icon2,
  label,
  btnProps,
  size=sizes.base.k,
  left=false,
  vr=true,
}: IconButton) => {
  const {className, ...rest} = btnProps
  return <Button
    variant='outline-dark'
    className={[
      'd-flex align-items-center',
      left ? 'justify-content-start' : 'justify-content-center',
      className || ''
    ].join(" ")}
    size={size}
    {...rest}
  >
    <span className={[
      `btn-pad-${size} ps-0`,
      vr ? 'border-end' : ''
    ].join(" ")}>
      {icon}
    </span>
    {icon2 && <span className={`btn-pad-${size}`}>
      {icon2}
    </span>}
    <span
      className={[
        `btn-pad-${size}`,
        left ? '' : 'flex-grow-1'
      ].join(" ")}
    >{label}</span>
  </Button>
}
// TODO memo, with equality function based on everything except icon