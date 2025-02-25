import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useGetProducts } from "./query"; // Your custom hook for fetching products
import Header from "./header";
import Select from "react-select";

const Floor: React.FC<{ texture: THREE.Texture | null; width: number; depth: number }> = ({ texture, width, depth }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  }

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[width, depth]} />
      {texture && <meshStandardMaterial attach="material" map={texture} roughness={0.5} metalness={0.5} />}
    </mesh>
  );
};

const Wall: React.FC<{ texture: THREE.Texture | null; position: [number, number, number]; rotation: [number, number, number]; width: number; height: number }> = ({
  texture,
  position,
  rotation,
  width,
  height,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  }

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      {texture && <meshStandardMaterial attach="material" map={texture} roughness={0.5} metalness={0.5} />}
    </mesh>
  );
};

const ThreeDModel: React.FC = () => {
  const [floorTexture, setFloorTexture] = useState<THREE.Texture | null>(null);
  const [wallTexture, setWallTexture] = useState<THREE.Texture | null>(null);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(10);
  const [height, setHeight] = useState(10);

  const { data: products, isLoading, error } = useGetProducts();

  useEffect(() => {
    if (products && products.length > 0) {
      const floorImage = products[0].image; // Assuming you're using the first product's image for the floor
      const wallImage = products[1]?.image; // Using the second product's image for the wall, if available

      const loader = new THREE.TextureLoader();
      if (floorImage) {
        loader.load(floorImage.startsWith("data:image") ? floorImage : `http://localhost:3000/uploads/${floorImage}`, (texture) => {
          setFloorTexture(texture);
        });
      }
      if (wallImage) {
        loader.load(wallImage.startsWith("data:image") ? wallImage : `http://localhost:3000/uploads/${wallImage}`, (texture) => {
          setWallTexture(texture);
        });
      }
    }
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Error loading textures</div>;
  }

  const handleTextureChange = (textureURL: string, isFloor: boolean) => {
    if (!textureURL) return; // Early return if textureURL is null or empty

    const loader = new THREE.TextureLoader();
    loader.load(textureURL, (texture) => {
      if (isFloor) {
        setFloorTexture(texture);
      } else {
        setWallTexture(texture);
      }
    });
  };

  const productOptions = products?.map((product) => ({
    label: product.item_name,
    value: product.image,
    imageUrl: product.image.startsWith("data:image") ? product.image : `http://localhost:3000/uploads/${product.image}`,
  })) || [];

  // Use formatOptionLabel to customize the display of options
  const customFormatOptionLabel = (data: any) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={data.imageUrl} alt={data.label} style={{ width: 30, height: 30, marginRight: 10 }} />
      {data.label}
    </div>
  );

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center p-4">
      <Header />
      <div className="w-full h-[75vh]">
      <Canvas camera={{ position: [width * 1.5, height * 1.5, depth * 1.5], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={4} /> {/* Increased ambient light */}
        <pointLight position={[10, 10, 10]} intensity={3} /> {/* Increased point light */}
        <directionalLight position={[0, 10, 0]} intensity={3} /> {/* Increased directional light */}
        <hemisphereLight intensity={1.5} color={new THREE.Color(0xFFFFFF)} groundColor={new THREE.Color(0x444444)} position={[10, 10, 10]} />

        <group position={[0, -height / 2, 0]}>
          <Floor texture={floorTexture} width={width} depth={depth} />
          <Wall texture={wallTexture} position={[0, height / 2, -depth / 2]} rotation={[0, 0, 0]} width={width} height={height} />
          <Wall texture={wallTexture} position={[0, height / 2, depth / 2]} rotation={[0, Math.PI, 0]} width={width} height={height} />
          <Wall texture={wallTexture} position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} width={depth} height={height} />
          <Wall texture={wallTexture} position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} width={depth} height={height} />
        </group>

        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 mt-4">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <label className="text-lg font-medium flex flex-col items-center">
            Floor Texture:
            <Select
              options={productOptions}
              onChange={(option) => {
                if (option) {
                  handleTextureChange(option.value, true); // Set the floor texture
                }
              }}
              getOptionLabel={(e) => e.label}
              formatOptionLabel={customFormatOptionLabel}
              menuPlacement="top"
              className="mt-2"
            />
          </label>

          <label className="text-lg font-medium flex flex-col items-center">
            Wall Texture:
            <Select
              options={productOptions}
              onChange={(option) => {
                if (option) {
                  handleTextureChange(option.value, false); // Set the wall texture
                }
              }}
              getOptionLabel={(e) => e.label}
              formatOptionLabel={customFormatOptionLabel}
              menuPlacement="top"
              className="mt-2"
            />
          </label>
        </div>

        {/* Sliders for dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="flex flex-col items-center text-lg font-medium">
            Width: {width}
            <input type="range" min={5} max={30} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full mt-2" />
          </label>
          <label className="flex flex-col items-center text-lg font-medium">
            Depth: {depth}
            <input type="range" min={5} max={30} value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full mt-2" />
          </label>
          <label className="flex flex-col items-center text-lg font-medium">
            Height: {height}
            <input type="range" min={5} max={20} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full mt-2" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ThreeDModel;
