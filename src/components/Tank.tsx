import React from "react";
import styled from "styled-components";

const TankWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #333;
  position: absolute;
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
    <TankWrapper style={{ left: position.x, top: position.y }}>
      <TankGun />
    </TankWrapper>
  );
};

export default Tank;
