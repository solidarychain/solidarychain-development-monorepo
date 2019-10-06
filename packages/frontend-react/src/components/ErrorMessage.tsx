import * as React from 'react'
import { errorStyle } from '../common';

interface Props {
  error: string
}

export const ErrorMessage: React.FC<Props> = ({ error }: Props) => {
  // console.log(error);
  return (<div style={errorStyle}>{error}</div>);
}