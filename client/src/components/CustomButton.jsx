import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';
import { getContrastingColor } from '../config/helpers';
// this get contrasting color from the helper was given chatgpt, its helpful when the picker color will not contrast with the color of the obj. so if the obj is white, then picker color will black and vise versa fort the color contrasting

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  // as our btn is filled 
  const generateStyle = (type) => {

    // we ve our initial state from the vatio let's use that
    if(type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color) //the color of the picker will change acc to the contrast of the obj
      }
    } else if(type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick} // once we click it, we'll no longer be in the home page as the snap.intro= false (in the home page) in the handle clickfn
    >
      {title}
    </button>
  )
}

export default CustomButton