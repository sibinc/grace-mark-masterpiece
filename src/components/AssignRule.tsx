
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Application } from '@/types';
import { mockApplications, mockRules } from '@/lib/mockData';
import AssignRuleForm from './AssignRuleForm';
import { toast } from 'sonner';

const AssignRule: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (application: Application) => {
    setSelectedApplication(application);
    setIsFormOpen(true);
  };

  const handleSaveAssignments = (
    applicationId: string,
    updatedRules: Array<{ eventId: string; ruleId: string | null; fromDate: string | null; toDate: string | null }>
  ) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId
          ? { ...app, rules: updatedRules }
          : app
      )
    );
  };

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Grace Mark Applications</h1>
        <p className="text-gray-500">Assign rules to grace mark applications</p>
      </div>

      <div className="bg-white rounded-xl overflow-hidden soft-shadow border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Events
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => {
                const assignedRulesCount = application.rules.filter(rule => rule.ruleId !== null).length;
                
                return (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span>{application.events.length} event{application.events.length !== 1 ? 's' : ''}</span>
                        {assignedRulesCount > 0 && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {assignedRulesCount} assigned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => handleOpenForm(application)}
                        variant="outline"
                        size="sm"
                      >
                        Assign Rules
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApplication && (
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetContent className="sm:max-w-md md:max-w-lg p-0 border-0 shadow-xl bg-white overflow-hidden">
            <AssignRuleForm
              application={selectedApplication}
              rules={mockRules}
              onClose={() => setIsFormOpen(false)}
              onSave={handleSaveAssignments}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default AssignRule;
