
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Application, Rule, Event, AssignmentFormData } from '@/types';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CalendarIcon, CheckCircle, Save, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AssignRuleFormProps {
  application: Application;
  rules: Rule[];
  onClose: () => void;
  onSave: (applicationId: string, updatedRules: Array<{ eventId: string; ruleId: string | null; fromDate: string | null; toDate: string | null }>) => void;
}

const AssignRuleForm: React.FC<AssignRuleFormProps> = ({ application, rules, onClose, onSave }) => {
  const [formData, setFormData] = useState<Record<string, AssignmentFormData>>(() => {
    const initialData: Record<string, AssignmentFormData> = {};
    application.rules.forEach((rule) => {
      initialData[rule.eventId] = {
        ruleId: rule.ruleId,
        fromDate: rule.fromDate,
        toDate: rule.toDate,
      };
    });
    return initialData;
  });

  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const handleRuleChange = (eventId: string, ruleId: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        ruleId,
      },
    }));
  };

  const handleFromDateChange = (eventId: string, date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        fromDate: date ? format(date, 'yyyy-MM-dd') : null,
      },
    }));
  };

  const handleToDateChange = (eventId: string, date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        toDate: date ? format(date, 'yyyy-MM-dd') : null,
      },
    }));
  };

  const handleSaveEvent = (eventId: string) => {
    const eventData = formData[eventId];
    
    if (!eventData.ruleId) {
      toast.error('Please select a rule');
      return;
    }
    
    if (!eventData.fromDate) {
      toast.error('Please select a from date');
      return;
    }
    
    if (!eventData.toDate) {
      toast.error('Please select a to date');
      return;
    }
    
    setSavedEvents((prev) => [...prev, eventId]);
    toast.success('Event rule saved');
  };

  const handleSaveAll = () => {
    const updatedRules = application.rules.map((rule) => ({
      eventId: rule.eventId,
      ruleId: formData[rule.eventId]?.ruleId || null,
      fromDate: formData[rule.eventId]?.fromDate || null,
      toDate: formData[rule.eventId]?.toDate || null,
    }));
    
    onSave(application.id, updatedRules);
    toast.success('Rules assigned successfully');
    onClose();
  };

  const getEventById = (eventId: string): Event | undefined => {
    return application.events.find((event) => event.id === eventId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-medium">{application.name}</h2>
          <p className="text-sm text-gray-500 mt-1">Assign rules to events</p>
        </div>
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
        <div className="space-y-6">
          {application.events.map((event) => {
            const isSaved = savedEvents.includes(event.id);
            
            return (
              <div 
                key={event.id} 
                className={cn(
                  "border rounded-lg p-5",
                  isSaved ? "border-green-100 bg-green-50" : "border-gray-200"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-md font-medium">{event.name}</h3>
                    {isSaved && (
                      <span className="ml-2 flex items-center text-green-600 text-xs font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Saved
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`rule-${event.id}`} className="text-sm font-medium mb-1 block">
                      Select Rule
                    </Label>
                    <Select 
                      value={formData[event.id]?.ruleId || ""} 
                      onValueChange={(value) => handleRuleChange(event.id, value || null)}
                      disabled={isSaved}
                    >
                      <SelectTrigger id={`rule-${event.id}`} className="w-full">
                        <SelectValue placeholder="Select a rule" />
                      </SelectTrigger>
                      <SelectContent>
                        {rules.map((rule) => (
                          <SelectItem key={rule.id} value={rule.id}>{rule.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        From Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData[event.id]?.fromDate && "text-muted-foreground"
                            )}
                            disabled={isSaved}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData[event.id]?.fromDate ? (
                              format(new Date(formData[event.id]?.fromDate), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData[event.id]?.fromDate ? new Date(formData[event.id]?.fromDate) : undefined}
                            onSelect={(date) => handleFromDateChange(event.id, date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        To Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData[event.id]?.toDate && "text-muted-foreground"
                            )}
                            disabled={isSaved}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData[event.id]?.toDate ? (
                              format(new Date(formData[event.id]?.toDate), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData[event.id]?.toDate ? new Date(formData[event.id]?.toDate) : undefined}
                            onSelect={(date) => handleToDateChange(event.id, date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSaveEvent(event.id)}
                      disabled={isSaved}
                      size="sm"
                      className="gap-1"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-6 border-t bg-gray-50">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {savedEvents.length} of {application.events.length} events configured
          </p>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveAll}
              disabled={savedEvents.length !== application.events.length}
            >
              Save All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRuleForm;
