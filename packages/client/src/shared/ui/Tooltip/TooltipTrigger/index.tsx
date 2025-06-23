import { Trigger } from '@radix-ui/react-tooltip'
import { type ComponentProps } from 'react'

export function TooltipTrigger({ ...props }: ComponentProps<typeof Trigger>) {
  return <Trigger data-slot="tooltip-trigger" {...props} />
}
