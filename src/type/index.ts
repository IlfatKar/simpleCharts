export interface IData {
  title: string,
  values: IDataValues[]
}

export interface ILineData {
  title: string,
  values: ILineDataValues[]
}

export interface IDataValues {
  title: string,
  value: number,
  color?: string
}

interface ILineDataValues {
  title: string,
  value: number[],
  color?: string
}

export interface IStyle {
  gap?: number
  font?: string
  defaultColor?: string
  fontColor?: string
}

export interface ChartProps {
  data: IData
  style?: IStyle
}

export interface LineChartProps {
  data: ILineData
  style?: IStyle
  valTitles?: string[]
}