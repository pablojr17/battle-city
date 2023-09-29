import React, { useEffect } from "react";
import styled from "styled-components";

const TankWrapper = styled.div<{
  position: { x: number; y: number };
  direction: string;
}>`
  width: 40px;
  height: 40px;
  background-color: #333;
  position: absolute;
  left: ${({ position }) => Math.max(0, Math.min(760, position.x))}px;
  top: ${({ position }) => Math.max(0, Math.min(560, position.y))}px;
  transform: ${({ direction }) => {
    switch (direction) {
      case "up":
        return "rotate(0deg)";
      case "down":
        return "rotate(180deg)";
      case "left":
        return "rotate(-90deg)";
      case "right":
        return "rotate(90deg)";
      default:
        return "rotate(0deg)";
    }
  }};
`;

const TankGun = styled.div`
  width: 10px;
  height: 30px;
  background-color: #666;
  border: 1px solid red;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

const TankGun2 = styled.div`
  width: 8px;
  height: 10px;
  background-color: #241e1e;
  position: absolute;
  left: 50%;
  bottom: 98%;
  transform: translateX(-50%);
`;

interface TankProps {
  position: { x: number; y: number };
  direction: string; // Adicione a propriedade 'direction' ao TankProps
  wallPositions: { x: number; y: number }[];
}

const Tank: React.FC<TankProps> = ({ position, direction, wallPositions }) => {
  useEffect(() => {
    wallPositions.forEach((wall: any) => {
      if (
        position.x < wall.x + 50 &&
        position.x + 40 > wall.x &&
        position.y < wall.y + 50 &&
        position.y + 40 > wall.y
      ) {
        // Colisão com um bloco de parede, faça algo aqui (por exemplo, pare o movimento)
      }
    });
  }, [position, wallPositions]);

  return (
    <TankWrapper position={position} direction={direction}>
      <TankGun />
      <TankGun2 />
    </TankWrapper>
  );
};

export default Tank;
