/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame } from './StoreContext';
import styled from 'styled-components/macro';

export const FPS: FC<{ className?: string }> = observer(({ className }) => {
  const store = useGame();
  return (
    <Layout className={className}>
      {Math.round(1000 / store.timeSinceLastFrame)} FPS
    </Layout>
  );
});

const Layout = styled.div`
  margin-top: 12px;
`;