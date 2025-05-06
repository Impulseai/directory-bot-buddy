
import React from 'react';
import Layout from '../components/Layout';
import ChatView from '../views/ChatView';
import AdminView from '../views/AdminView';
import SettingsView from '../views/SettingsView';
import { useStore } from '../store';

const Index = () => {
  const { currentView } = useStore();

  return (
    <Layout>
      {currentView === 'chat' && <ChatView />}
      {currentView === 'admin' && <AdminView />}
      {currentView === 'settings' && <SettingsView />}
    </Layout>
  );
};

export default Index;
