import React from "react";
import styled from "styled-components";

interface BulletProps {
  position: { x: number; y: number };
}

const BulletContainer = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: yellow;
`;

const Bullet: React.FC<BulletProps> = ({ position }) => {
  return <BulletContainer style={{ top: position.y, left: position.x }} />;
};

export default Bullet;
