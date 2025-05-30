'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  HomeIcon, 
  CubeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  CogIcon, 
  BellIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const SidebarItem = ({ href, icon, text, active }: SidebarItemProps) => (
  <Link 
    href={href}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'text-white' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
    style={active ? { backgroundColor: '#3a64b3' } : {}}
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="font-medium">{text}</span>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user && (session.user as any).role === 'admin';

  return (
    <div className="w-64 fixed top-0 bottom-0 left-0 bg-white border-r border-gray-200 flex flex-col" style={{ height: 'calc(100vh - 49px)', top: '49px', zIndex: 30 }}>

      <div className="h-9"></div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <SidebarItem 
          href="/admin" 
          icon={<HomeIcon />} 
          text="Tableau de bord" 
          active={pathname === '/admin'} 
        />
        
        <SidebarItem 
          href="/admin/colis" 
          icon={<CubeIcon />} 
          text="Gestion des colis" 
          active={pathname === '/admin/colis'} 
        />
        
        <SidebarItem 
          href="/admin/statistiques" 
          icon={<ChartBarIcon />} 
          text="Statistiques" 
          active={pathname === '/admin/statistiques'} 
        />
        
        <SidebarItem 
          href="/admin/consultations" 
          icon={<EyeIcon />} 
          text="Consultations" 
          active={pathname === '/admin/consultations'} 
        />
        
        {isAdmin && (
          <SidebarItem 
            href="/admin/users" 
            icon={<UsersIcon />} 
            text="Utilisateurs" 
            active={pathname.startsWith('/admin/users')} 
          />
        )}
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <SidebarItem 
            href="/admin/notifications" 
            icon={<BellIcon />} 
            text="Notifications" 
            active={pathname === '/admin/notifications'} 
          />
          
          <SidebarItem 
            href="/admin/parametres" 
            icon={<CogIcon />} 
            text="Paramètres" 
            active={pathname === '/admin/parametres'} 
          />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#254e9d' }}>
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-700">{session?.user?.name || 'Utilisateur'}</p>
            <p className="text-gray-500 text-xs">{(session?.user as any)?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 