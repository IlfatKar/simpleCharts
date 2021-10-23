import React, {FC, useEffect, useRef} from 'react';
import {LineChartProps} from '../type'
import {setStyle} from "../utils";

const CurvedChart: FC<LineChartProps> = ({data, style, valTitles}) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const bgCanvas = useRef<HTMLCanvasElement>(null)

  const {defaultColor, fontColor, font} = setStyle(style)

  const findMax = (data: any) => {
    let max = 0
    data.values.forEach((item: any) => {
      item.value.forEach((v: any) => {
        if (v > max) {
          max = v
        }
      })
    })
    return max
  }

  const max = findMax(data)
  data.values = data.values.map(item => {
    const value = item.value.map(v => {
      return Math.round(100 / (max / v))
    })
    return {...item, value}
  })

  useEffect(() => {
      if (canvas.current && bgCanvas.current) {
        const ctx = canvas.current.getContext('2d')
        const bgCtx = bgCanvas.current.getContext('2d')
        canvas.current.width = bgCanvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = bgCanvas.current.height = canvas.current.offsetHeight;
        if (ctx && bgCtx) {

          ctx.font = font
          ctx.textAlign = 'center'

          bgCtx.globalAlpha = .3
          bgCtx.setLineDash([5, 15])

          let printed = false

          let maxLength = 0
          data.values.forEach(v => {
            if (v.value.length > maxLength) maxLength = v.value.length
          })
          const colWidth = (ctx.canvas.width / maxLength) * .95

          if (valTitles) {
            let tmpDelta = colWidth
            valTitles.forEach(title => {
              ctx.fillText(title, tmpDelta, 25, colWidth)
              tmpDelta += colWidth
            })
          }

          {
            (new Array(11)).fill(1).forEach((_, i) => {
              bgCtx.beginPath()
              bgCtx.moveTo(0, ctx.canvas.height - ctx.canvas.height / 120 * (10 * i))
              bgCtx.lineTo(ctx.canvas.width, ctx.canvas.height - ctx.canvas.height / 120 * (10 * i))
              bgCtx.stroke()
              ctx.globalAlpha = .3
              ctx.fillText(`${i * 10}%`, 25, ctx.canvas.height - ctx.canvas.height / 120 * (10 * i) - 10)
            })
            ctx.globalAlpha = 1
          }

          data.values.forEach(value => {
              let delta = colWidth

              ctx.strokeStyle = value.color || defaultColor
              ctx.beginPath();

              value.value.forEach((v, i, arr) => {
                const y = ctx.canvas.height - (ctx.canvas.height / 120 * v)
                const prevY = ctx.canvas.height - (ctx.canvas.height / 120 * (arr[i - 1] || v))

                if ((i % 2)) {
                  ctx.quadraticCurveTo(delta - colWidth / 2, y, delta, y)
                } else {
                  ctx.quadraticCurveTo(delta - colWidth / 2, prevY, delta, y)
                }
                if (!printed) {
                  bgCtx.beginPath()
                  bgCtx.moveTo(delta, 0)
                  bgCtx.lineTo(delta, ctx.canvas.height)
                  bgCtx.stroke()
                }

                delta += colWidth
              })
              printed = true

              ctx.stroke()
            }
          )
        }
      }
    }, [data, style]
  )

  return (
    <>
      <canvas ref={canvas} className={'graph'}/>
      <canvas ref={bgCanvas} style={{position: 'absolute'}}/>
    </>
  )
}

export default CurvedChart;