import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ApiHelper from '../helpers/ApiHelper';
import LoadingOverlay from 'react-loading-overlay'
import { Button } from 'react-bootstrap';

const VideoList = props => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiHelper = new ApiHelper(props.token);

    const getVideos = async () => {
        let getUrl = props.clientApi + "/videos?api-version=2021-05-01-preview";
        let videosResponse = []
        try {
            setLoading(true);
            const result = await apiHelper.callApi(getUrl);
            const resultResponse = await result.json();
            videosResponse = resultResponse.value;
            
        } catch (e) {
            console.log(e);
        }
        finally {
            setVideos(videosResponse);
            setLoading(false);
        }
    }

    return (
        <LoadingOverlay active={loading} spinner text='Loading content...'
            styles={{
                wrapper: {
                    width: '100%',
                    height: '100%',
                    overflow: loading ? 'hidden' : 'scroll'
                }
            }}>
            <div className="videolist">
                <label>Video name:</label>
                <select className="btn btnPrimary" name="videoName" id="videoName" onChange={(e) => props.onVideoSelected(e)}>
                    <option key={''} value={''}>Select a video</option>
                    {
                        videos.map(v => 
                            <option key={v.name} value={v.name}>{v.name}</option>
                        )
                    }
                </select> 
                <Button variant="primary" onClick={() => getVideos()}>Get Videos</Button>
            </div>
        </LoadingOverlay>
    );
};

VideoList.propTypes = {
    token: PropTypes.string.isRequired,
    clientApi: PropTypes.string.isRequired,
    onVideoSelected: PropTypes.func.isRequired
};

export default VideoList;