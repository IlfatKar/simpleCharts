import React, {FC, useEffect, useRef} from 'react';
import {ChartProps} from '../type'
import {normalize, setStyle} from "../utils";


const HorizontalChart: FC<ChartProps> = ({data, style}) => {
  const canvas = useRef<HTMLCanvasElement>(null)

  data.values = normalize(data)

  const {gap, defaultColor, fontColor, font} = setStyle(style)

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d')
      canvas.current.width = canvas.current.offsetWidth;
      canvas.current.height = canvas.current.offsetHeight;
      if (ctx) {
        ctx.font = font
        ctx.textAlign = 'center'

        const colWidth = (ctx.canvas.height / data.values.length) - gap - gap / data.values.length
        let delta = colWidth / 2 + gap
        const percent = ctx.canvas.width / 120

        data.values.forEach(value => {
          const height = (percent * value.value > percent * 100
            ? percent * 100
            : percent * value.value)

          if (value.color) {
            ctx.fillStyle = value.color
          }
          ctx.fillRect(gap + 60, delta - colWidth / 2, height, colWidth)

          ctx.fillStyle = fontColor
          ctx.fillText(value.title, gap + 25, delta + gap / 2, 60)

          ctx.fillStyle = defaultColor
          delta += colWidth + gap
        })
      }
    }
  }, [data, style])

  return (
    <canvas ref={canvas} className={'graph'}/>
  );
};

export default HorizontalChart;