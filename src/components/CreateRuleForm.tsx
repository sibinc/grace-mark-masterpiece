
import React, { useState } from 'react';
import { Rule } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { X } from 'lucide-react';

interface CreateRuleFormProps {
  onCreateRule: (rule: Rule) => void;
  onClose: () => void;
}

const CreateRuleForm: React.FC<CreateRuleFormProps> = ({ onCreateRule, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isTheory, setIsTheory] = useState(false);
  const [isPractical, setIsPractical] = useState(true);
  const [distributionType, setDistributionType] = useState<'percentage' | 'mark'>('percentage');
  const [markType, setMarkType] = useState<'max' | 'obtained'>('max');
  
  const [passEnabled, setPassEnabled] = useState(true);
  const [passMaxMark, setPassMaxMark] = useState(100);
  const [passShouldNotExceed, setPassShouldNotExceed] = useState(50);
  
  const [supplementaryEnabled, setSupplementaryEnabled] = useState(true);
  const [supplementaryMaxMark, setSupplementaryMaxMark] = useState(75);
  const [supplementaryShouldNotExceed, setSupplementaryShouldNotExceed] = useState(40);
  
  const [subjectLimitEnabled, setSubjectLimitEnabled] = useState(false);
  const [subjectLimit, setSubjectLimit] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a rule name');
      return;
    }
    
    const newRule: Rule = {
      id: nanoid(),
      name,
      description,
      theory_practical: {
        theory: isTheory,
        practical: isPractical
      },
      distribution_type: distributionType,
      mark_type: markType,
      marks_awarded: {
        pass_paper: {
          enabled: passEnabled,
          max_mark: passMaxMark,
          should_not_exceed: passShouldNotExceed
        },
        supplementary_paper: {
          enabled: supplementaryEnabled,
          max_mark: supplementaryMaxMark,
          should_not_exceed: supplementaryShouldNotExceed
        }
      },
      subject_limit: {
        enabled: subjectLimitEnabled,
        limit: subjectLimit
      }
    };
    
    onCreateRule(newRule);
    toast.success('Rule created successfully');
    onClose();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-medium">Create New Rule</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Rule Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                placeholder="Enter rule name"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                placeholder="Enter description"
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Applicable For</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="theory" className="text-sm">Theory</Label>
              <Switch
                id="theory"
                checked={isTheory}
                onCheckedChange={setIsTheory}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="practical" className="text-sm">Practical</Label>
              <Switch
                id="practical"
                checked={isPractical}
                onCheckedChange={setIsPractical}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Distribution Type</h3>
            
            <RadioGroup 
              value={distributionType} 
              onValueChange={(value) => setDistributionType(value as 'percentage' | 'mark')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage" className="text-sm">Percentage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mark" id="mark" />
                <Label htmlFor="mark" className="text-sm">Mark</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Mark Type</h3>
            
            <RadioGroup 
              value={markType} 
              onValueChange={(value) => setMarkType(value as 'max' | 'obtained')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="max" id="max" />
                <Label htmlFor="max" className="text-sm">Maximum</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="obtained" id="obtained" />
                <Label htmlFor="obtained" className="text-sm">Obtained</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Marks Awarded</h3>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="passEnabled" className="text-sm font-medium">Pass Paper</Label>
                <Switch
                  id="passEnabled"
                  checked={passEnabled}
                  onCheckedChange={setPassEnabled}
                />
              </div>
              
              {passEnabled && (
                <div className="space-y-3 pt-2">
                  <div>
                    <Label htmlFor="passMaxMark" className="text-xs text-gray-500">Max Mark</Label>
                    <Input
                      id="passMaxMark"
                      type="number"
                      value={passMaxMark}
                      onChange={(e) => setPassMaxMark(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="passShouldNotExceed" className="text-xs text-gray-500">Should Not Exceed</Label>
                    <Input
                      id="passShouldNotExceed"
                      type="number"
                      value={passShouldNotExceed}
                      onChange={(e) => setPassShouldNotExceed(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="supplementaryEnabled" className="text-sm font-medium">Supplementary Paper</Label>
                <Switch
                  id="supplementaryEnabled"
                  checked={supplementaryEnabled}
                  onCheckedChange={setSupplementaryEnabled}
                />
              </div>
              
              {supplementaryEnabled && (
                <div className="space-y-3 pt-2">
                  <div>
                    <Label htmlFor="supplementaryMaxMark" className="text-xs text-gray-500">Max Mark</Label>
                    <Input
                      id="supplementaryMaxMark"
                      type="number"
                      value={supplementaryMaxMark}
                      onChange={(e) => setSupplementaryMaxMark(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="supplementaryShouldNotExceed" className="text-xs text-gray-500">Should Not Exceed</Label>
                    <Input
                      id="supplementaryShouldNotExceed"
                      type="number"
                      value={supplementaryShouldNotExceed}
                      onChange={(e) => setSupplementaryShouldNotExceed(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="subjectLimitEnabled" className="text-sm font-medium">Subject Limit</Label>
              <Switch
                id="subjectLimitEnabled"
                checked={subjectLimitEnabled}
                onCheckedChange={setSubjectLimitEnabled}
              />
            </div>
            
            {subjectLimitEnabled && (
              <div>
                <Label htmlFor="subjectLimit" className="text-xs text-gray-500">Limit</Label>
                <Input
                  id="subjectLimit"
                  type="number"
                  value={subjectLimit}
                  onChange={(e) => setSubjectLimit(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </form>
      </div>
      
      <div className="p-6 border-t bg-gray-50">
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
          >
            Create Rule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRuleForm;
