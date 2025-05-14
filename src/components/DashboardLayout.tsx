'use client';

import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-49px)]">
      {/* Sidebar fixe */}
      <div className="fixed inset-y-0 left-0 w-64 top-[49px] bg-white border-r border-gray-200 z-10">
        <Sidebar />
      </div>
      
      {/* Contenu principal avec marge à gauche pour éviter la sidebar */}
      <div className="flex-1 ml-64">
        {/* Zone de contenu scrollable */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 