'use client';

import {Card, CardDescription, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useEffect, useState} from 'react';
import {Icons} from '@/components/icons';
import {Button} from '@/components/ui/button';

interface SystemConfig {
  name: string;
  description: string;
  url: string;
}

async function loadConfig(): Promise<SystemConfig[]> {
  // Simulate loading from a file or external source
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockConfig: SystemConfig[] = [
        {name: 'System A', description: 'Description of System A', url: 'https://systema.example.com'},
        {name: 'System B', description: 'Description of System B', url: 'https://systemb.example.com'},
        {name: 'System C', description: 'Description of System C', url: 'https://systemc.example.com'},
        {name: 'System D', description: 'Description of System D', url: 'https://systemd.example.com'},
        {name: 'System E', description: 'Description of System E', url: 'https://systeme.example.com'},
        {name: 'System F', description: 'Description of System F', url: 'https://systemf.example.com'},
        {name: 'System G', description: 'Description of System G', url: 'https://systemg.example.com'},
        {name: 'System H', description: 'Description of System H', url: 'https://systemh.example.com'},
        {name: 'System I', description: 'Description of System I', url: 'https://systemi.example.com'},
        {name: 'System J', description: 'Description of System J', url: 'https://systemj.example.com'},
        {name: 'System K', description: 'Description of System K', url: 'https://systemk.example.com'},
        {name: 'System L', description: 'Description of System L', url: 'https://systeml.example.com'},
      ];
      resolve(mockConfig);
    }, 1500); // Simulate a 1.5 second loading time
  });
}

export default function Home() {
  const [config, setConfig] = useState<SystemConfig[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getConfig() {
      setIsLoading(true);
      const systemConfig = await loadConfig();
      setConfig(systemConfig);
      setIsLoading(false);
    }

    getConfig();
  }, []);

  const filteredSystems = config
    ? config.filter((system) => {
        const searchRegex = new RegExp(searchTerm, 'i');
        return searchRegex.test(system.name) || searchRegex.test(system.description);
      })
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">System Navigator</h1>

      <Input
        type="text"
        placeholder="Search systems..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Icons.loader className="mr-2 h-6 w-6 animate-spin" />
          Loading systems...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSystems.map((system, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{system.name}</CardTitle>
                <CardDescription>{system.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href={system.url} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-700">
                    Go to System
                    <Icons.externalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
