import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const Login: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Sign Up
      </Typography>
      <Box color="text.primary" clone>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae elit erat. In fermentum ex ac 
        felis pulvinar fringilla. Praesent porttitor mi sed pretium lobortis. Nunc cursus ornare nulla eget molestie.
        Fusce malesuada, lectus et finibus pharetra, erat enim faucibus ligula, sed euismod turpis nunc et nibh.
        Aliquam mi purus, pulvinar luctus diam in, placerat posuere ligula. Pellentesque quis ullamcorper purus.
        Aenean sollicitudin tempor est vitae feugiat. Proin sagittis ut tortor in malesuada. Duis scelerisque volutpat
        erat a molestie. Aliquam gravida vitae ipsum nec lacinia. Pellentesque molestie mi sed sem aliquet, eu tincidunt
        nulla semper. Duis imperdiet egestas eros quis egestas. Duis a orci quam. Nunc rutrum lectus vel bibendum tempor.
        Fusce tempor pulvinar quam sit amet lacinia.
        </Typography>
      </Box>
    </Fragment>
  );
}