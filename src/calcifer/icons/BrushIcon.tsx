import * as React from "react";
const BrushIcon = ({ color }: any) => (
  <svg viewBox="0 0 24 30" width="36">
    <g>
      <path
        d="M3.5,17.2c-0.6,0.6-0.8,1.3-1.1,2c-0.3,1-0.6,1.8-1.9,2.2c-0.3,0.1-0.4,0.4-0.4,0.6c0,0.3,0.2,0.5,0.5,0.6   c1,0.3,1.9,0.4,2.8,0.4c2.1,0,3.6-0.7,4.4-1.5c0.6-0.6,0.9-1.3,0.9-2.1s-0.3-1.6-0.9-2.1C6.6,16,4.6,16,3.5,17.2z M6.8,20.5   c-0.7,0.7-2.2,1.3-4.3,1.1c0.6-0.6,0.9-1.4,1.1-2.1C3.8,19,4,18.4,4.4,18.1c0,0,0,0,0,0c0.7-0.7,1.8-0.7,2.5,0   c0.3,0.3,0.5,0.8,0.5,1.2C7.3,19.8,7.2,20.2,6.8,20.5z"
        fill={color}
      />
      <path
        d="M23.7,1.3c-0.5-0.5-1-1-8.4,5c-3.4,2.8-7,6-7.5,6.5c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.8,0.3,1.6,0.9,2.1   C8.4,17.7,9.2,18,9.9,18c0.8,0,1.6-0.3,2.1-0.9c0.5-0.5,3.7-4.1,6.5-7.5C24.7,2.3,24.2,1.7,23.7,1.3z M8.7,16.2   c-0.3-0.3-0.5-0.8-0.5-1.2c0-0.5,0.2-0.9,0.5-1.2c0.1-0.1,0.3-0.3,0.5-0.4c0.9,0.6,1.8,1.5,2.4,2.4c-0.2,0.2-0.3,0.4-0.4,0.5   C10.5,16.9,9.4,16.9,8.7,16.2z M12.5,14.8c-0.6-0.9-1.5-1.7-2.3-2.3c3.1-2.7,9.6-8.3,12.1-9.7C20.8,5.2,15.2,11.7,12.5,14.8z"
        fill={color}
      />
    </g>
  </svg>
);
export default BrushIcon;
