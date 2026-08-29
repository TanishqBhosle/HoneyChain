import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={`h-8 w-8 animate-spin text-primary-500 ${className || ''}`} />
}
