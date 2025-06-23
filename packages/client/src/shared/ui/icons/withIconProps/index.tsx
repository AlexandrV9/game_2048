import cn from 'clsx'

import styles from './Icon.module.css'

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

export const withIconProps = (
  WrappedComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>
) => {
  const Component = ({ size = 24, style, className, ...props }: IconProps) => {
    return (
      <WrappedComponent
        className={cn(styles.icon, className)}
        style={{
          ...{
            '--icon-size': `${size}px`,
          },
          ...style,
        }}
        {...props}
      />
    )
  }

  return Component
}
