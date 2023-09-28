import React from "react";
import styled from "styled-components";

interface EnemyProps {
  position: { x: number; y: number };
}

const EnemyContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
`;

const Enemy: React.FC<EnemyProps> = ({ position }) => {
  return <EnemyContainer style={{ top: position.y, left: position.x }} />;
};

export default Enemy;
