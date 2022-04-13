import { ElementOf, tuple } from '@/src/utils'

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning')

// 目前tag只定义了两种 orange green,不排除未来有更多颜色
export const PresetColorTypes = tuple(
  'red',
  'yellow',
  'orange',
  'green',
  'blue',
  'grey'
);

export type PresetColorType = ElementOf<typeof PresetColorTypes>
export type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>
