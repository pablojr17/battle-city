import React, { useState, useEffect } from "react";
import Tank from "../components/Tank";
import Enemy from "../components/Enemy";
import Bullet from "../components/Bullet"; // Importe o componente Bullet

const GameScene: React.FC = () => {
  const [tankPosition, setTankPosition] = useState({ x: 0, y: 0 });
  const [bullets, setBullets] = useState<
    { id: number; x: number; y: number }[]
  >([]);

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

  const handleTankShoot = () => {
    const newBullet = {
      id: bullets.length + 1,
      x: tankPosition.x + 20, // Ajuste a posição inicial da bala conforme necessário
      y: tankPosition.y,
    };
    setBullets([...bullets, newBullet]);
  };

  useEffect(() => {
    const bulletInterval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets.map((bullet) => ({ ...bullet, y: bullet.y - 10 }))
      );
    }, 100);

    return () => clearInterval(bulletInterval);
  }, []);

  return (
    <div>
      <Tank position={tankPosition} />
      <Enemy position={{ x: 100, y: 100 }} />

      {bullets.map((bullet) => (
        <div
          key={bullet.id}
          style={{
            position: "absolute",
            left: bullet.x,
            top: bullet.y,
            width: "5px",
            height: "5px",
            background: "black",
          }}
        />
      ))}
    </div>
  );
};

export default GameScene;
