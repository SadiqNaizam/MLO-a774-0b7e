import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccountSummaryCardProps {
  accountName: string;
  accountNumber?: string; // e.g., "•••• 1234"
  balance: number;
  currencySymbol?: string;
  isLoading?: boolean;
  onPress?: () => void;
  onOptionsClick?: () => void; // Optional: For a menu
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountName,
  accountNumber,
  balance,
  currencySymbol = '$',
  isLoading = false,
  onPress,
  onOptionsClick,
}) => {
  console.log(`Rendering AccountSummaryCard: ${accountName}, Loading: ${isLoading}`);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <Skeleton className="h-5 w-3/5" />
          {onOptionsClick && <Skeleton className="h-8 w-8 rounded-full" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-2/5 mt-1 mb-2" />
          {accountNumber && <Skeleton className="h-4 w-1/3" />}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${onPress ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`} onClick={onPress}>
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">{accountName}</CardTitle>
          {accountNumber && (
            <CardDescription className="text-xs text-muted-foreground">{accountNumber}</CardDescription>
          )}
        </div>
        {onOptionsClick && (
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onOptionsClick(); }} className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Account Options</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currencySymbol}
          {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        {/* Could add a small chart or trend indicator here later */}
      </CardContent>
    </Card>
  );
};

export default AccountSummaryCard;