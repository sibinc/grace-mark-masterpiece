
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Rule } from '@/types';
import { mockRules } from '@/lib/mockData';
import RuleCard from './RuleCard';
import CreateRuleForm from './CreateRuleForm';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const CreateRule: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateRule = (rule: Rule) => {
    setRules([...rules, rule]);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Grace Mark Rules</h1>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <RuleCard rule={rule} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="sm:max-w-md md:max-w-lg p-0 border-0 shadow-xl bg-white overflow-hidden">
          <CreateRuleForm 
            onCreateRule={handleCreateRule} 
            onClose={() => setIsFormOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CreateRule;
