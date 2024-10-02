import * as THREE from 'three';
import { ARJSContext, ARJSMarkerControls } from 'ar.js';

const arToolkitContext = new ARJSContext({
  sourceType: 'webcam',
  detectionMode: 'colorBlob', // Use colorBlob for NFT tracking
});

arToolkitContext.init(function (err) {
  if (err) {
    console.error(err);
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Load the NFT marker image (replace with your actual NFT image)
  const markerImage = new Image();
  markerImage.src = 'marker.jpg';

  markerImage.onload = function () {
    const markerControls = new ARJSMarkerControls(arToolkitContext, markerImage, {
      changeMatrixMode: 'qr', // Use QR matrix mode for NFT tracking
    });
    scene.add(markerControls.object3D);

    // Create a 3D model to be displayed on the marker
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    markerControls.object3D.add(cube);
  };

  function animate() {
    arToolkitContext.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
});