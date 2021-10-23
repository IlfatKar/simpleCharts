import React, {FC, useEffect, useRef} from 'react';
import {ChartProps} from "../type";
import {normalize, setStyle} from "../utils";

const VerticalChart: FC<ChartProps> = ({data, style}) => {
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

        const colWidth = (ctx.canvas.width / data.values.length) - gap - gap / data.values.length
        let delta = colWidth / 2 + gap
        const percent = ctx.canvas.height / 120
        data.values.forEach(value => {
          const height = -(percent * value.value > percent * 100
            ? percent * 100
            : percent * value.value)

          if (value.color) {
            ctx.fillStyle = value.color
          }
          ctx.fillRect(delta - colWidth / 2, ctx.canvas.height - 40, colWidth, height)

          ctx.fillStyle = fontColor
          ctx.fillText(value.title, delta, ctx.canvas.height - 10, colWidth)
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

export default VerticalChart;