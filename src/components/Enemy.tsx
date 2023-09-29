import React, { useEffect, useState, useCallback } from "react";
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
  bullets: { id: number; x: number; y: number; direction: string }[];
}

const Enemy: React.FC<EnemyProps> = ({ position, onHit, bullets }) => {
  const [isHit, setIsHit] = useState(false);

  const checkBoundaryCollision = useCallback(() => {
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
  }, [position]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHit) {
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

        checkBoundaryCollision();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [position, isHit, checkBoundaryCollision]);

  const getRandomDirection = () => {
    const directions = ["up", "down", "left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };

  useEffect(() => {
    const checkBulletCollision = () => {
      bullets.forEach((bullet) => {
        if (
          bullet.x < position.x + 40 &&
          bullet.x + 10 > position.x &&
          bullet.y < position.y + 40 &&
          bullet.y + 10 > position.y
        ) {
          setIsHit(true);
        }
      });
    };

    checkBulletCollision();

    const collisionInterval = setInterval(() => {
      checkBulletCollision();
    }, 100);

    return () => clearInterval(collisionInterval);
  }, [position, bullets]);

  useEffect(() => {
    if (isHit) {
      setIsHit(false);
      const newPosition = generateRandomPosition();
      position.x = newPosition.x;
      position.y = newPosition.y;
      onHit();
    }
  }, [isHit, position, onHit]);

  const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 720);
    const y = Math.floor(Math.random() * 520);
    return { x, y };
  };

  return <EnemyWrapper position={position} />;
};

export default Enemy;
