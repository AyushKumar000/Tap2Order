import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, { ReactNode } from 'react';
// import React from 'react';
// import {Colors} from '../../constants/color';
// import TextStyles from '../../constants/textStyle';

interface ButtonProps {
  children: ReactNode;
  bgColor?: string;
  height?: number;
  pHorizontal?: number;
  pVertical?: number;
  textColor?: string;
  radius?: number;
  borderColor?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps>  = ({
  children ,
  bgColor = "#ffff",
  height = 40,
  pHorizontal = 5,
  pVertical = 4,
  textColor = "#ECEDEE",
  radius = 8,
  borderColor = 'white',
  onClick = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: bgColor,
        borderWidth: 1,
        borderColor: borderColor,
        paddingHorizontal: pHorizontal,
        paddingVertical: pVertical,
        borderRadius: radius,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Text
        style={[{color: textColor, fontWeight: '500'}, TextStyles.fs_400_18]}>
        {children}
      </Text> */}
      {children}
    </TouchableOpacity>
  );
};

export default Button;
