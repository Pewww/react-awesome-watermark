import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

import getRandomId from './lib/getRandomId';
import canvasToImage from './lib/canvasToImage';
import { $id } from './lib/dom';
import SecurityDefense from './utils/SecurityDefense';
import type { WatermarkStyle, WatermarkPosition } from './types/watermark';
import type { ReactFCC } from './types/core';

const WATERMARK_WRAPPER_DEFAULT_STYLE: React.CSSProperties = {
  position: 'relative',
  WebkitPrintColorAdjust: 'exact'
};

const WATERMARK_DEFAULT_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9999,
  overflow: 'hidden',
  pointerEvents: 'none'
};

const WATERMARK_DEFAULT_POSITION: WatermarkPosition = {
  x: 50,
  y: 50
};

interface WatermarkProps {
  text: string;
  style: WatermarkStyle;
  position?: WatermarkPosition;
  multiple?: boolean;
  className?: string;
}

const Watermark: ReactFCC<WatermarkProps> = ({
  text,
  style,
  position = WATERMARK_DEFAULT_POSITION,
  multiple,
  className = '',
  children
}) => {
  const [imageSrc, setImageSrc] = useState('');

  const {
    current: { id: watermarkWrapperId }
  } = useRef({
    id: getRandomId('watermark-wrapper')
  });
  const {
    current: { id: watermarkId }
  } = useRef({
    id: getRandomId('watermark')
  });

  const watermarkWrapperRef = useRef(null);
  const watermarkRef = useRef(null);

  useEffect(() => {
    const renderedImageSrc = canvasToImage({
      text,
      style,
      position,
      multiple
    });

    setImageSrc(renderedImageSrc);
  }, [text, style, position, multiple]);

  useLayoutEffect(() => {
    if (!imageSrc) {
      return;
    }

    const securityDefense = new SecurityDefense({
      watermarkWrapperId,
      watermarkId
    });

    const watermarkWrapper = $id(watermarkWrapperId);
    const watermark = $id(watermarkId);

    if (watermarkWrapper && watermarkWrapperRef.current === null) {
      watermarkWrapperRef.current = securityDefense.getWatermarkWrapperObserver();

      watermarkWrapperRef.current.observe(watermarkWrapper, {
        childList: true
      });
    }

    if (watermark && watermarkRef.current === null) {
      watermarkRef.current = securityDefense.getWatermarkObserver();

      watermarkRef.current.observe(watermark, {
        attributes: true,
        attributeOldValue: true
      });
    }

    return () => {
      watermarkWrapperRef.current?.disconnect();
      watermarkRef.current?.disconnect();
    };
  }, [imageSrc, watermarkId, watermarkWrapperId]);

  const { width, height } = style;

  const watermarkWrapperStyle = {
    ...WATERMARK_WRAPPER_DEFAULT_STYLE,
    width,
    height
  };

  const watermarkStyle = {
    ...WATERMARK_DEFAULT_STYLE,
    width,
    height,
    backgroundImage: `url("${imageSrc}")`
  };

  return (
    <div
      id={watermarkWrapperId}
      className={className}
      style={watermarkWrapperStyle}>
      {imageSrc && <div id={watermarkId} style={watermarkStyle} />}
      {children}
    </div>
  );
};

export default Watermark;
