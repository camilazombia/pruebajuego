export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  /** Título accesible (lo lee el screen reader) */
  title?: string;
  /** Tamaño en px si no usas width/height explícitos */
  size?: number | string;
}
