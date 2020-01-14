import React from 'react';
import LoadingSvg from '../assets/loading.svg';
import { loadingStyle } from '../common';

interface Props { }

export const Loading: React.FC<Props> = () => {
  return (
    <div style={loadingStyle}>
      <img alt='loading...' src={LoadingSvg} />
    </div>
  )
}
