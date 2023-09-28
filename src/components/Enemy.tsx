import React, { useEffect, useState } from "react";
import styled from "styled-components";

const EnemyWrapper = styled.div<{ position: { x: number; y: number } }>`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: red;
  left: ${({ position }) => Math.max(0, Math.min(760, position.x))}px;
  top: ${({ position }) => Math.max(0, Math.min(560, position.y))}px;
`;

interface EnemyProps {
  position: { x: number; y: number };
  onHit: () => void;
}

const Enemy: React.FC<EnemyProps> = ({ position, onHit }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const randomDirection = getRandomDirection();
      switch (randomDirection) {
        case "up":
          position.y -= 5;
          break;
        case "down":
          position.y += 5;
          break;
        case "left":
          position.x -= 5;
          break;
        case "right":
          position.x += 5;
          break;
        default:
          break;
      }

      // Verificar colisão com bordas e mudar direção se necessário
      checkBoundaryCollision();
    }, 100);

    return () => clearInterval(interval);
  }, [position, onHit]);

  const getRandomDirection = () => {
    const directions = ["up", "down", "left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };

  const checkBoundaryCollision = () => {
    if (position.x >= 760) {
      position.x = 760;
    } else if (position.x <= 0) {
      position.x = 0;
    }

    if (position.y >= 560) {
      position.y = 560;
    } else if (position.y <= 0) {
      position.y = 0;
    }
  };

  return <EnemyWrapper position={position} />;
};

export default Enemy;
