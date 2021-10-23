import {IData, IDataValues, IStyle} from "../type";

export function setStyle(style: IStyle | undefined) {
  const gap = style?.gap || 5
  const defaultColor = style?.defaultColor || '#000'
  const fontColor = style?.fontColor || '#000'
  const font = style?.font || '1.2rem serif'
  return {gap, defaultColor, fontColor, font}
}

export function normalize(data: IData) {
  const max = findMax(data)
  return data.values.map(item => {
    return {...item, value: 100 / (max / item.value)}
  })
}

function findMax(data: IData) {
  let max = 0
  data.values.forEach((item: IDataValues) => {
    if (item.value > max) {
      max = item.value
    }
  })
  return max
}