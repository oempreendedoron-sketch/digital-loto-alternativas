
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg my-12 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center max-w-[220px]">
          <div className="flex items-center">
            <span className="text-6xl font-bold text-green-400 mr-3">1.</span>
            <div className="relative h-14 w-14">
              <svg className="h-14 w-14 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div className="absolute -top-1 -right-1 bg-green-400 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">
                +
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-600">Gere e valide sua aposta</p>
        </div>

        <div className="w-full md:w-px h-px md:h-24 bg-gray-200"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center max-w-[220px]">
          <div className="flex items-center">
            <span className="text-6xl font-bold text-green-400 mr-3">2.</span>
            <svg className="h-14 w-14 text-gray-700" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 21h8v-8h-8v8zm2-6h4v4h-4v-4z"/>
            </svg>
          </div>
          <p className="mt-3 text-gray-600">Realize o pagamento no Pix</p>
        </div>

        <div className="w-full md:w-px h-px md:h-24 bg-gray-200"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center max-w-[220px]">
          <div className="flex items-center">
            <span className="text-6xl font-bold text-green-400 mr-3">3.</span>
            <svg className="h-14 w-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 7.02944 16.9706 3 12 3C8.94052 3 6.24833 4.4394 4.5 6.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12C3 16.9706 7.02944 21 12 21C14.7176 21 17.1362 19.8211 18.8101 18" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 6.5H4.5V4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 18H19V20.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="5" fill="#A7F3D0" fillOpacity="0.5"/>
                <path d="M10 12L11.5 13.5L14 11" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="mt-3 text-gray-600">O resto, fazemos por você!</p>
        </div>

      </div>
    </div>
  );
};
export default HowItWorks;
