'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav style={{ backgroundColor: '#254e9d', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40 }} className="text-white shadow-md w-full">
      <div className="w-full px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center">
          <div className="bg-white rounded-lg p-1 flex items-center justify-center mr-2">
            <Image 
              src="/images/ohpieces.png" 
              alt="Oh Pieces Logo" 
              width={120} 
              height={40} 
            />
          </div>
          <span style={{ color: 'white' }}>Logistique</span>
        </Link>
        
        <div className="hidden md:flex space-x-4">
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity"
            style={{ color: 'white' }}
          >
            Accueil
          </Link>
          <Link 
            href="/track" 
            className="hover:opacity-80 transition-opacity"
            style={{ color: 'white' }}
          >
            Suivre un colis
          </Link>
          
          {/* Menu pour utilisateur connecté */}
          {status === 'authenticated' && (
            <>
              <Link 
                href="/admin" 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'white' }}
              >
                Administration
              </Link>
              {session?.user && (session.user as any).role === 'admin' && (
                <Link 
                  href="/admin/users" 
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'white' }}
                >
                  Utilisateurs
                </Link>
              )}
              <button 
                onClick={handleSignOut} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'white' }}
              >
                Déconnexion
              </button>
            </>
          )}
          
          {/* Menu pour utilisateur non connecté */}
          {status === 'unauthenticated' && (
            <>
              <Link 
                href="/login" 
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'white' }}
              >
                Connexion
              </Link>
            </>
          )}
        </div>
        
        {/* Menu hamburger pour mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
          {isMenuOpen && (
            <div style={{ backgroundColor: '#254e9d' }} className="absolute top-16 right-0 left-0 shadow-md z-50">
              <div className="flex flex-col p-4 space-y-3">
                <Link 
                  href="/" 
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'white' }}
                  onClick={toggleMenu}
                >
                  Accueil
                </Link>
                <Link 
                  href="/track" 
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'white' }}
                  onClick={toggleMenu}
                >
                  Suivre un colis
                </Link>
                
                {/* Menu pour utilisateur connecté */}
                {status === 'authenticated' && (
                  <>
                    <Link 
                      href="/admin" 
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: 'white' }}
                      onClick={toggleMenu}
                    >
                      Administration
                    </Link>
                    {session?.user && (session.user as any).role === 'admin' && (
                      <Link 
                        href="/admin/users" 
                        className="hover:opacity-80 transition-opacity"
                        style={{ color: 'white' }}
                        onClick={toggleMenu}
                      >
                        Utilisateurs
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut} 
                      className="hover:opacity-80 transition-opacity text-left"
                      style={{ color: 'white' }}
                    >
                      Déconnexion
                    </button>
                  </>
                )}
                
                {/* Menu pour utilisateur non connecté */}
                {status === 'unauthenticated' && (
                  <>
                    <Link 
                      href="/login" 
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: 'white' }}
                      onClick={toggleMenu}
                    >
                      Connexion
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 