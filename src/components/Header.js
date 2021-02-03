import React from 'react';

export default function Header(){
    return (
    <section className="header_component">
         <div>
             <h1>
             Hola, Soy Hernán,<br />
             Software Developer
             </h1>
             <p>
             Soy un Desarrollador de Software centrado en las Tecnologías Web, tales como los framework ReactJS y ExpressJS. Siento pasión por la programación funcional, y las nuevas Tecnologías. Por lo mismo en mi tiempo libre me aboco al Deep Learning, los modelos, y su implementación en un ambiente web. 
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
