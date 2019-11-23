import Layout from '../components/Layout';
import Latest from '../components/Latest';
import Series from '../components/Series';
import Error from './_error';


const Channel = (props) => {
    
    const {channel, audioClips, series, statusCode} = props

    if(statusCode !== 200){
        return <Error statusCode={statusCode} />
    }
    return (

        <Layout title={channel.title}>
                <h2>Series</h2>
                <Series series={series} channel={channel}/>

                <Latest audioClips={audioClips} />
         </Layout> 
    );
}

Channel.getInitialProps = async ({query, res}) => {
    let idChannel = query.id;

    try{
        let [reqChannel, reqAudios, reqSeries] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${idChannel}`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
            fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
        ])
        if(reqChannel.status >= 400){
            res.statusCode=reqChannel.status
            return {channel: null, audioClip: null, series: null, statusCode: reqChannel.status}
        }
        let dataChannel = await reqChannel.json();
        let channel = dataChannel.body.channel
    
        let dataAudios = await reqAudios.json();
        let audioClips = dataAudios.body.audio_clips
    
        let dataSeries = await reqSeries.json();
        let series = dataSeries.body.channels;
    
    
        return { channel, audioClips, series, statusCode: 200 }
    }catch(e){
        return {channel: null, audioClip: null, series: null, statusCode: 503}
    }
}
 
export default Channel;



