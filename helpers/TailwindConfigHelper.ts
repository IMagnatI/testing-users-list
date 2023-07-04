import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config.js'

interface IColor {
  [key: string]: string
}

class TailwindConfigHelper {
  public get colors(): IColor {
    if (!resolveConfig(tailwindConfig).theme?.colors) return {}

    return resolveConfig(tailwindConfig).theme?.colors as IColor
  }
}

const tailwindConfigHelper = new TailwindConfigHelper()
export default tailwindConfigHelper
