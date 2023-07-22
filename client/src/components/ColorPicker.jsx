import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

//the color picker tab in the left side of the customizer 
const ColorPicker = () => {
  const snap = useSnapshot(state); //current state

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker 
        color={snap.color} //the color(default) from our state/store
        disableAlpha //opacity
        onChange={(color) => state.color = color.hex} //onchange to pick the hex color, we can also add the additionla prop to add our preset colors
        // presetColors={[#hexcolor, if we wana add more preset colors]}
      />
    </div>
  )
}

export default ColorPicker