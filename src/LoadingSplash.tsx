import React, { FC } from "react";

const LoadingSplash: FC<{}> = () => {
  return <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  }}>
    Loading...
  </div>
};

export default LoadingSplash
