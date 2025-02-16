import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import Header from './header';

// Room Component
const Room = ({ dimensions, wallColor, floorColor }: { dimensions: { width: number, height: number, depth: number }, wallColor: string, floorColor: string }) => {
  return (
    <>
      {/* Room Walls */}
      <Box args={[dimensions.width, dimensions.height, 0.2]} position={[0, dimensions.height / 2, -dimensions.depth / 2]}>
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box args={[dimensions.width, dimensions.height, 0.2]} position={[0, dimensions.height / 2, dimensions.depth / 2]}>
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box args={[0.2, dimensions.height, dimensions.depth]} position={[-dimensions.width / 2, dimensions.height / 2, 0]}>
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box args={[0.2, dimensions.height, dimensions.depth]} position={[dimensions.width / 2, dimensions.height / 2, 0]}>
        <meshStandardMaterial color={wallColor} />
      </Box>

      {/* Floor */}
      <Plane args={[dimensions.width, dimensions.depth]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={floorColor} />
      </Plane>
    </>
  );
};

// Stairs Component
const Stairs = ({ numSteps, stepHeight, roomDimensions, stairColor }: { numSteps: number, stepHeight: number, roomDimensions: { width: number, depth: number }, stairColor: string }) => {
  const stepWidth = roomDimensions.width / 4;
  const stepDepth = roomDimensions.depth / 5;

  const stairsArray = [];
  for (let i = 0; i < numSteps; i++) {
    stairsArray.push(
      <Box
        key={i}
        args={[stepWidth, stepHeight, stepDepth]}
        position={[0, stepHeight * (i + 1), roomDimensions.depth / 2 - stepDepth * (i + 1)]}
      >
        <meshStandardMaterial color={stairColor} />
      </Box>
    );
  }

  return <>{stairsArray}</>;
};

const Visualizer = () => {
  const [view, setView] = useState<'room' | 'stairs'>('room');
  const [dimensions, setDimensions] = useState({ width: 10, height: 5, depth: 10 });
  const [stairsSettings, setStairsSettings] = useState({ numSteps: 5, stepHeight: 0.5 });
  const [wallColor, setWallColor] = useState('#BFEFFF'); // Light pastel blue
  const [floorColor, setFloorColor] = useState('#D3F8D3'); // Light pastel green
  const [stairColor, setStairColor] = useState('#D2B48C'); // Light brown/tan

  return (
    
    <div className="h-screen bg-gray-50">
        <Header />


      {/* Toggle View Buttons */}
      <div className="absolute top-4 left-4 z-10 space-x-4">
        <button onClick={() => setView('room')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">Room</button>
        <button onClick={() => setView('stairs')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">Stairs</button>
      </div>

      <Canvas camera={{ position: [15, 15, 15], fov: 50 }} className="h-full">
        {/* Lighting Setup */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[0, 5, 0]} intensity={1.5} />

        {/* Conditional rendering based on selected view */}
        {view === 'room' && <Room dimensions={dimensions} wallColor={wallColor} floorColor={floorColor} />}
        {view === 'stairs' && <Stairs numSteps={stairsSettings.numSteps} stepHeight={stairsSettings.stepHeight} roomDimensions={dimensions} stairColor={stairColor} />}

        <OrbitControls />
      </Canvas>

      {/* Customization Controls */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-lg flex justify-center gap-8">
        {view === 'room' && (
          <>
            <div>
              <label className="block text-sm text-gray-700">Width</label>
              <input
                type="range"
                min="5"
                max="20"
                value={dimensions.width}
                onChange={(e) => setDimensions((prev) => ({ ...prev, width: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Height</label>
              <input
                type="range"
                min="5"
                max="20"
                value={dimensions.height}
                onChange={(e) => setDimensions((prev) => ({ ...prev, height: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Depth</label>
              <input
                type="range"
                min="5"
                max="20"
                value={dimensions.depth}
                onChange={(e) => setDimensions((prev) => ({ ...prev, depth: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
            {/* Color Pickers for Room */}
            <div>
              <label className="block text-sm text-gray-700">Wall Color</label>
              <input
                type="color"
                value={wallColor}
                onChange={(e) => setWallColor(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Floor Color</label>
              <input
                type="color"
                value={floorColor}
                onChange={(e) => setFloorColor(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {view === 'stairs' && (
          <>
            <div>
              <label className="block text-sm text-gray-700">Number of Steps</label>
              <input
                type="range"
                min="3"
                max="10"
                value={stairsSettings.numSteps}
                onChange={(e) => setStairsSettings((prev) => ({ ...prev, numSteps: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Step Height</label>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.1"
                value={stairsSettings.stepHeight}
                onChange={(e) => setStairsSettings((prev) => ({ ...prev, stepHeight: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
            {/* Color Picker for Stairs */}
            <div>
              <label className="block text-sm text-gray-700">Stair Color</label>
              <input
                type="color"
                value={stairColor}
                onChange={(e) => setStairColor(e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Visualizer;
