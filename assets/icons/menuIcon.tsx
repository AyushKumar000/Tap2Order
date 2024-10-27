import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type IconProps = {
  height?: number;
  width?: number;
};

const MenuIcon = ({height = 23, width = 38}: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 38 23" fill="none">
      <Path
        d="M0 2.5875C0 1.15846 0.823218 0 1.83871 0H36.1613C37.1768 0 38 1.15846 38 2.5875C38 4.01654 37.1768 5.175 36.1613 5.175H1.83871C0.823219 5.175 0 4.01654 0 2.5875Z"
        fill="black"
      />
      <Path
        d="M0 11.2125C0 9.78346 0.823218 8.625 1.83871 8.625H36.1613C37.1768 8.625 38 9.78346 38 11.2125C38 12.6415 37.1768 13.8 36.1613 13.8H1.83871C0.823219 13.8 0 12.6415 0 11.2125Z"
        fill="black"
      />
      <Path
        d="M0 20.4125C0 18.9835 0.823218 17.825 1.83871 17.825H36.1613C37.1768 17.825 38 18.9835 38 20.4125C38 21.8415 37.1768 23 36.1613 23H1.83871C0.823219 23 0 21.8415 0 20.4125Z"
        fill="black"
      />
    </Svg>
  );
};

export default MenuIcon;
