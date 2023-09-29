import React, { useEffect } from "react";
import styled from "styled-components";

interface BulletProps {
  position: { id: number; x: number; y: number; direction: string };
  setBullets: any;
}

const BulletContainer = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: yellow;
  border: 2px solid #1100ff;
`;

const Bullet: React.FC<BulletProps> = ({ position, setBullets }) => {
  useEffect(() => {
    const bulletInterval = setInterval(() => {
      setBullets((prevBullets: any[]) =>
        prevBullets
          .map((bullet) => {
            if (bullet.id === position.id) {
              let updatedBullet = { ...bullet };

              switch (position.direction) {
                case "up":
                  updatedBullet.y -= 10;
                  break;
                case "down":
                  updatedBullet.y += 10;
                  break;
                case "left":
                  updatedBullet.x -= 10;
                  break;
                case "right":
                  updatedBullet.x += 10;
                  break;
                default:
                  break;
              }

              return updatedBullet;
            }

            return bullet;
          })
          .filter(
            (bullet) =>
              bullet.x >= 0 &&
              bullet.x <= 760 &&
              bullet.y >= 0 &&
              bullet.y <= 560
          )
      );
    }, 100);

    return () => clearInterval(bulletInterval);
  }, [position, setBullets]);

  return <BulletContainer style={{ top: position.y, left: position.x }} />;
};

export default Bullet;
