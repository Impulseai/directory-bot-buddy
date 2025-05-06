
import React, { useEffect } from 'react';
import { useStore } from '../store';
import { Button } from '@/components/ui/button';
import { MessageSquare, ListPlus, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentView, setCurrentView, botConfig, auth } = useStore();

  // Redirecionar para o login se tentar acessar áreas protegidas sem estar autenticado
  useEffect(() => {
    if (currentView === 'admin' && !auth.isLoggedIn) {
      setCurrentView('login');
    }
  }, [currentView, auth.isLoggedIn, setCurrentView]);

  const handleNavigation = (view: 'chat' | 'admin' | 'login') => {
    if (view === 'admin' && !auth.isLoggedIn) {
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
  };

  const handleDownload = () => {
    // Create a link to download the project
    const link = document.createElement('a');
    link.href = 'https://github.com/yourusername/directory-bot-buddy/archive/refs/heads/main.zip';
    link.download = 'directory-bot-buddy.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Alternative approach - create a JSZip archive of the project data
    // This would only download the data, not the code
    /*
    import JSZip from 'jszip';
    
    const zip = new JSZip();
    const { businesses, botConfig } = useStore.getState();
    
    // Add data to ZIP
    zip.file("businesses.json", JSON.stringify(businesses, null, 2));
    zip.file("botConfig.json", JSON.stringify(botConfig, null, 2));
    
    // Generate the ZIP file
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Create a link to download the ZIP
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = "directory-bot-data.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    */
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header 
        className="border-b border-gray-200 py-4 px-6 flex items-center justify-between"
        style={{ backgroundColor: botConfig.backgroundColor }}
      >
        <div className="flex items-center gap-3">
          <img 
            src={botConfig.avatarUrl} 
            alt="Bot Avatar" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 
            className="text-xl font-bold"
            style={{ color: botConfig.primaryColor }}
          >
            {botConfig.name} - Diretório de Comércios e Serviços
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download size={16} />
          Baixar Projeto
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-lg",
              currentView === 'chat' && "bg-primary/10 text-primary"
            )}
            onClick={() => handleNavigation('chat')}
          >
            <MessageSquare size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-lg",
              (currentView === 'admin' || currentView === 'login') && "bg-primary/10 text-primary"
            )}
            onClick={() => handleNavigation('admin')}
          >
            <ListPlus size={24} />
          </Button>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
