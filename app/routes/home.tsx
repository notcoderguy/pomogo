import { useEffect, useState } from "react";
import type { MetaArgs } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GenericLayout from "@/layout/generic";

export function meta(_args: MetaArgs) {
  return [
    { title: "Pomogo Timer - NotCoderGuy" },
    { name: "description", content: "Track your productivity with Pomogo timer" },
  ];
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [history, setHistory] = useState<Array<{topic: string, startTime: string, endTime: string, duration: number}>>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pomogo-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pomogo-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && startTime) {
      // session end
      const endTime = new Date();
      const session = {
        topic,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      };
      setHistory(prev => [...prev, session]);
      setIsRunning(false);
      setTimeLeft(25 * 60);
      setStartTime(null);
      setTopic(''); // clear topic after session
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, topic, startTime]);

  const startTimer = () => {
    if (!isRunning && topic.trim()) {
      setStartTime(new Date());
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'pomogo-history.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <GenericLayout>
      <div className="flex flex-col items-center space-y-4 p-4">
        <h1 className="text-3xl font-bold">Pomogo Timer</h1>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
          className="w-64"
        />
        <div className="text-6xl font-mono">{formatTime(timeLeft)}</div>
        <div className="space-x-2">
          <Button onClick={startTimer} disabled={isRunning || !topic.trim()}>Start</Button>
          <Button onClick={pauseTimer} disabled={!isRunning}>Pause</Button>
          <Button onClick={stopTimer}>Stop</Button>
        </div>
        <Button onClick={downloadHistory}>Download History</Button>
      </div>
    </GenericLayout>
  );
}
