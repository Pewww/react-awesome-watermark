# react-awesome-watermark

## ⚙ Installation

#### npm
```bash
npm install react-awesome-watermark
```

#### yarn
```bash
yarn add react-awesome-watermark
```

## 🌌 Demo

[**See demo in codesandbox.io**](https://codesandbox.io/s/busy-fog-8xvj0?file=/src/App.tsx)

## 👨‍🍳 Usage

### Interface of props

```typescript
// Interface for style props

interface WatermarkStyle {
  width: number;
  height: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  opacity?: number;
  rotate?: number;
  space?: number;
}

const defaultWatermarkStyle = {
  color: '#000',
  fontSize: 16,
  fontFamily: 'sans-serif',
  opacity = 0.13,
  rotate = 25,
  space = 0 // Custom text spacing
};
```

```typescript
// Interface for position props
// It is only active when multiple option is not given.

interface WatermarkPosition {
  x: number;
  y: number;
}

const defaultWatermarkPosition = {
  x: 50
  y: 50
};
```

### Document

| paramters 	| description 	| required 	|
  |--------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|----------	|
  | text: string 	| Text to be registered as a watermark 	| O 	|
  | style: WatermarkStyle 	| Styles to be applied to the watermark. 	| O 	|
  | position: WatermarkPosition 	| Location of the watermark based on the wrapper element. 	| X 	|
  | multiple: boolean 	| Allows multiple watermarks to be rendered. 	| X 	|
  | className: string 	| Classname if you want to apply additional styles to watermark. 	| X 	|


### Example

```JSX
import React from 'react';
import Watermark from 'react-awesome-watermark';
import styled from 'styled-components';

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
  margin-top: 50px;
`;

const H3 = styled.h3`
  text-align: center;
`;

const WatermarkWrapper = styled.div`
  text-align: center;

  .space-props-test {
    display: inline-block;
    margin: 10px;
  }
`;

const StyledWatermark = styled(Watermark)`
  margin: 0 auto;

  .inner-watermark {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    font-size: 20px;
    text-align: center;
    line-height: 2;
  }
`;

export default function App() {
  return (
    <div>
      <H1>Watermark Usage</H1>
      <StyledWatermark
        text="Watermark Rendering"
        style={{
          width: 500,
          height: 500
        }}
        multiple
      >
        <div className="inner-watermark">
          You can drag this text
          <br />
          You can drag this text
          <br />
          You can drag this text
          <br />
          You can drag this text
          <br />
          You can drag this text
          <br />
          You can drag this text
          <br />
          You can drag this text
          <br />
          You can drag this text
        </div>
      </StyledWatermark>
      <H2>When you give "space" style props to Watermark</H2>
      <H3>Before and After</H3>
      <WatermarkWrapper>
        <StyledWatermark
          text="1"
          style={{
            width: 300,
            height: 300
          }}
          multiple
          className="space-props-test"
        >
          <div className="inner-watermark" />
        </StyledWatermark>
        <StyledWatermark
          text="1"
          style={{
            width: 300,
            height: 300,
            space: 50
          }}
          multiple
          className="space-props-test"
        >
          <div className="inner-watermark" />
        </StyledWatermark>
      </WatermarkWrapper>
    </div>
  );
}
```

#### Result

<img src="https://user-images.githubusercontent.com/23455736/117231514-4b62fc00-ae5a-11eb-82de-2565076e45b0.png" width="600">
