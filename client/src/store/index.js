import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true, // are we gon display the logo on our shirt
  isFullTexture: false,
  logoDecal: './threejs.png', // the initial logo
  fullDecal: './threejs.png', // the initial full texture
});

export default state;