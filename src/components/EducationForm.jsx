import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const EducationForm = ({ education, onAdd, onRemove, onChange }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Education</CardTitle>
        <CardDescription className="text-gray-400">Add your educational background.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-md border-purple-800">
            <div className="space-y-2">
              <Label htmlFor={`school-${index}`}>School/University</Label>
              <Input
                id={`school-${index}`}
                name="school"
                value={edu.school}
                onChange={(e) => onChange(index, e)}
                className="bg-purple-900 border-purple-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree/Major</Label>
              <Input
                id={`degree-${index}`}
                name="degree"
                value={edu.degree}
                onChange={(e) => onChange(index, e)}
                className="bg-purple-900 border-purple-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`years-${index}`}>Years Attended</Label>
              <Input
                id={`years-${index}`}
                name="years"
                value={edu.years}
                onChange={(e) => onChange(index, e)}
                className="bg-purple-900 border-purple-700 text-white"
              />
            </div>
            <Button
              variant="outline"
              className="mt-2 text-purple-400 border-purple-700 hover:bg-purple-900"
              onClick={() => onRemove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={onAdd}>Add Education</Button>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
