import 'isomorphic-unfetch';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error';

const Index = (props) => {

    const {channels, statusCode} = props;
    if(statusCode !== 200){
        return <Error statusCode={statusCode} />
    }
    return ( 
        <Layout title="Podcats">
  
            <ChannelGrid channels={channels} />

        </Layout>
    );

}

Index.getInitialProps = async ({ res }) => {
    try{
        let req = await fetch('https://api.audioboom.com/channels/recommended');
        let {body: channels} = await req.json();
    
        return { channels, statusCode: 200 }

    } catch(e){
        res.statusCode = 503
        return { channel: null, statusCode: 503 }
    }
}


export default Index;