import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const HeroCanvasComponent = () => {
  const canvasRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    // console.log("Component mounted");

    // THE SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x0034f0, 2, 6);

    let lavaMesh;
    // LOAD MODEL
    const loader = new GLTFLoader();
    loader.load("src/assets/untitleddonut2.glb", function (gltf) {
      lavaMesh = gltf.scene;
      scene.add(lavaMesh);
      lavaMesh.scale.set(2, 2, 2);
      lavaMesh.position.set(0, 0, 0);
    });

    // SIZE
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // THE CAMERA
    const camera = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 3;

    // THE LIGHT
    const light = new THREE.DirectionalLight(0x11eeff, 3);
    light.position.set(1, 1, 1);
    scene.add(light);

    const secondLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(secondLight);

    // THE RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);

    // RESIZE
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableRotate = true;

    const handleScroll = () => {
      // console.log("scroll event triggered");
      scrollPositionRef.current = window.scrollY;
      // console.log("Scroll position:", scrollPositionRef.current);
      const rotationAngle = scrollPositionRef.current * 0.0001;
      // console.log("Rotation angle:", rotationAngle);
      controls.target.set(
        Math.sin(rotationAngle) * 5,
        camera.position.y,
        Math.cos(rotationAngle) * 5
      );
      controls.update();
      // console.log("controls.target:", controls.target);
    };

    document.addEventListener("scroll", handleScroll);
    // console.log("Scroll event listener added");

    // ANIMATE
    const loop = () => {
      controls.update();

      if (lavaMesh) {
        lavaMesh.rotation.x += 0.0011; // Rotate on x-axis
      }
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();

    // TIMELINE
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

    // Cleanup function
    return () => {
      document.removeEventListener("scroll", handleScroll);
      // console.log("Scroll event listener removed");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="webgl"></canvas>

      <nav></nav>
      <h1 className="title">DENNIS GUSTAVSSON</h1>

      {/* Add scrollable content */}
      {/* <div style={{ height: "200vh" }}></div> */}
    </>
  );
};

export default HeroCanvasComponent;
