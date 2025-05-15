  import React, { useState } from 'react';
import { X, PenSquare, LayoutGrid, ChevronRight } from 'lucide-react';

const Form = ({ isOpen, onClose, onContinue }) => {
  const [selectedType, setSelectedType] = useState('new');
  const defaultDueDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="font-poppins fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div 
        className="relative  bg-dark-bg-secondary4 text-white  rounded-xl max-w-lg w-full mx-4 shadow-2xl animate-scaleIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Add Challenge to Group</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-dark-bg-secondary3 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className=" px-6 py-5 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Challenge Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium ">
                Challenge Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedType === 'new' 
                      ? 'border border-border_Col bg-btn-bg shadow-sm' 
                      : ' hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedType('new')}
                >
                  <div className={`p-3 rounded-full mb-2 ${
                    selectedType === 'new' 
                      ? 'bg-dark-bg-secondary4' 
                      : 'bg-btn-bg'
                  }`}>
                    <PenSquare className={`h-5 w-5 ${
                      selectedType === 'new' 
                        ? 'text-white' 
                        : ''
                    }`} />
                  </div>
                  <p className="font-medium text-white">Create New</p>
                  <p className="text-xs text-slate-200 mt-1">Create a custom challenge</p>
                  {selectedType === 'new' && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-dark-bg-primary rounded-full"></div>
                  )}
                </button>
                
                <button 
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedType === 'existing' 
                      ? 'border border-border_Col bg-btn-bg shadow-sm' 
                      : ' hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedType('existing')}
                >
                  <div className={`p-3 rounded-full mb-2 ${
                    selectedType === 'existing' 
                     ? 'bg-dark-bg-secondary4' 
                      : 'bg-dark-bg-secondary2'
                  }`}>
                    <LayoutGrid className={`h-5 w-5 ${
                      selectedType === 'existing' 
                        ? 'text-white' 
                        : ''
                    }`} />
                  </div>
                  <p className="font-medium">Use Existing</p>
                  <p className="text-xs text-gray-500 mt-1">Choose from public challenges</p>
                  {selectedType === 'existing' && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-dark-bg-primary rounded-full"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Challenge Name */}
            <div className="space-y-2">
              <label htmlFor="challengeName" className="block text-sm font-medium ">
                Challenge Name
              </label>
              <input
                type="text"
                id="challengeName"
                className="w-full px-4 py-3 rounded-lg border border-border_Col bg-dark-bg-secondary3 transition-all duration-200 outline-none"
                placeholder="Enter a descriptive name"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="challengeDescription" className="block text-sm font-medium ">
                Description
              </label>
              <textarea
                id="challengeDescription"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-border_Col bg-dark-bg-secondary3 transition-all duration-200 outline-none resize-none"
                placeholder="Describe what participants need to do"
              />
            </div>

            {/* Difficulty and Time Limit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="difficulty" className="block text-sm font-medium">
                  Difficulty
                </label>
                <select 
                  id="difficulty" 
                  className="w-full px-4 py-3 rounded-lg border  border-border_Col bg-dark-bg-secondary3 transition-all duration-200 outline-none appearance-none pr-10"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="timeLimit" className="block text-sm font-medium">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  id="timeLimit"
                  className="w-full px-4 py-3 rounded-lg border border-border_Col bg-dark-bg-secondary3 transition-all duration-200 outline-none"
                  placeholder="e.g. 30"
                  min="1"
                  defaultValue="30"
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-sm font-medium ">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="w-full px-4 py-3 bg-dark-bg-secondary3 rounded-lg border border-border_Col bg-dark-bg-secondary3transition-all duration-200 outline-none"
                defaultValue={defaultDueDate}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2   bg-btn-txt text-white rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 Btn1 focus:ring-offset-2 transition-all duration-200 flex items-center gap-1"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
