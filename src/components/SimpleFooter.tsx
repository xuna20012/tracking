import Link from 'next/link';

export default function SimpleFooter() {
  // Couleurs de la marque
  const brandBlue = '#254e9d';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="font-bold text-lg" style={{ color: brandBlue }}>
              OhPieces
            </div>
            <span className="ml-1 text-gray-600">Logistique</span>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Accueil
            </Link>
            <Link href="/track" className="text-sm text-gray-600 hover:text-gray-900">
              Suivre un colis
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Conditions générales
            </Link>
          </div>
          
          <p className="text-xs text-gray-500">
            © {currentYear} Oh Pieces Logistique
          </p>
        </div>
      </div>
    </footer>
  );
} 