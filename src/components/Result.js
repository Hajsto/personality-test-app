// components/Result.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Result = ({ result, onRestart }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Výsledek testu</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{result}</p>
        <Button onClick={onRestart}>Začít znovu</Button>
      </CardContent>
    </Card>
  );
};

export default Result;
