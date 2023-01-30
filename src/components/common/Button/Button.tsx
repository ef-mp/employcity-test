import React, {useMemo} from "react";
import cn from 'classnames'
import './style.css'
import {Children} from "../../../types/shared";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: Children,
  className?: string
}

export const Button = (props: ButtonProps) => {

  const {
    children,
    className,
    ...htmlAttributes
  } = props

  const btnClassName = useMemo(
    () => cn('button', className),
    [className]
  )

  return (
    <button
      {...htmlAttributes}
      className={btnClassName}
    >
      {children}
    </button>
  )
}