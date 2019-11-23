import {Link} from '../routes';
import {useState} from 'react';
import PodcastPlayer from '../components/PodcastPlayer';
import slug from '../helper/slug';

const Latest = (props) => {
  const [openPodcast, setPodcast] = useState(null)
    const audioClips = props.audioClips;

    const setOpenPodcast = (event, podcast) => {
      event.preventDefault()
      setPodcast(podcast)
  }
    const setClosePodcast = (event) => {
      event.preventDefault()
      setPodcast(null)
    }

    return ( 

        <div> 
            {openPodcast && <div className="modal"><PodcastPlayer clip={openPodcast} onClose={setClosePodcast}/></div>}
            <h2>Ultimos Podcasts</h2>
            { audioClips.map((clip) => (
                <Link 
                route="podcast" 
                params={{
                  slugChannel: slug(clip.channel.title),
                  idChannel: clip.channel.id,
                  slug: slug(clip.title),
                  id: clip.id
                }}
                key={clip.id}
                >
                <a className='podcast' 
                onClick={event=> setOpenPodcast(event, clip)}
                >
                    <h3>{ clip.title }</h3>
                    <div className='meta'>
                    { Math.ceil(clip.duration / 60) } minutes
                    </div>
                </a>
                </Link>
            ))}

            <style jsx>
                {`
                    .podcast {
                        display: block;
                        text-decoration: none;
                        color: #333;
                        padding: 15px;
                        border-bottom: 1px solid rgba(0,0,0,0.2);
                        cursor: pointer;
                      }
                      .podcast:hover {
                        color: #000;
                      }
                      .podcast h3 {
                        margin: 0;
                      }
                      .podcast .meta {
                        color: #666;
                        margin-top: 0.5em;
                        font-size: 0.8em;
                      }
                      .modal{
                         position: fixed;
                         to:0;
                         left:0;
                         right:0;
                         bottom:0;
                         z-index: 99999;
                      }
                `}
            </style>
        </div>
     );
}
 
export default Latest;