import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDecodedToken from '../hooks/UseDecodedToken';

const Navbar = () => {
  const decodedToken = useDecodedToken();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navigationLinks = [
    { name: 'Clientes', path: '/' },
    { name: 'Citas', path: '/citas' },
    { name: 'Historiales', path: '/historiales' },
    ...(decodedToken && (decodedToken.role === 'Administrador' || decodedToken.role === 'Recepcionista')
      ? [{ name: 'Reportes', path: '/reportes' }]
      : []),
    ...(decodedToken && decodedToken.role === 'Administrador'
      ? [{ name: 'Dashboard', path: '/dashboard' }]
      : []),
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y enlaces principales */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Aquí puedes agregar tu logo */}
              <span className="text-blue-600 text-lg font-bold">VetCare</span>
            </div>
            
            {/* Enlaces de navegación - Escritorio */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botón de usuario y cerrar sesión */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {decodedToken?.role || 'Usuario'}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono de menú */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icono de cerrar */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:border-blue-600 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:border-blue-600 transition-colors duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;