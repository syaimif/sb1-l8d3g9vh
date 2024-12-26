import React from 'react';
import type { DocumentDetails } from '../../types/document';

interface DocumentDetailsFormProps {
  details: DocumentDetails;
  onChange: (details: DocumentDetails) => void;
}

export const DocumentDetailsForm: React.FC<DocumentDetailsFormProps> = ({
  details,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...details, [name]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="officialName" className="block text-sm font-medium text-gray-700">
          Official Name
        </label>
        <input
          type="text"
          id="officialName"
          name="officialName"
          value={details.officialName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={details.position}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="documentDate" className="block text-sm font-medium text-gray-700">
          Document Date
        </label>
        <input
          type="date"
          id="documentDate"
          name="documentDate"
          value={details.documentDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">
          Document Number
        </label>
        <input
          type="text"
          id="documentNumber"
          name="documentNumber"
          value={details.documentNumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
};