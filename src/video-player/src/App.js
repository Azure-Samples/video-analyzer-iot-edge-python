import { useState } from 'react';
import './App.css';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import ZoneDrawer from './components/ZoneDrawer';
import VideoClipPlayer from './components/VideoClipPlayer';
import { Tab, Row, Nav, Col } from 'react-bootstrap';

function App() {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const CLIENT_API_ENDPOINT_URL = process.env.REACT_APP_CLIENT_API_ENDOINT_URL;
  const [videoName, setVideoName] = useState('')

  const onVideoSelectedHandler = (evt) => {
    const videoName = evt.target.value.toString();
    setVideoName(videoName);
  }

  return (
    <div className="page_content">
      <h1>Video Analyzer Player Widget Demo</h1>
        <div className="containerBlock">
          <VideoList token={TOKEN} clientApi={CLIENT_API_ENDPOINT_URL} onVideoSelected={onVideoSelectedHandler}/>
        </div>
        {
          videoName !== '' ? 
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Video Player</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Zone Drawer</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Video Clips</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <VideoPlayer token={TOKEN} clientApi={CLIENT_API_ENDPOINT_URL} videoName={videoName} show={videoName !== ''}/> 
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <ZoneDrawer token={TOKEN} clientApi={CLIENT_API_ENDPOINT_URL} videoName={videoName} showOpen={videoName !== ''}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <VideoClipPlayer token={TOKEN} clientApi={CLIENT_API_ENDPOINT_URL} videoName={videoName} show={videoName !== ''}/> 
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          :
          null
        }
    </div>
  );
}

export default App;
