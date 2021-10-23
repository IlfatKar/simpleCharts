export interface IData {
  title: string,
  values: IDataValues[]
}

export interface IDataValues {
  title: string,
  value: number,
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