import { GeneratorFn } from '../fake'

export interface ArrayFakeConfig<T> {
  length: number
  fn: GeneratorFn<T>
}

const normalizeConfig = <T>(config: ArrayFakeConfig<T>): ArrayFakeConfig<T> => {
  if (config.length == null || typeof config.length !== 'number') {
    throw new Error('Array length must be a number')
  }
  if (config.fn == null || typeof config.fn !== 'function') {
    throw new Error('Generator must be a function')
  }

  return config
}

export default function ArrayFake<T> (length: number, fn: GeneratorFn<T>): T[] {
  const fConfig = normalizeConfig({ length, fn })
  return Array(fConfig.length).fill(undefined).map(() => fConfig.fn())
}

ArrayFake.shape = function <T>(length: number, fn: GeneratorFn<T>): () => T[] {
  return () => {
    return ArrayFake(length, fn)
  }
}