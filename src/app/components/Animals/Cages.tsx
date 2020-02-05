import React, { useState } from 'react';
import styled from 'styled-components';

const Cages = () => {
  const [sizes, setSizes] = useState<String[]>(['S', 'M', 'L']);

  return (
    <SizesContainer>
      {sizes.map((size: String, index: number) => (
        <Size key={index}>{size}</Size>
      ))}
    </SizesContainer>
  );
};

export default Cages;

const SizesContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const Size = styled.div`
  width: 50%;
  padding: 10px 0;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  background-color: #ccc;
`;
