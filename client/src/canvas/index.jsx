import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  return ( //everything(shirt, bakdrop, camerarig) will go inside the canvas
    <Canvas 
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }} // the fov to make our obj look closer, the lower the val the closer the obj is
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      {/*  Environment helper which produces a great effect and is much easier to use. */}
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel