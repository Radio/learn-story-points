import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from '../../infrastructure/ws';

const knownSizes = {
  three: ['S', 'M', 'L'],
  five: ['S', 'S+', 'M', 'M+', 'L'],
};
const colors = [
  ['#022F40', 'linear-gradient(180deg, rgba(163,179,185,1) 0%, rgba(255,255,255,1) 85%)'],
  ['#38AECC', 'linear-gradient(180deg, rgba(182,225,236,1) 0%, rgba(255,255,255,1) 85%)'],
  ['#0090C1', 'linear-gradient(180deg, rgba(162,214,232,1) 0%, rgba(255,255,255,1) 85%)'],
  ['#183446', 'linear-gradient(180deg, rgba(171,181,187,1) 0%, rgba(255,255,255,1) 85%)'],
  ['#046E8F', 'linear-gradient(180deg, rgba(163,202,214,1) 0%, rgba(255,255,255,1) 85%)'],
];

const Cages = () => {
  const [sizes, setSizes] = useState<String[]>(knownSizes.three);

  const onOpen = (ws: WebSocket) => {};

  const onMessage = (message: any) => {
    if (message.type === 'cages') {
      setSizes(message.body === 'five' ? knownSizes.five : knownSizes.three);
    }
  };

  useEffect(() => {
    connect(onOpen, onMessage);
  }, []);

  return (
    <SizesContainer>
      {sizes.map((size: String, index: number) => (
        <Size key={index} style={{ background: colors[index][1] }}>
          <span style={{ background: colors[index][0] }}>{size}</span>
        </Size>
      ))}
    </SizesContainer>
  );
};

export default Cages;

const SizesContainer = styled.div`
  display: flex;
  justify-content: center;
  // padding: 50px;
  height: 100%;
`;

const Size = styled.div`
  width: 40%;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #fff;

  span {
    display: block;
    padding: 10px 0;
  }
`;
