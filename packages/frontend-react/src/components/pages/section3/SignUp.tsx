import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const SignUp: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Sign Up
      </Typography>
      <Box color="text.primary" clone>
        <Typography paragraph>
          Nulla volutpat vitae metus ut aliquet. Cras nec auctor diam. Nulla tincidunt justo ac leo sagittis, ut vulputate dolor congue. 
          Fusce facilisis est dui, id efficitur tortor feugiat eget. Nunc sed gravida ipsum. Suspendisse eget ante eu arcu porta tempor. 
          Quisque venenatis est et ante gravida, vel accumsan lacus porta. Ut luctus, nibh eu placerat tempor, elit mi maximus ligula, eu fringilla risus ipsum id lacus.
        </Typography>
      </Box>
    </Fragment>
  );
}