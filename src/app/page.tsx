'use client';

import {Card, CardDescription, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useEffect, useState} from 'react';
import {Icons} from '@/components/icons';
import {Button} from '@/components/ui/button';
import {useTheme} from 'next-themes';

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
        {name: 'SPA', description: 'Sistema de Publicaciones Administrativas, aquí están todas las acordadas', url: 'https://med.pjm.gob.ar'},
        {name: 'Meed Interna', description: 'acceso a la bandeja de entradas de la MeeD, para Jefe de Mesas de Entradas A', url: 'https://med.pjm.gob.ar'},
        {name: 'Meed Externa', description: 'Portal MeeD para presentar y revisar presentaciones', url: 'https://meed.pjm.gob,ar'},
        {name: 'BLSG', description: 'Certificado para Beneficio de Litigar sin Gasto', url: 'https://blsg.pjm.gob.ar'},
        {name: 'Skipper', description: 'Repositorios de archivos y videos para tener link y/o QR para referenciar, es costoso (queda guardado para siempre)', url: 'https://skipper-uploader.pjm.gob.ar/'},
        {name: 'Contenidos', description: 'Herramienta para compartir archivos (cualquier tipo) es temporario y económico (gratis)', url: 'https://skipper-uploader.pjm.gob.ar/'},
        {name: 'Firmador Digital', description: 'Firmador digital Oficial del Poder Judicial', url: 'https://signer-fe.pjm.gob.ar/firmar'},
        {name: 'IoL IURIX', description: 'Portal IOL de Iurix on Line', url: 'https://iol.jus.mendoza.gov.ar/iol-ui/p/inicio'},
        {name: 'Led Penal', description: 'Expediente Penales LeD', url: 'https://ledp.pjm.gob.ar'},
        {name: 'Ticket', description: 'alta de ticke para pedir ayda de los sitemas', url: 'https://pjm-devops2.freshdesk.com/support/tickets/new'},
        {name: 'Zimbra', description: 'Correo Oficial del Poder Judicial ZIMBRA', url: 'https://mail.jus.mendoza.gov.ar/'},
        {name: 'Portal', description: 'Portal ofidcial del Poder Judicial de Mendoza www.jusmendoza.gob.ar', url: 'https://jusmendoza.gob.ar/'},
        {name: 'Landing Page', description: 'Accesos directos más usados del Portal', url: 'http://lp.pjm.gob.ar/'},
        {name: 'SINEJ', description: 'Notifiacaciones Electrónicas', url: 'https://notificaciones.jus.mendoza.gov.ar'},
        {name: 'listas Diarias', description: 'Listas Diarias y proveidos', url: 'https://www2.jus.mendoza.gov.ar/listas/proveidos/listas.php'},
      ];
      resolve(mockConfig);
    }, 1500); // Simulate a 1.5 second loading time
  });
}

export default function Home() {
  const [config, setConfig] = useState<SystemConfig[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {setTheme, theme} = useTheme();

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
      <h1 className="text-2xl font-bold mb-4">Menú de Sistemas</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="buscar aplicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
          {theme === 'light' ? <Icons.moon className="ml-2 h-4 w-4"/> : <Icons.sun className="ml-2 h-4 w-4"/>}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Icons.loader className="mr-2 h-6 w-6 animate-spin" />
          Loading systems...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSystems.map((system, index) => (
             <Card
             key={index}
             className="transition-all duration-300 ease-in-out cursor-pointer h-12 overflow-hidden hover:h-24 hover:shadow-md"
             onClick={() => window.open(system.url, '_blank')}
           >
             <CardHeader className="p-2">
               <CardTitle className="text-sm font-semibold">{system.name}</CardTitle>
               <CardDescription className="text-xs line-clamp-2">{system.description}</CardDescription>
             </CardHeader>
             <CardContent className="p-2">
               <a
                 href={system.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-teal-500 hover:text-teal-700 text-xs"
               >
                 {system.url}
                 <Icons.externalLink className="ml-1 h-3 w-3 inline-block" />
               </a>
             </CardContent>
           </Card>
          ))}
        </div>
      )}
    </div>
  );
}
