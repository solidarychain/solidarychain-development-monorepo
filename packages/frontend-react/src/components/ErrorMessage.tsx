import * as React from 'react'
import { errorStyle } from '../common';

interface Props {
  error: string
}

export const ErrorMessage: React.FC<Props> = ({ error }: Props) => {
  return (<div style={errorStyle}>{error}</div>);
}