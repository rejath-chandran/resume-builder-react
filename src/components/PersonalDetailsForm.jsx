import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const PersonalDetailsForm = ({ personal, onChange }) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Personal Details</CardTitle>
        <CardDescription className="text-gray-400">Start by telling us about yourself.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { id: "name", label: "Full Name" },
          { id: "title", label: "Professional Title" },
          { id: "email", label: "Email" },
          { id: "phone", label: "Phone Number" },
          { id: "linkedin", label: "LinkedIn URL" }
        ].map(({ id, label }) => (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
              id={id}
              name={id}
              value={personal[id]}
              onChange={handleChange}
              className="bg-purple-900 border-purple-700 text-white"
            />
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={personal.summary}
            onChange={handleChange}
            className="bg-purple-900 border-purple-700 text-white"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsForm;
