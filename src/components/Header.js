import React from 'react';

export default function Header(){
    return (
    <section className="header_component">
         <div>
             <h1>
             Hola, Soy Hernán,<br />
             Javascript Developer
             </h1>
             <p>
             Soy un Desarrollador Javascript centrado en front end con Tecnología React. Tengo pasión por la programación funcional,  Serverless Tecnologías tales como Next.js. Para mejorar mis habilidades me centro en el deep learning. Y la implementación de modelos basados en redes neuronales enfocadas a soluciones reales. 
             </p>
         </div>
         <CircleImg src="./heru.jpg" alt="image of presentation" />
    </section>)
}

const CircleImg = ({src, alt}) => (
    <div>
        <div><img src={src} alt={alt} /></div>
        <svg width="243" height="243" viewBox="0 0 243 243" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        <circle cx="121.5" cy="121.5" r="121.5" fill="#EDF7FA"/>
        </svg>
    </div>
)
