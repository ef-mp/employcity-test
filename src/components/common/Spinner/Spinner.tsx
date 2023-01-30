import React from "react";
import {BiLoaderAlt} from "react-icons/bi";
import './style.css'

interface SpinnerProps {
  loading? : boolean
}

export const Spinner = ({loading = false}: SpinnerProps) => {

  if (!loading) return null

  return (
    <div className="spinner">
      <BiLoaderAlt />
    </div>
  )
}