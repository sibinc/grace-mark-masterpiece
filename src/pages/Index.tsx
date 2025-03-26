
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateRule from '@/components/CreateRule';
import AssignRule from '@/components/AssignRule';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Grace Mark Rule</h1>
              <p className="text-sm text-gray-500">Manage and assign rules</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <Check className="mr-1 h-3 w-3" />
              Demo Mode
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-6">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="create"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="bg-white rounded-xl soft-shadow border border-gray-100 p-1 mb-6 inline-flex">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger 
                  value="create" 
                  className={cn(
                    "data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center py-3 px-6 rounded-lg transition-all",
                    activeTab === "create" ? "" : "hover:bg-gray-50"
                  )}
                >
                  <ListFilter className="mr-2 h-4 w-4" />
                  <span>Create Rule</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="assign" 
                  className={cn(
                    "data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center py-3 px-6 rounded-lg transition-all",
                    activeTab === "assign" ? "" : "hover:bg-gray-50"
                  )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Assign Rule</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <AnimatePresence mode="wait">
              <TabsContent 
                value="create" 
                className="mt-0"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CreateRule />
                </motion.div>
              </TabsContent>
              
              <TabsContent 
                value="assign" 
                className="mt-0"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AssignRule />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
