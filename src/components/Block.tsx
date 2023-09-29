import React from "react";
import styled from "styled-components";

interface BlockProps {
  position: { x: number; y: number };
  type: "grass" | "wall"; // Adicione o tipo de bloco
}

const BlockContainer = styled.div<{ position: { x: number; y: number }; type: "grass" | "wall" }>`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.type === "grass" ? "green" : "gray")}; // Cor de fundo dependendo do tipo
  z-index: ${(props) => (props.type === "wall" ? 1 : 0)}; // Coloque os blocos de parede acima
`;

const Block: React.FC<BlockProps> = ({ position, type }) => {
  return <BlockContainer position={position} type={type} />;
};

export default Block;
