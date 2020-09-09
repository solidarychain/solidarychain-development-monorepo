import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const Profile: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Feed
      </Typography>
      <Box color="text.primary" clone>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur tincidunt condimentum. Proin vel pulvinar libero, eget dapibus sapien. Nullam in gravida nisi, tempor ultrices mi. Nam vel urna sit amet ante dictum commodo ut sit amet est. Donec vitae fermentum lectus, ut blandit dolor. Nam pretium condimentum est, eget gravida urna sodales in. Quisque non elit a lectus iaculis laoreet ac ac orci. Sed quis dui vel erat pellentesque tempor tempor sit amet augue. Aenean ac risus justo. Phasellus convallis risus malesuada, consequat tellus a, convallis massa. Nunc nec pulvinar mauris, sed sagittis augue. Aliquam dignissim faucibus pulvinar. Pellentesque dapibus semper ex, a volutpat lacus. Etiam sollicitudin enim in quam posuere tempor. Morbi iaculis sem a augue tempor consectetur. Nunc sit amet diam id libero volutpat facilisis at in risus.
          Nulla gravida sed eros sed pretium. Cras sed elementum massa. Quisque in lectus pretium, dictum purus non, finibus elit. Sed consectetur pretium nunc nec ornare. Donec tincidunt diam orci, et rutrum augue tincidunt pulvinar. Sed arcu elit, sagittis at erat at, pharetra convallis quam. Aliquam erat volutpat. Aenean pharetra ultrices mi id elementum. Fusce vestibulum ligula eu sapien hendrerit, sed commodo leo auctor. Aliquam augue mauris, accumsan at erat quis, posuere maximus leo.
          Vivamus lobortis enim id vehicula scelerisque. Mauris ac lacus ipsum. Vivamus blandit viverra erat, at molestie leo tempus sit amet. Cras lorem orci, sodales sit amet mi at, convallis viverra massa. Nulla varius porta interdum. Integer non urna porttitor, accumsan ligula fringilla, convallis nunc. Nam lectus justo, scelerisque vel auctor non, blandit dapibus orci. Nunc ornare euismod mauris, vitae pellentesque leo efficitur at. Donec id finibus sapien. Quisque ornare, felis eget malesuada blandit, tellus nisi maximus neque, nec venenatis sem massa quis eros. Praesent auctor, tellus at convallis sodales, dui nunc convallis tortor, non eleifend libero turpis ut nunc. Proin dapibus velit a lorem iaculis vestibulum. Etiam ut dui sed diam rutrum blandit sed eget ante.
        </Typography>
      </Box>
    </Fragment>
  );
}