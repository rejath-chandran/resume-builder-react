import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

const SkillsAndProjectsForm = ({ skills, projects, onSkillsChange, onProjectAdd, onProjectRemove, onProjectChange }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Skills & Projects</CardTitle>
        <CardDescription className="text-gray-400">List your key skills and any relevant projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Textarea
            id="skills"
            name="skills"
            value={skills}
            onChange={onSkillsChange}
            className="bg-purple-900 border-purple-700 text-white"
          />
        </div>
        <Separator className="bg-purple-800" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Projects</h3>
          {projects.map((proj, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md border-purple-800">
              <div className="space-y-2">
                <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                <Input
                  id={`project-name-${index}`}
                  name="name"
                  value={proj.name}
                  onChange={(e) => onProjectChange(index, e)}
                  className="bg-purple-900 border-purple-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-description-${index}`}>Description</Label>
                <Textarea
                  id={`project-description-${index}`}
                  name="description"
                  value={proj.description}
                  onChange={(e) => onProjectChange(index, e)}
                  className="bg-purple-900 border-purple-700 text-white"
                />
              </div>
              <Button
                variant="outline"
                className="mt-2 text-purple-400 border-purple-700 hover:bg-purple-900"
                onClick={() => onProjectRemove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={onProjectAdd}>Add Project</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsAndProjectsForm;
