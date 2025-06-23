import { Root } from '@radix-ui/react-tooltip'
import { TooltipProvider } from './TooltipProvider'
import { TooltipTrigger } from './TooltipTrigger'
import { TooltipContent } from './TooltipContent'

export function Tooltip({ ...props }: React.ComponentProps<typeof Root>) {
  return (
    <TooltipProvider>
      <Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent
Tooltip.Provider = TooltipProvider
