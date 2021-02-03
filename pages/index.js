import Head from 'next/head'
import Axios from 'axios';

import {Header, Projects, Contact} from '../src/components';

export default function Home({projects}) {
  return (
  <>
    <Head><title>HRW Portfolio</title>
    </Head>
    <Header /> 
    <Projects projects={projects} />
    <Contact />
  </>
  );
}

Home.getInitialProps = async () => {
  const config = {
    headers: {
        "Accept": "application/vnd.github.v4.idl",
        "Authorization": `token ${process.env.GITHUB_TOKEN}`
    }
  };
  const querys ={
      query: `
          query{
              xx1: repository(owner: "heru-nan", name: "full-stack-app") {
              openGraphImageUrl,
              description,
              name,
              createdAt,
              isArchived,
              url
              },
              xx2: repository(owner: "heru-nan", name: "portfolio") {
                openGraphImageUrl,
                description,
                name,
                createdAt,
                isArchived,
                url
                },
          }
        
  `
  }
  
  try{
    const res = await Axios.post('https://api.github.com/graphql',querys, config);

    const objRes = res.data.data;

    return {projects: Object.values(objRes)}
  } catch(e){
    console.log(e);
    return {projects: []}
  }

}
