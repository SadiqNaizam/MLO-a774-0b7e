import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, LucideIcon } from 'lucide-react'; // For transaction type icons

interface TransactionListItemProps {
  id: string;
  description: string;
  amount: number;
  date: string | Date; // Could be string or Date object
  type: 'credit' | 'debit' | 'transfer'; // To determine icon and color
  currencySymbol?: string;
  category?: string; // Optional category
  icon?: LucideIcon; // Optional custom icon
  imageUrl?: string; // Optional image for payee/payer
  isLoading?: boolean;
  onPress?: (id: string) => void;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  description,
  amount,
  date,
  type,
  currencySymbol = '$',
  category,
  icon: CustomIcon,
  imageUrl,
  isLoading = false,
  onPress,
}) => {
  console.log(`Rendering TransactionListItem: ${description}, Type: ${type}, Loading: ${isLoading}`);

  const formattedDate = typeof date === 'string' ? date : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const amountColor = type === 'credit' ? 'text-green-600' : 'text-red-600';
  const amountPrefix = type === 'credit' ? '+' : '-';
  const DefaultIcon = type === 'credit' ? ArrowDownLeft : ArrowUpRight;

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-md">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-1/4" />
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center space-x-3 p-3 rounded-md', onPress && 'cursor-pointer hover:bg-muted/50 transition-colors')}
      onClick={() => onPress?.(id)}
      role={onPress ? "button" : undefined}
      tabIndex={onPress ? 0 : undefined}
      onKeyDown={onPress ? (e) => (e.key === 'Enter' || e.key === ' ') && onPress(id) : undefined}
    >
      <Avatar className="h-10 w-10">
        {imageUrl ? <AvatarImage src={imageUrl} alt={description} /> : null}
        <AvatarFallback className={cn(type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
          {CustomIcon ? <CustomIcon className="h-5 w-5" /> : <DefaultIcon className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{description}</p>
        <p className="text-xs text-muted-foreground">
          {formattedDate}
          {category && ` • ${category}`}
        </p>
      </div>
      <div className={cn('text-sm font-semibold text-right', amountColor)}>
        {amountPrefix}
        {currencySymbol}
        {Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default TransactionListItem;