
import React from 'react';
import Layout from '../components/Layout';
import ChatView from '../views/ChatView';
import AdminView from '../views/AdminView';
import LoginView from '../views/LoginView';
import { useStore } from '../store';

const Index = () => {
  const { currentView, auth } = useStore();

  return (
    <Layout>
      {currentView === 'chat' && <ChatView />}
      {currentView === 'admin' && auth.isLoggedIn && <AdminView />}
      {currentView === 'login' && <LoginView />}
    </Layout>
  );
};

export default Index;
