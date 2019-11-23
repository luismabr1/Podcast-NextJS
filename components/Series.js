import {Link} from '../routes';
import slug from '../helper/slug';

const Series = (props) => {
    const series = props.series;
    const channel = props.channel;
    return ( 
        <div>

        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }}></div>

            <h1>{ channel.title }</h1>

            { series.length > 0 &&
                <div>
                    
                    <div className="channels">
                    { series.map((serie) => (
                        <Link route="channel"
                        params={{
                          slug: slug(channel.title),
                          id: channel.id
                        }}
                        key={channel.id}
                        >
                        <a className="channel">
                            <img src={ serie.urls.logo_image.original } alt=""/>
                            <h2>{ serie.title }</h2>
                        </a>
                        </Link>
                    ))}
                </div>
                </div>
            }

        <style jsx>{`
                    .banner {
                        width: 100%;
                        padding-bottom: 25%;
                        background-position: 50% 50%;
                        background-size: cover;
                        background-color: #aaa;
                      }
              
                      .channels {
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                      }
                      a.channel {
                        display: block;
                        margin-bottom: 0.5em;
                        color: #333;
                        text-decoration: none;
                      }
                      .channel img {
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                        width: 100%;
                      }
                      h1 {
                        font-weight: 600;
                        padding: 15px;
                      }
                      h2 {
                        padding: 5px;
                        font-size: 0.9em;
                        font-weight: 600;
                        margin: 0;
                        text-align: center;
                      }
        `}</style>
        </div>

        
    
     );
}
 
export default Series;