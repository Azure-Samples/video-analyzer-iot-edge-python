import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = props => {
    useEffect(() => {
        if(props.videoName !== '')
        {
            const avaPlayer = document.getElementById("avaPlayer");
            avaPlayer.innerHTML = '';

            avaPlayer.configure({
              token: props.token,
              clientApiEndpointUrl: props.clientApi,
              videoName: props.videoName,
              locale: 'en'
            });

            avaPlayer.load();
        }
        
    }, [props.videoName, props.token, props.clientApi]);

    return (
        <div>
            {
                (props.show) ?
                    <div className="containerPlayback" id="containerPlayback">
                        <ava-player id="avaPlayer"></ava-player>
                    </div>
                :
                    null
            }
        </div>
    );
};

VideoPlayer.propTypes = {
    token: PropTypes.string.isRequired,
    clientApi: PropTypes.string.isRequired,
    videoName: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};

export default VideoPlayer;