import React from "react";
import styled from "styled-components";

interface BlockProps {
  position: { x: number; y: number };
}

const BlockContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: gray;
`;

const Block: React.FC<BlockProps> = ({ position }) => {
  return <BlockContainer style={{ top: position.y, left: position.x }} />;
};

export default Block;
