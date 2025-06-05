import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import BottomTabBar from '@/components/layout/BottomTabBar';
import BottomNavigationItem from '@/components/layout/BottomNavigationItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Wallet, ArrowRightLeft, CreditCard, Settings, Users, Landmark } from 'lucide-react';

const transferSchema = z.object({
  fromAccount: z.string().nonempty("Please select an account to transfer from."),
  toAccountType: z.enum(['own', 'tsb', 'external']),
  beneficiaryName: z.string().nonempty("Beneficiary name is required."),
  accountNumber: z.string().regex(/^\d{8}$/, "Enter a valid 8-digit account number."),
  sortCode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit sort code.").optional(),
  amount: z.coerce.number().positive("Amount must be positive."),
  reference: z.string().max(50, "Reference too long.").optional(),
});

type TransferFormValues = z.infer<typeof transferSchema>;

const TransfersPage: React.FC = () => {
  console.log('TransfersPage loaded');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<TransferFormValues | null>(null);

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccount: "",
      toAccountType: "tsb",
      beneficiaryName: "",
      accountNumber: "",
      sortCode: "",
      amount: 0,
      reference: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: TransferFormValues) => {
    console.log("Transfer data:", data);
    setFormData(data);
    setShowConfirmDialog(true);
  };
  
  const handleConfirmTransfer = () => {
    console.log("Transfer confirmed:", formData);
    // Simulate API call
    setShowConfirmDialog(false);
    toast.success("Transfer initiated successfully!");
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-primary text-primary-foreground p-4 shadow-md md:hidden sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-center">Make a Transfer</h1>
        </header>
        <main className="flex-grow p-4 pb-20 md:pb-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-12 w-full" />
        </main>
         <BottomTabBar>
            <BottomNavigationItem icon={Wallet} label="Accounts" to="/accounts" />
            <BottomNavigationItem icon={ArrowRightLeft} label="Transfers" to="/transfers" />
            <BottomNavigationItem icon={CreditCard} label="Payments" to="/payments" />
            <BottomNavigationItem icon={Settings} label="Settings" to="/profile-settings" />
        </BottomTabBar>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground p-4 shadow-md md:hidden sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-center">Make a Transfer</h1>
      </header>
      <main className="flex-grow p-4 pb-20 md:pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fromAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="current-acc-1234">Current Account (•••• 1234) - £1,250.75</SelectItem>
                      <SelectItem value="savings-acc-5678">Savings Account (•••• 5678) - £5,800.20</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="toAccountType"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>To Account Type</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="own" /></FormControl>
                            <FormLabel className="font-normal">My Own Account</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="tsb" /></FormControl>
                            <FormLabel className="font-normal">Another TSB Account</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="external" /></FormControl>
                            <FormLabel className="font-normal">External Account</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
              control={form.control}
              name="beneficiaryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiary Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl><Input placeholder="12345678" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("toAccountType") === 'external' && (
                    <FormField
                    control={form.control}
                    name="sortCode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sort Code (External)</FormLabel>
                        <FormControl><Input placeholder="112233" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                )}
            </div>
           

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (£)</FormLabel>
                  <FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference (Optional)</FormLabel>
                  <FormControl><Input placeholder="e.g., Rent payment" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Review Transfer</Button>
          </form>
        </Form>
      </main>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the details before confirming the transfer.
            </DialogDescription>
          </DialogHeader>
          {formData && (
            <div className="space-y-2 my-4">
              <p><strong>From:</strong> {formData.fromAccount}</p>
              <p><strong>To:</strong> {formData.beneficiaryName} ({formData.accountNumber})</p>
              {formData.sortCode && <p><strong>Sort Code:</strong> {formData.sortCode}</p>}
              <p><strong>Amount:</strong> £{formData.amount.toFixed(2)}</p>
              {formData.reference && <p><strong>Reference:</strong> {formData.reference}</p>}
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <Button type="button" onClick={handleConfirmTransfer}>Confirm & Send</Button>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomTabBar>
        <BottomNavigationItem icon={Wallet} label="Accounts" to="/accounts" />
        <BottomNavigationItem icon={ArrowRightLeft} label="Transfers" to="/transfers" />
        <BottomNavigationItem icon={CreditCard} label="Payments" to="/payments" />
        <BottomNavigationItem icon={Settings} label="Settings" to="/profile-settings" />
      </BottomTabBar>
    </div>
  );
};

export default TransfersPage;