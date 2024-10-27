import {View} from 'react-native';
import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Path,
  Rect,
} from 'react-native-svg';

// Function to check if the platform supports filters
const supportsFilters = () => {
  // This is a simple check; you can expand it based on your needs
  return false; // Change to true if using a platform that supports SVG filters
};

const GridIcon = ({color = '#1E1E1E'}) => {
  const isSupported = supportsFilters();

  return (
    <Svg width="58" height="61" viewBox="0 0 58 61" fill="none">
      {isSupported ? (
        <>
          <G clipPath="url(#clip0_12_3)" filter="url(#filter0_d_12_3)">
            <Path
              d="M29.2792 10.5166L15.6685 7.23816L12.39 20.8489L26.0008 24.1273L29.2792 10.5166Z"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M50.6675 15.6684L37.0567 12.39L33.7783 26.0007L47.3891 29.2791L50.6675 15.6684Z"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M45.5157 37.0567L31.9049 33.7783L28.6265 47.389L42.2372 50.6674L45.5157 37.0567Z"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M24.1274 31.9049L10.5167 28.6264L7.23823 42.2372L20.849 45.5156L24.1274 31.9049Z"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
          <Defs>
            {/* Original filters here if needed */}
            <Filter
              id="filter0_d_12_3"
              x="-4"
              y="0"
              width="65.9055"
              height="65.9056"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
              <FeFlood floodOpacity="0" result="BackgroundImageFix" />
              <FeColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <FeOffset dy="4" />
              <FeGaussianBlur stdDeviation="2" />
              <FeComposite in2="hardAlpha" operator="out" />
              <FeColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <FeBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_12_3"
              />
              <FeBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_12_3"
                result="shape"
              />
            </Filter>
            <ClipPath id="clip0_12_3">
              <Rect
                width="48"
                height="48"
                fill="white"
                transform="translate(11.2402) rotate(13.5429)"
              />
            </ClipPath>
          </Defs>
        </>
      ) : (
        <G clipPath="url(#clip0_12_3)">
          <Path
            d="M29.2792 10.5166L15.6685 7.23816L12.39 20.8489L26.0008 24.1273L29.2792 10.5166Z"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M50.6675 15.6684L37.0567 12.39L33.7783 26.0007L47.3891 29.2791L50.6675 15.6684Z"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M45.5157 37.0567L31.9049 33.7783L28.6265 47.389L42.2372 50.6674L45.5157 37.0567Z"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M24.1274 31.9049L10.5167 28.6264L7.23823 42.2372L20.849 45.5156L24.1274 31.9049Z"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      )}
      <Defs>
        <ClipPath id="clip0_12_3">
          <Rect
            width="48"
            height="48"
            fill="white"
            transform="translate(11.2402) rotate(13.5429)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default GridIcon;
