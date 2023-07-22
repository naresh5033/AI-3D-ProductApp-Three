import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

//to place the camera position, so that our 3d img will appear at the proper size as we intended.
//ex we wanna move the camera bit closer, so the obj will be bigger
const CameraRig = ({ children }) => {
  const group = useRef(); //we can use this to update the state
  const snap = useSnapshot(state);

  // this hook will allow us to exec code on every rendered frame, so we can run diff effects, controls etc
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2]; //this initial vals will work better 
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {// if we re in the customizer page
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta) //current position, target, smooth time, delta

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,//current position
      [state.pointer.y / 10, -state.pointer.x / 5, 0], //the target - x,y,z axis
      0.25, //smooth time
      delta //the delta/difference
    )
  })


  return <group ref={group}>{children}</group>
}

export default CameraRig