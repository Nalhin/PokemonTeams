import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RefObject } from 'react';

export default class ModelViewer {
  private static cameraSettings = {
    fov: 90,
    aspect: 2,
    near: 0.1,
    far: 200,
  };

  private static defaultCameraPosition = {
    x: 0,
    y: 0,
    z: 8,
  };

  private readonly scene: Scene;
  private readonly renderer: WebGLRenderer;
  private readonly camera: PerspectiveCamera;

  constructor() {
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });
    this.camera = new PerspectiveCamera(
      ModelViewer.cameraSettings.fov,
      ModelViewer.cameraSettings.aspect,
      ModelViewer.cameraSettings.near,
      ModelViewer.cameraSettings.far,
    );
  }

  public configureViewer(container: RefObject<HTMLDivElement>): void {
    this.configureCamera();
    this.configureRenderer(container);
    this.configureOrbitCamera();
    this.configureLight();
  }

  private configureCamera(): void {
    this.camera.position.set(
      ModelViewer.defaultCameraPosition.x,
      ModelViewer.defaultCameraPosition.y,
      ModelViewer.defaultCameraPosition.z,
    );
  }

  private configureRenderer(container: RefObject<HTMLDivElement>): void {
    this.renderer.setClearColor(0xffffff, 1);
    const width = container.current.clientWidth;
    const height = (3 * width) / 4;
    this.renderer.setSize(width, height, false);
  }

  private configureOrbitCamera(): void {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.screenSpacePanning = true;
    controls.minDistance = 2;
    controls.maxDistance = 100;
  }

  private configureLight(): void {
    const color = 0xffffff;
    const intensity = 1;
    const light = new AmbientLight(color, intensity);
    this.scene.add(light);
  }

  public loadModel(path: string): void {
    const loader = new GLTFLoader();
    loader.load(
      path,
      gltf => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(0, -2, 0);
        this.scene.add(model);
      },
      undefined,
      error => {
        console.error(error);
      },
    );
  }

  public handleResize(container: RefObject<HTMLDivElement>): void {
    const width = container.current.clientWidth;
    const height = (3 * width) / 4;
    this.renderer.setSize(width, height, false);
    this.renderer.render(this.scene, this.camera);
  }

  public animate(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public appendToContainer(container: RefObject<HTMLDivElement>): void {
    container.current.appendChild(this.renderer.domElement);
  }

  public removeFromContainer(container: RefObject<HTMLDivElement>): void {
    container.current.removeChild(this.renderer.domElement);
  }
}
