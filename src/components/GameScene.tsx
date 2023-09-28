import React, { useState, useEffect } from "react";
import Tank from "../components/Tank";
import Enemy from "../components/Enemy";
import Bullet from "../components/Bullet";
import styled from "styled-components";

const GameWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  margin: 0 auto;
  background-color: #f0f0f0;
  border: 3px solid #807b7b;
  border-radius: 8px;
`;

const GameScene: React.FC = () => {
  const [tankPosition, setTankPosition] = useState({ x: 0, y: 0 });
  const [bullets, setBullets] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 100, y: 100 });

  const checkCollision = () => {
    bullets.forEach((bullet) => {
      const bulletRect = {
        left: bullet.x,
        top: bullet.y,
        right: bullet.x + 5,
        bottom: bullet.y + 5,
      };

      const enemyRect = {
        left: enemyPosition.x,
        top: enemyPosition.y,
        right: enemyPosition.x + 40,
        bottom: enemyPosition.y + 40,
      };

      if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
      ) {
        onEnemyHit();
      }
    });
  };

  const onEnemyHit = () => {
    setBullets([]);
    setEnemyPosition({ x: Math.random() * 600, y: Math.random() * 400 }); // Reposiciona o inimigo aleatoriamente
  };

  useEffect(() => {
    const handleSpaceBar = () => {
      const newBullet = {
        id: bullets.length + 1,
        x: tankPosition.x + 10,
        y: tankPosition.y,
      };

      setBullets([...bullets, newBullet]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setTankPosition((prev) => ({ ...prev, y: prev.y - 10 }));
          break;
        case "ArrowDown":
          setTankPosition((prev) => ({ ...prev, y: prev.y + 10 }));
          break;
        case "ArrowLeft":
          setTankPosition((prev) => ({ ...prev, x: prev.x - 10 }));
          break;
        case "ArrowRight":
          setTankPosition((prev) => ({ ...prev, x: prev.x + 10 }));
          break;
        case " ":
          handleSpaceBar();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tankPosition, bullets]);

  useEffect(() => {
    const bulletInterval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets.map((bullet) => ({ ...bullet, y: bullet.y - 10 }))
      );
    }, 100);

    const collisionInterval = setInterval(() => {
      checkCollision();
    }, 100);

    return () => {
      clearInterval(bulletInterval);
      clearInterval(collisionInterval);
    };
  }, [enemyPosition, bullets]);

  return (
    <GameWrapper>
      <Tank position={tankPosition} />
      <Enemy position={enemyPosition} onHit={onEnemyHit} />

      {bullets.map((bullet) => (
        <Bullet key={bullet.id} position={bullet} />
      ))}
    </GameWrapper>
  );
};

export default GameScene;
