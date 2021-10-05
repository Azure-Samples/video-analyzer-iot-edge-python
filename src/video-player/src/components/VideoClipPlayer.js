import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const VideoClipPlayer = props => {
    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());
    const [clips, onClipsChange] = useState([]);

    useEffect(() => {
        onClipsChange([]);
        const avaPlayer = document.getElementById("avaClipPlayer");
        
        if(props.videoName !== '')
        {
           async function loadPlayer() {
                avaPlayer.innerHTML = '';

                avaPlayer.configure({
                token: props.token,
                clientApiEndpointUrl: props.clientApi,
                videoName: props.videoName,
                locale: 'en'
                });

                await avaPlayer.load();
            }

            loadPlayer();
        }

        avaPlayer.pause();
        
    }, [props.videoName, props.token, props.clientApi]);

    const addDate = () => {
        const newDates = [...clips];
        newDates.push({start: selectedStartDate, end: selectedEndDate});
        onClipsChange(newDates);
    };

    const clipDateSelected = (e) => {
        const value = e.target.value;
        
        if(value !== "")
        {
            let selectedClip = clips[value];
            const avaPlayer = document.getElementById("avaClipPlayer");
            const startUTCDate = new Date(Date.UTC(selectedClip.start.getFullYear(), selectedClip.start.getMonth(), selectedClip.start.getDate(), selectedClip.start.getHours(), selectedClip.start.getMinutes(), selectedClip.start.getSeconds()));
            const endUTCDate = new Date(Date.UTC(selectedClip.end.getFullYear(), selectedClip.end.getMonth(), selectedClip.end.getDate(), selectedClip.end.getHours(), selectedClip.end.getMinutes(), selectedClip.end.getSeconds()));
            avaPlayer.load({ startTime: startUTCDate, endTime: endUTCDate });
        }
    };

    return (
        <div>
            {
                (props.show) ?
                    <Fragment>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker variant="inline" ampm={false} label="Start time:" value={selectedStartDate} onChange={handleStartDateChange} 
                            format="yyyy/MM/dd HH:mm:ss"/>
                        </MuiPickersUtilsProvider>&nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker variant="inline" ampm={false} label="End time:" value={selectedEndDate} onChange={handleEndDateChange} 
                            format="yyyy/MM/dd HH:mm:ss"/>
                        </MuiPickersUtilsProvider>&nbsp;
                    
                        <Button onClick={() => addDate()}>Add</Button><br/>
                        <select className="btn btnPrimary" name="clipDates" id="clipDate" onChange={(e) => clipDateSelected(e)}>
                            <option key={''} value={''}>Select a clip</option>
                            {
                                clips.map((v,i) => 
                                    <option key={i} value={i}>{v.start.toLocaleString() + ":" + v.end.toLocaleString()}</option>
                                )
                            }
                        </select> 
                        <div className="containerPlayback" id="containerPlayback">
                            <ava-player id="avaClipPlayer"></ava-player>
                        </div>
                    </Fragment>
                :
                    null
            }
        </div>
    );
};

VideoClipPlayer.propTypes = {
    token: PropTypes.string.isRequired,
    clientApi: PropTypes.string.isRequired,
    videoName: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};

export default VideoClipPlayer;