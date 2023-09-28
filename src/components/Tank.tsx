import React from "react";
import styled from "styled-components";

const TankWrapper = styled.div<{ position: { x: number; y: number } }>`
  width: 40px;
  height: 40px;
  background-color: #333;
  position: absolute;
  left: ${({ position }) => Math.max(0, Math.min(760, position.x))}px;
  top: ${({ position }) => Math.max(0, Math.min(560, position.y))}px;
`;

const TankGun = styled.div`
  width: 10px;
  height: 30px;
  background-color: #666;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

interface TankProps {
  position: { x: number; y: number };
}

const Tank: React.FC<TankProps> = ({ position }) => {
  return (
    <TankWrapper position={position}>
      <TankGun />
    </TankWrapper>
  );
};

export default Tank;
