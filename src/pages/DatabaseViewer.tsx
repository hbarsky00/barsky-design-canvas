
import React from 'react';
import DatabaseViewer from '@/components/dev/DatabaseViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DatabaseViewerPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Database Verification Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            This tool helps you verify that image captions and other changes are being properly stored in the database.
            You can filter by type to see specific entries and toggle visibility of values for security.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What to look for:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>image_caption</strong> entries show AI-generated captions saved to database</li>
              <li>• <strong>image</strong> entries show uploaded/replaced images</li>
              <li>• <strong>text</strong> entries show edited text content</li>
              <li>• All entries should have recent timestamps when changes are made</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <DatabaseViewer />
    </div>
  );
};

export default DatabaseViewerPage;
