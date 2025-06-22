import { cn } from '@/lib/utils/cn';

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
}

export function ImagePlaceholder({ text = 'Image', className }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-muted text-muted-foreground',
        className
      )}
    >
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}