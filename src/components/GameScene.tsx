import React, { useState, useEffect, useCallback } from "react";
import Tank from "../components/Tank";
import Enemy from "../components/Enemy";
import Bullet from "../components/Bullet";
import styled from "styled-components";
import Block from "./Block";

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
    { id: number; x: number; y: number; direction: string }[]
  >([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 100, y: 100 });
  const [tankDirection, setTankDirection] = useState("up");
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [wallPositions, setWallPositions] = useState([
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 200, y: 200 },
  ]); // Adicione as posições das paredes aqui

  const [wallBlocks, setWallBlocks] = useState([
    { x: 100, y: 100 },
    // Adicione mais blocos de parede conforme necessário
  ]);

  const onEnemyHit = useCallback(() => {
    setIsEnemyHit(true);
    setEnemyPosition(generateRandomPosition());
  }, []);

  const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 720); // Gera uma posição x entre 0 e 720
    const y = Math.floor(Math.random() * 520); // Gera uma posição y entre 0 e 520
    return { x, y };
  };

  const checkCollision = useCallback(() => {
    bullets.forEach((bullet) => {
      if (
        bullet.x < enemyPosition.x + 40 &&
        bullet.x + 10 > enemyPosition.x &&
        bullet.y < enemyPosition.y + 40 &&
        bullet.y + 10 > enemyPosition.y
      ) {
        onEnemyHit(); // Chama a função onEnemyHit se houver colisão
      }
    });
  }, [bullets, enemyPosition.x, enemyPosition.y, onEnemyHit]);

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
  }, [checkCollision]);
  const handleSpaceBar = useCallback(() => {
    const bulletStartPosition = {
      x: tankPosition.x + 20,
      y: tankPosition.y + 20,
    };

    const newBullet = {
      id: bullets.length + 1,
      x: bulletStartPosition.x,
      y: bulletStartPosition.y,
      direction: tankDirection,
    };

    setBullets([...bullets, newBullet]);
  }, [bullets, tankDirection, tankPosition.x, tankPosition.y]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newDirection = tankDirection;
      let newPosition = { ...tankPosition };

      switch (e.key) {
        case "ArrowUp":
          newDirection = "up";
          newPosition = {
            ...tankPosition,
            y: Math.max(0, tankPosition.y - 10),
          };
          break;
        case "ArrowDown":
          newDirection = "down";
          newPosition = {
            ...tankPosition,
            y: Math.min(560, tankPosition.y + 10),
          };
          break;
        case "ArrowLeft":
          newDirection = "left";
          newPosition = {
            ...tankPosition,
            x: Math.max(0, tankPosition.x - 10),
          };
          break;
        case "ArrowRight":
          newDirection = "right";
          newPosition = {
            ...tankPosition,
            x: Math.min(760, tankPosition.x + 10),
          };
          break;
        case " ":
          handleSpaceBar();
          break;
        default:
          break;
      }

      // Verificar colisão com os blocos de parede
      const isCollidingWithWall = wallBlocks.some(
        (block) => block.x === newPosition.x && block.y === newPosition.y
      );

      if (!isCollidingWithWall) {
        setTankDirection(newDirection);
        setTankPosition(newPosition);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tankPosition, bullets, tankDirection, handleSpaceBar, wallBlocks]);

  function distributeBlocks(rows: number, columns: number): JSX.Element[] {
    const blocks = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const type = i % 2 === 0 && j % 2 === 0 ? "wall" : "grass"; // Lógica para determinar o tipo de bloco
        const position = { x: j * 50, y: i * 50 }; // Espaçamento de 50 pixels entre os blocos

        blocks.push(
          <Block key={`block-${i}-${j}`} position={position} type={type} />
        );
      }
    }

    return blocks;
  }

  return (
    <GameWrapper>
      <Tank
        position={tankPosition}
        direction={tankDirection}
        wallPositions={wallPositions}
      />

      <Enemy position={enemyPosition} onHit={onEnemyHit} bullets={bullets} />

      {bullets.map((bullet) => (
        <Bullet key={bullet.id} position={bullet} setBullets={setBullets} />
      ))}
    </GameWrapper>
  );
};

export default GameScene;
