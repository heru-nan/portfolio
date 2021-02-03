import React from 'react';
export default function Projects({projects}){
    if(!projects) projects = [];
    return (
        <section className="projects_component">
            <h3>Featured works</h3>
            <ul>
                <li><ProjectCard data={projects[0]} /></li>
                <li><ProjectCard data={projects[1]} /></li>
                <li><ProjectCard data={projects[2]} /></li>
            </ul>
        </section>
    );
}

const ProjectCard = ({data}) => {
    
    const formatDate = date => {
        let dateWithoutTime = date.split("T")[0];
        let splitDate = dateWithoutTime.split("-");
        return `${splitDate[2]} - ${splitDate[1]} - ${splitDate[0]}`;
    }

    const formatName = name => {
        let splitName = name.split("-");
        return splitName.map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
    }

    if(!data){
        return (<>
            <div className="projectCard_component template">
                <img src={"./shiba.png"} width="246" height="180" />
                <div>
                    <div>
                        <h2>Awesome Project</h2>
                    </div>
                    <div>
                        <span>Fecha: Future</span>
                        <span>  |  </span>
                        <span>Estado: Cerrado</span>
                    </div>
                <p></p>
                </div>
                
            </div>
            <div className="gray_line"></div>
            </>
        )
    }
    let {url, name, description, createdAt, isArchived: state, openGraphImageUrl: src} = data;
    
    

    return (<>
        <div className="projectCard_component">
            <img src={src?src:shiba} width="246" height="180" />
            <div>
                <div>
                    <h2>{formatName(name)}</h2>
                    <div>
                    {name=="full-stack-app" && <a target="_blank" rel="noopener noreferrer" href="https://heru-demo.herokuapp.com/">Demo</a>}
                    <a href={url}>Github</a>
                    </div>
                </div>
                <div>
                    <span>Fecha: {formatDate(createdAt)}</span>
                    <span>  |  </span>
                    <span>Estado: {state?"Cerrado":"Abierto"}</span>
                </div>
            <p>{description}</p>
            </div>
            
        </div>
        <div className="gray_line"></div>
        </>
    );
}



