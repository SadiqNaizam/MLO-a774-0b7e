import React from 'react';
import BottomTabBar from '@/components/layout/BottomTabBar';
import BottomNavigationItem from '@/components/layout/BottomNavigationItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet, ArrowRightLeft, CreditCard, Settings, UserCircle, Bell, Shield, Lock, LogOut, HelpCircle, FileText } from 'lucide-react';

const ProfileSettingsPage: React.FC = () => {
  console.log('ProfileSettingsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground p-4 shadow-md md:hidden sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-center">Profile & Settings</h1>
      </header>
      <main className="flex-grow p-4 pb-20 md:pb-4">
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-center space-x-4">
                <UserCircle className="h-16 w-16 text-primary" />
                <div>
                    <CardTitle className="text-xl">John Doe</CardTitle>
                    <CardDescription>john.doe@tsb.com</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
        </Card>

        <ScrollArea className="h-auto"> {/* Adjust height if content becomes very long */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            <Card>
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>Security Settings</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="change-pin">Change PIN</Label>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="biometrics-switch">Enable Biometric Login</Label>
                    <Switch id="biometrics-switch" defaultChecked />
                  </div>
                  <Separator />
                   <div className="flex items-center justify-between">
                    <Label htmlFor="2fa-setup">Two-Factor Authentication</Label>
                    <Button variant="outline" size="sm">Set Up</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <span>Notification Preferences</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-updates">Email Updates</Label>
                    <Switch id="email-updates" />
                  </div>
                   <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-alerts">SMS Alerts for Transactions</Label>
                    <Switch id="sms-alerts" defaultChecked/>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
            
            <Card>
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 hover:no-underline">
                     <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Statements & Documents</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 space-y-2">
                    <Button variant="link" className="p-0 h-auto text-primary">View e-Statements</Button><br/>
                    <Button variant="link" className="p-0 h-auto text-primary">Tax Documents</Button><br/>
                    <Button variant="link" className="p-0 h-auto text-primary">Terms & Conditions</Button>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="px-6 hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <span>Help & Support</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 space-y-2">
                        <Button variant="link" className="p-0 h-auto text-primary">FAQs</Button><br/>
                        <Button variant="link" className="p-0 h-auto text-primary">Contact Us</Button><br/>
                        <Button variant="link" className="p-0 h-auto text-primary">Report an Issue</Button>
                    </AccordionContent>
                </AccordionItem>
            </Card>
          </Accordion>
        
          <div className="mt-8">
            <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </ScrollArea>

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

export default ProfileSettingsPage;