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

[See demo in codesandbox.io](https://codesandbox.io/s/busy-fog-8xvj0?file=/src/App.tsx)

<img src="https://user-images.githubusercontent.com/23455736/116813265-fb501500-ab8d-11eb-8f0d-adfb499b2efa.png" width="650" style="border: 1px solid #ccc;">

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
}

// Interface for position props

interface WatermarkPosition {
  x: number;
  y: number;
}
```

### Document

| paramters 	| description 	| required 	|
  |--------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|----------	|
  | text: string 	| Text to be registered as a watermark 	| O 	|
  | style: WatermarkStyle 	| Styles to be applied to the watermark. 	| O 	|
  | position: WatermarkPosition 	| Location of the watermark based on the wrapper element. 	| X 	|
  | multiple: boolean 	| Allows multiple watermarks to be rendered. 	| X 	|
  | className: string 	| Classname if you want to apply additional styles to watermark. 	| X 	|
