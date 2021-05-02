import { WatermarkStyle, WatermarkPosition } from '../types/watermark';

interface CanvasToImageParams {
  text: string;
  style: WatermarkStyle;
  position?: WatermarkPosition;
  multiple?: boolean;
}

const canvasToImage = ({
  text,
  style,
  position,
  multiple
}: CanvasToImageParams) => {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const {
    width,
    height,
    color = '#000',
    fontSize = 16,
    fontFamily = 'sans-serif',
    opacity = 0.13,
    rotate = 25
  } = style;

  canvas.width = width;
  canvas.height = height;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.rotate((Math.PI / 180) * rotate);

  if (multiple) {
    const textWidth = ctx.measureText(text).width;
    const horizontalSpace = Math.floor(textWidth * 2);
    const verticalSpace = Math.floor(fontSize * 2.5);

    for (let posX = 0; posX <= width + textWidth; posX += horizontalSpace) {
      for (
        let posY = 0;
        posY <= height + verticalSpace;
        posY += horizontalSpace
      ) {
        ctx.fillText(text, posX, posY);
      }
    }

    // @TODO: Translate context position
  } else {
    const { x, y } = position!;

    ctx.fillText(text, x, y);
  }

  return canvas.toDataURL();
};

export default canvasToImage;
