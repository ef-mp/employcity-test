import React from "react";
import './style.css'
import {Children} from "../../../types/shared";

interface TruncateTextProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  children: Children,
  tag?: keyof JSX.IntrinsicElements,
  title?: string
}

export const TruncateText = (props: TruncateTextProps) => {
  const {
    tag: Tag = 'p',
    children,
    className,
    title,
    ...htmlAttributes
  } = props;

  return (
    <Tag
      title={typeof children === 'string' ? children : title}
      className={className}
      {...htmlAttributes}
    >
      <span className="truncate-text">
        {children}
      </span>
    </Tag>
  )
}