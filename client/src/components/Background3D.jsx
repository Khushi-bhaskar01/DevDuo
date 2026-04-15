import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  MeshTransmissionMaterial, 
  Points, 
  PointMaterial, 
  Stars,
  PerspectiveCamera 
} from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const points = useRef();

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 15;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.set([x, y, z], i * 3);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    points.current.rotation.y += 0.001;
    points.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ef5d47"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

function GlassBlob({ position, color, size, speed, distort }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(t * speed) * 0.002;
    mesh.current.rotation.x = Math.cos(t * speed) * 0.1;
    mesh.current.rotation.y = Math.sin(t * speed) * 0.1;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={distort}
          distortionScale={0.5}
          temporalDistortion={0.2}
          transmission={1}
          color={color}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Background3D() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-canvas-container">
      <Canvas dpr={[1, isMobile ? 1 : 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ef5d47" />
        
        <Environment preset="city" />
        
        <group>
          <GlassBlob position={[-3, 2, -5]} color="#ef5d47" size={2.5} speed={1} distort={0.5} />
          {!isMobile && (
            <>
              <GlassBlob position={[4, -2, -8]} color="#111111" size={3.5} speed={0.8} distort={0.3} />
              <GlassBlob position={[-1, -4, -4]} color="#ffffff" size={1.2} speed={1.5} distort={0.8} />
            </>
          )}
        </group>

        <Particles count={isMobile ? 1000 : 3000} />
        <Stars radius={100} depth={50} count={isMobile ? 1000 : 2000} factor={4} saturation={0} fade speed={1} />
        
        <Rig />
      </Canvas>
    </div>
  );
}

