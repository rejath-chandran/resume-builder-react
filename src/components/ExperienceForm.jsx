import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const ExperienceForm = ({ experience, onAdd, onRemove, onChange }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Work Experience</CardTitle>
        <CardDescription className="text-gray-400">Tell us about your professional experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-md border-purple-800">
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                name="company"
                value={exp.company}
                onChange={(e) => onChange(index, e)}
                className="bg-purple-900 border-purple-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                name="position"
                value={exp.position}
                onChange={(e) => onChange(index, e)}
                className="bg-purple-900 border-purple-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`duration-${index}`}>Duration</Label>
              <Input
                id={`duration-${index}`}
                name="duration"
                value={exp.duration}
                onChange={(e) => onChange(index, e)}
                className="bg-purple-900 border-purple-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                name="description"
                value={exp.description}
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
        <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={onAdd}>Add Experience</Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
