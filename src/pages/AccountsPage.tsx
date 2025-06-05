import React, { useState, useEffect } from 'react';
import BottomTabBar from '@/components/layout/BottomTabBar';
import BottomNavigationItem from '@/components/layout/BottomNavigationItem';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import TransactionListItem from '@/components/TransactionListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet, Home, ArrowRightLeft, CreditCard, Settings, PlusCircle } from 'lucide-react';

// Placeholder Data
const mockAccounts = [
  { id: '1', accountName: 'Current Account', accountNumber: '•••• 1234', balance: 1250.75, currencySymbol: '£' },
  { id: '2', accountName: 'Savings Account', accountNumber: '•••• 5678', balance: 5800.20, currencySymbol: '£' },
  { id: '3', accountName: 'Credit Card', accountNumber: '•••• 4321', balance: -350.00, currencySymbol: '£' },
];

const mockTransactions = [
  { id: 't1', description: 'Tesco Groceries', amount: 55.20, date: new Date(2024, 6, 20), type: 'debit' as 'debit', category: 'Groceries' },
  { id: 't2', description: 'Salary Deposit', amount: 2100.00, date: new Date(2024, 6, 18), type: 'credit' as 'credit', category: 'Income' },
  { id: 't3', description: 'Netflix Subscription', amount: 9.99, date: new Date(2024, 6, 15), type: 'debit' as 'debit', category: 'Entertainment' },
  { id: 't4', description: 'Gym Membership', amount: 30.00, date: new Date(2024, 6, 12), type: 'debit' as 'debit', category: 'Health' },
  { id: 't5', description: 'Refund from ASOS', amount: 25.50, date: new Date(2024, 6, 10), type: 'credit' as 'credit', category: 'Shopping' },
];

const AccountsPage: React.FC = () => {
  console.log('AccountsPage loaded');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground p-4 shadow-md md:hidden sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Accounts</h1>
        <Button variant="ghost" size="icon" className="text-primary-foreground">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-grow p-4 pb-20 md:pb-4">
        <section aria-labelledby="accounts-summary-heading" className="mb-6">
          <h2 id="accounts-summary-heading" className="sr-only">Account Summaries</h2>
          <div className="space-y-4">
            {isLoading
              ? Array(2).fill(0).map((_, index) => (
                  <AccountSummaryCard key={index} accountName="" balance={0} isLoading={true} />
                ))
              : mockAccounts.map(acc => (
                  <AccountSummaryCard
                    key={acc.id}
                    accountName={acc.accountName}
                    accountNumber={acc.accountNumber}
                    balance={acc.balance}
                    currencySymbol={acc.currencySymbol}
                    onPress={() => console.log(`View account ${acc.id}`)}
                    onOptionsClick={() => console.log(`Options for account ${acc.id}`)}
                  />
                ))}
          </div>
        </section>

        <section aria-labelledby="recent-transactions-heading">
          <div className="flex justify-between items-center mb-3">
            <h2 id="recent-transactions-heading" className="text-lg font-semibold text-gray-700">Recent Transactions</h2>
            <Button variant="link" className="text-primary p-0 h-auto">View All</Button>
          </div>
          <ScrollArea className="h-[calc(100vh-450px)] md:h-auto bg-white rounded-lg shadow"> {/* Adjust height as needed */}
            <div className="p-1">
              {isLoading
                ? Array(5).fill(0).map((_, index) => (
                    <TransactionListItem key={index} id="" description="" amount={0} date="" type="debit" isLoading={true} />
                  ))
                : mockTransactions.map(tx => (
                    <TransactionListItem
                      key={tx.id}
                      id={tx.id}
                      description={tx.description}
                      amount={tx.amount}
                      date={tx.date}
                      type={tx.type}
                      category={tx.category}
                      currencySymbol="£"
                      onPress={(id) => console.log(`View transaction ${id}`)}
                    />
                  ))}
            </div>
          </ScrollArea>
        </section>
      </main>

      <BottomTabBar>
        <BottomNavigationItem icon={Wallet} label="Accounts" to="/accounts" />
        <BottomNavigationItem icon={ArrowRightLeft} label="Transfers" to="/transfers" />
        <BottomNavigationItem icon={CreditCard} label="Payments" to="/payments" />
        <BottomNavigationItem icon={Settings} label="Settings" to="/profile-settings" />
      </BottomTabBar>
    </div>
  );
};

export default AccountsPage;