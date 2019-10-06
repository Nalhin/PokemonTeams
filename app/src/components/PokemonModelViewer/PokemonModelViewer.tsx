import * as React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from '@emotion/styled';
import { Camera, PerspectiveCamera, Renderer, Scene } from 'three';
import { RefObject } from 'react';

const StyledModelContainer = styled.div`
  height: 500px;
  width: 500px;
  margin: 0 auto;
`;

const cameraSettings = {
  fov: 90,
  aspect: 2,
  near: 0.1,
  far: 200,
};

const cameraPosition = {
  x: 0,
  y: 0,
  z: 8,
};

const configureCamera = (): PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    cameraSettings.fov,
    cameraSettings.aspect,
    cameraSettings.near,
    cameraSettings.far,
  );
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  return camera;
};

const configureRenderer = (
  modelContainer: RefObject<HTMLDivElement>,
): Renderer => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff, 1);

  const width = modelContainer.current.clientWidth;
  const height = modelContainer.current.clientHeight;
  renderer.setSize(width, height);

  return renderer;
};

const addLight = (scene: Scene): void => {
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
};

const loadModel = (scene: Scene, id: string): void => {
  const loader = new GLTFLoader();
  loader.load(
    `/models/${id}.glb`,
    gltf => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, 0, 0);
      console.log(model);
      scene.add(model);
    },
    undefined,
    error => {
      console.error(error);
    },
  );
};

const addOrbitCamera = (camera: Camera, renderer: Renderer): void => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.minDistance = 2;
  controls.maxDistance = 100;
  // controls.maxPolarAngle = Math.PI / 2;
  // controls.minPolarAngle = Math.PI / 2;
};

interface PokemonModelViewerProps {
  id: string;
}

const PokemonModelViewer: React.FC<PokemonModelViewerProps> = ({ id }) => {
  const modelContainer = React.useRef(null);

  React.useEffect(() => {
    const scene = new THREE.Scene();
    const camera = configureCamera();
    const renderer = configureRenderer(modelContainer);
    addLight(scene);
    loadModel(scene, id);
    addOrbitCamera(camera, renderer);

    const handleResize = (): void => {
      const width = modelContainer.current.clientWidth;
      const height = modelContainer.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };

    const animate = (): number => {
      const animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      return animationFrameId;
    };

    const animationFrameId = animate();

    modelContainer.current.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
      modelContainer.current.removeChild(renderer.domElement);
    };
  }, []);

  return <StyledModelContainer ref={modelContainer} />;
};

export default PokemonModelViewer;
