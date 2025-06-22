import { AlertTriangle, Wifi, RefreshCw } from 'lucide-react'
import { Button } from './button'
import { Card } from './card'

interface FallbackProps {
  type?: 'error' | 'offline' | 'empty' | 'loading'
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function Fallback({ 
  type = 'error', 
  title, 
  description, 
  action,
  className = ""
}: FallbackProps) {
  const getIcon = () => {
    switch (type) {
      case 'offline':
        return <Wifi className="h-8 w-8 text-muted-foreground" />
      case 'empty':
        return <div className="w-8 h-8 rounded-full bg-muted" />
      case 'loading':
        return <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
      default:
        return <AlertTriangle className="h-8 w-8 text-destructive" />
    }
  }

  const getDefaultContent = () => {
    switch (type) {
      case 'offline':
        return {
          title: 'You&apos;re offline',
          description: 'Please check your internet connection and try again.'
        }
      case 'empty':
        return {
          title: 'Nothing here yet',
          description: 'This section is empty. Check back later for updates.'
        }
      case 'loading':
        return {
          title: 'Loading...',
          description: 'Please wait while we fetch your data.'
        }
      default:
        return {
          title: 'Something went wrong',
          description: 'We encountered an error. Please try again.'
        }
    }
  }

  const defaults = getDefaultContent()

  return (
    <Card className={`p-8 text-center space-y-4 ${className}`}>
      <div className="flex justify-center">
        <div className={`p-3 rounded-full ${
          type === 'error' ? 'bg-destructive/10' : 'bg-muted'
        }`}>
          {getIcon()}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">
          {title || defaults.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description || defaults.description}
        </p>
      </div>

      {action && (
        <Button 
          onClick={action.onClick}
          variant={type === 'error' ? 'default' : 'outline'}
          size="sm"
        >
          {action.label}
        </Button>
      )}
    </Card>
  )
}

// Specific fallback components for common use cases
export function ErrorFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <Fallback 
      type="error"
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    />
  )
}

export function EmptyFallback({ message }: { message?: string }) {
  return (
    <Fallback 
      type="empty"
      description={message}
    />
  )
}

export function OfflineFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <Fallback 
      type="offline"
      action={onRetry ? { label: 'Retry', onClick: onRetry } : undefined}
    />
  )
}

export function LoadingFallback({ message }: { message?: string }) {
  return (
    <Fallback 
      type="loading"
      description={message}
    />
  )
}