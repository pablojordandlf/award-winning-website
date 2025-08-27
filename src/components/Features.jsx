import { useState, useRef } from "react";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-500 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ 
  src, 
  title, 
  description, 
  isDarkText = false, 
  alignRight = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative size-full overflow-hidden rounded-2xl shadow-xl group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={src}
          alt={title}
          className={`size-full object-cover object-center transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        {/* Overlay muy ligero solo para legibilidad */}
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
      </div>

      {/* Contenido */}
      <div className={`
        relative z-10 flex size-full flex-col justify-between p-4 sm:p-6 md:p-8
        ${alignRight ? "items-end" : "items-start"}
      `}>
        
        {/* Descripción en la parte superior - texto centrado */}
        <div className={`
          w-full transition-all duration-300 transform
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}
          ${alignRight ? 'flex justify-end' : ''}
        `}>
          {description && (
            <div className="backdrop-blur-sm bg-black/40 rounded-lg p-3 sm:p-4 max-w-full sm:max-w-xs md:max-w-sm text-center">
              <div className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-white drop-shadow-lg">
                {description}
              </div>
            </div>
          )}
        </div>

        {/* Título centrado - siempre blanco */}
        <div className="w-full flex justify-center items-center">
          <div className={`
            transition-all duration-300 transform
            ${isHovered ? 'translate-y-0 scale-105' : 'translate-y-1 scale-100'}
            text-center
          `}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-xl tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Efecto de brillo sutil en hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent
        transform translate-x-full transition-transform duration-1000 ease-out
        ${isHovered ? '-translate-x-full' : 'translate-x-full'}
      `} />
    </div>
  );
};

const Features = () => (
  <section className="bg-white pb-50">
    <div className="container mt-0 mx-auto px-3 md:px-10">
      <div className="grid gap-4 sm:gap-6 md:gap-8 auto-rows-fr py-12">
        
        {/* Diseño móvil: Una columna */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:hidden">
          {[1, 2, 3].map((index) => (
            <BentoTilt 
              key={index} 
              className="h-64 sm:h-80"
            >
              <BentoCard
                src={`/photos/image-feature-${index}.jpeg`}
                title={
                  index === 1 ? "PRE-BODA" :
                  index === 2 ? "CEREMONIA" : "CELEBRACIÓN"
                }
                description={
                  index === 1 ? (
                    <>
                      <div>Viernes 5 de septiembre 20:00h</div>
                      <div className="mt-1">
                        <a 
                          href="https://maps.app.goo.gl/zeo2EmKDxUFJCuZf7" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                        >
                          Bar Julepe, Valladolid
                        </a>
                      </div>
                    </>
                  ) : index === 2 ? (
                    <>
                      <div>Sábado 6 de septiembre 12:30h</div>
                      <div className="mt-1">
                        <a 
                          href="https://maps.app.goo.gl/ci9gNM29JMGn3FZP8" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                        >
                          Parroquia del Santísimo Salvador
                        </a>
                      </div>
                      <div className="mt-1">C/ Galera, 1, Valladolid</div>
                    </>
                  ) : (
                    <>
                      <div>
                        <a 
                          href="https://maps.app.goo.gl/EC1wezy76eqgLna89?g_st=ipc" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                        >
                          Finca Monte San Cristobal
                        </a>
                      </div>
                      <div className="mt-1">Hay buses de ida tras la misa, un bus de vuelta a las 22h y otros dos a las 00h</div>
                    </>
                  )
                }
                isDarkText={index !== 1}
                alignRight={index === 3}
              />
            </BentoTilt>
          ))}
        </div>

        {/* Diseño tablet y escritorio */}
        <div className="hidden md:grid md:grid-cols-12 md:grid-rows-2 gap-6 lg:gap-8 h-[80vh] lg:h-[85vh]">
          
          <BentoTilt className="md:col-span-6 lg:col-span-5 md:row-span-2">
            <BentoCard
              src="/photos/image-feature-1.jpeg"
              title="PRE-BODA"
              description={
                <>
                  <div>Viernes 5 de septiembre 20:00h</div>
                  <div className="mt-1">
                    <a 
                      href="https://maps.app.goo.gl/zeo2EmKDxUFJCuZf7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                    >
                      Bar Julepe, Valladolid
                    </a>
                  </div>
                </>
              }
              isDarkText={false}
            />
          </BentoTilt>

          <BentoTilt className="md:col-span-6 lg:col-span-7 md:row-span-1">
            <BentoCard
              src="/photos/image-feature-2.jpeg"
              title="CEREMONIA"
              description={
                <>
                  <div>Sábado 6 de septiembre 12:30h</div>
                  <div className="mt-1">
                    <a 
                      href="https://maps.app.goo.gl/ci9gNM29JMGn3FZP8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                    >
                      Parroquia del Santísimo Salvador
                    </a>
                  </div>
                  <div className="mt-1">C/ Galera, 1, Valladolid</div>
                </>
              }
              isDarkText={true}
            />
          </BentoTilt>

          <BentoTilt className="md:col-span-6 lg:col-span-7 md:row-span-1">
            <BentoCard
              src="/photos/image-feature-3.jpeg"
              title="CELEBRACIÓN"
              description={
                <>
                  <div>
                    <a 
                      href="https://maps.app.goo.gl/EC1wezy76eqgLna89?g_st=ipc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                    >
                      Finca Monte San Cristobal
                    </a>
                  </div>
                  <div className="mt-1">Hay buses de ida y vuelta</div>
                </>
              }
              isDarkText={false}
              alignRight={true}
            />
          </BentoTilt>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
