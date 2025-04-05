import React from 'react';

type VideoIconProps = {
  src: string;
};

const VideoIcon: React.FC<VideoIconProps> = ({ src }) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    style={{ height: '24px', width: '24px', borderRadius: '50%' }}
  />
);

export default VideoIcon;
