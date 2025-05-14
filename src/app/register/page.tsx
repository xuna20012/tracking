'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Inscriptions fermées
        </h1>
        
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">
            Les inscriptions sont actuellement fermées. Veuillez contacter l'administrateur pour obtenir un compte.
          </span>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/login" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Retour à la page de connexion
          </Link>
        </div>
      </div>
    </div>
  );
} 