
import React, { useState } from 'react';
import { Rule } from '@/types';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, XCircle } from 'lucide-react';

interface RuleCardProps {
  rule: Rule;
}

const RuleCard: React.FC<RuleCardProps> = ({ rule }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden card-hover soft-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)' : '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{rule.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{rule.description}</p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm font-medium text-primary hover:text-primary/80 hover:no-underline">
              View Details
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${rule.theory_practical.theory ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    Theory
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${rule.theory_practical.practical ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    Practical
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">Distribution Type</h4>
                    <p className="text-sm capitalize">{rule.distribution_type}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">Mark Type</h4>
                    <p className="text-sm capitalize">{rule.mark_type}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Marks Awarded</h4>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-xs font-medium">Pass Paper</h5>
                        {rule.marks_awarded.pass_paper.enabled ? 
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                          <XCircle className="h-4 w-4 text-gray-400" />}
                      </div>
                      {rule.marks_awarded.pass_paper.enabled && (
                        <div className="text-xs text-gray-600">
                          <p>Max Mark: {rule.marks_awarded.pass_paper.max_mark}</p>
                          <p>Should Not Exceed: {rule.marks_awarded.pass_paper.should_not_exceed}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-xs font-medium">Supplementary Paper</h5>
                        {rule.marks_awarded.supplementary_paper.enabled ? 
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                          <XCircle className="h-4 w-4 text-gray-400" />}
                      </div>
                      {rule.marks_awarded.supplementary_paper.enabled && (
                        <div className="text-xs text-gray-600">
                          <p>Max Mark: {rule.marks_awarded.supplementary_paper.max_mark}</p>
                          <p>Should Not Exceed: {rule.marks_awarded.supplementary_paper.should_not_exceed}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-medium text-gray-500">Subject Limit</h4>
                    {rule.subject_limit.enabled ? 
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-gray-400" />}
                  </div>
                  {rule.subject_limit.enabled && (
                    <p className="text-xs text-gray-600 mt-1">Limit: {rule.subject_limit.limit}</p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default RuleCard;
