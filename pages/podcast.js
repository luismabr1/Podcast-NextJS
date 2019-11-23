import 'isomorphic-unfetch';
import Layout from '../components/Layout';
import PodcastAudio from '../components/PodcastAudio';

const Podcats = (props) => {
    const {clip} = props
    return (
        <Layout>
            <PodcastAudio clip={clip}/>
     
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
        </Layout>

        


    )
}

Podcats.getInitialProps = async ({query}) => {
    let idAudio = query.id;

    let reqClip = await fetch(`https://api.audioboom.com/audio_clips/${idAudio}.mp3`);
    let dataClip = await reqClip.json(); 
    let clip = dataClip.body.audio_clip

    return {clip}
}

export default Podcats;
