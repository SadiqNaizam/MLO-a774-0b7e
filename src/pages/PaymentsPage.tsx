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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Wallet, ArrowRightLeft, CreditCard, Settings, CalendarIcon, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const paymentSchema = z.object({
  payeeName: z.string().nonempty("Payee name is required."),
  payeeAccountNumber: z.string().regex(/^\d{8}$/, "Enter a valid 8-digit account number."),
  payeeSortCode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit sort code.").optional(),
  fromAccount: z.string().nonempty("Please select an account."),
  amount: z.coerce.number().positive("Amount must be positive."),
  paymentDate: z.date({ required_error: "Payment date is required."}),
  reference: z.string().max(30).optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const mockPayees = [
    { id: 'p1', name: 'EDF Energy', lastPaid: '£75.00 on 15 Jun 2024' },
    { id: 'p2', name: 'Sky Broadband', lastPaid: '£42.50 on 10 Jun 2024' },
    { id: 'p3', name: 'Council Tax', lastPaid: '£180.00 on 01 Jun 2024' },
];

const PaymentsPage: React.FC = () => {
  console.log('PaymentsPage loaded');
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPaymentDialog, setShowNewPaymentDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<PaymentFormValues | null>(null);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payeeName: "",
      payeeAccountNumber: "",
      payeeSortCode: "",
      fromAccount: "",
      amount: 0,
      paymentDate: new Date(),
      reference: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    setFormData(data);
    setShowNewPaymentDialog(false); // Close new payment dialog
    setShowConfirmDialog(true); // Open confirmation dialog
  };

  const handleConfirmPayment = () => {
    console.log("Payment confirmed:", formData);
    setShowConfirmDialog(false);
    toast.success("Payment scheduled successfully!");
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
         <header className="bg-primary text-primary-foreground p-4 shadow-md md:hidden sticky top-0 z-10">
            <h1 className="text-xl font-semibold text-center">Payments</h1>
        </header>
        <main className="flex-grow p-4 pb-20 md:pb-4 space-y-4">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-1/3 mt-4" />
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
      <header className="bg-primary text-primary-foreground p-4 shadow-md md:hidden sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Payments</h1>
        <Button variant="ghost" size="icon" className="text-primary-foreground" onClick={() => setShowNewPaymentDialog(true)}>
          <PlusCircle className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-grow p-4 pb-20 md:pb-4">
        <div className="mb-6 flex justify-end">
            <Button onClick={() => setShowNewPaymentDialog(true)} className="hidden md:flex">
                <PlusCircle className="mr-2 h-4 w-4" /> Pay New Bill
            </Button>
        </div>

        <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Existing Payees</h2>
            {mockPayees.length > 0 ? (
                 <Card>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Payee</TableHead>
                            <TableHead>Last Payment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockPayees.map((payee) => (
                            <TableRow key={payee.id}>
                            <TableCell className="font-medium">{payee.name}</TableCell>
                            <TableCell>{payee.lastPaid}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => {
                                    form.setValue("payeeName", payee.name);
                                    // Potentially prefill other details if available
                                    setShowNewPaymentDialog(true);
                                }}>Pay</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                 </Card>
            ) : (
                <p className="text-muted-foreground">No payees set up yet.</p>
            )}
        </section>

        {/* New Payment Dialog */}
        <Dialog open={showNewPaymentDialog} onOpenChange={setShowNewPaymentDialog}>
            <DialogContent className="sm:max-w-[425px] md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Make a Payment</DialogTitle>
                    <DialogDescription>Enter the details for your new bill payment.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                        <FormField control={form.control} name="payeeName" render={({ field }) => (
                            <FormItem><FormLabel>Payee Name</FormLabel><FormControl><Input placeholder="e.g., Utility Company" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="payeeAccountNumber" render={({ field }) => (
                            <FormItem><FormLabel>Payee Account Number</FormLabel><FormControl><Input placeholder="87654321" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                         <FormField control={form.control} name="payeeSortCode" render={({ field }) => (
                            <FormItem><FormLabel>Payee Sort Code (Optional)</FormLabel><FormControl><Input placeholder="112233" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="fromAccount" render={({ field }) => (
                            <FormItem><FormLabel>From Account</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="current-acc-1234">Current Account (•••• 1234) - £1,250.75</SelectItem>
                                    <SelectItem value="savings-acc-5678">Savings Account (•••• 5678) - £5,800.20</SelectItem>
                                </SelectContent>
                                </Select><FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="amount" render={({ field }) => (
                            <FormItem><FormLabel>Amount (£)</FormLabel><FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="paymentDate" render={({ field }) => (
                            <FormItem className="flex flex-col"><FormLabel>Payment Date</FormLabel>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                                </PopoverContent>
                                </Popover><FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="reference" render={({ field }) => (
                            <FormItem><FormLabel>Reference (Optional)</FormLabel><FormControl><Input placeholder="Bill ID" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <DialogFooter className="pt-4">
                            <Button type="submit">Review Payment</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
         <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm Payment</DialogTitle>
                <DialogDescription>Please review your payment details.</DialogDescription>
            </DialogHeader>
            {formData && (
                <div className="space-y-2 my-4">
                    <p><strong>To:</strong> {formData.payeeName} ({formData.payeeAccountNumber})</p>
                    <p><strong>From:</strong> {formData.fromAccount}</p>
                    <p><strong>Amount:</strong> £{formData.amount.toFixed(2)}</p>
                    <p><strong>Date:</strong> {format(formData.paymentDate, "PPP")}</p>
                    {formData.reference && <p><strong>Reference:</strong> {formData.reference}</p>}
                </div>
            )}
            <DialogFooter className="sm:justify-start">
                <Button type="button" onClick={handleConfirmPayment}>Confirm & Pay</Button>
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
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

export default PaymentsPage;