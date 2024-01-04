import React, {useState} from "react";
import { Grid, 
            Box, 
            Tabs, 
            Tab,
            Paper,
            Card, 
            CardActions,
            CardContent,
            CardMedia,  
            Button,
            Typography ,
            Container
} from '@mui/material';
import { Link } from 'react-router-dom';

import './style.css'
const Home = () => {
  const [activeButtons, setActiveButtons] = useState([]);
  const buttons = [
    { id: 1, label: 'Tiết kiệm Năng lượng', content: 'Tối ưu hóa việc sử dụng năng lượng, giúp giảm thiểu lãng phí và hỗ trợ trong việc thực hiện các biện pháp tiết kiệm năng lượng. ' },
    { id: 2, label: 'Kiểm soát và quản lý từ xa', content: 'Hệ thống giám sát điện giúp quản lý và kiểm soát các thiết bị từ xa, điều này có thể quan trọng trong việc giảm thiểu thời gian gián đoạn và tăng cường sự linh hoạt trong việc quản lý hệ thống. ' },
    { id: 3, label: 'Giảm thiểu rủi ro và sự cố', content: 'Hệ thống giám sát có thể giúp phát hiện sớm các vấn đề và nguy cơ, từ đó giảm thiểu rủi ro của sự cố, chập cháy và hỏa hoạn.' },
  ];

  const handleButtonClick = (buttonId) => {
    if (activeButtons.includes(buttonId)) {
      setActiveButtons(activeButtons.filter((id) => id !== buttonId));
    } else {
      setActiveButtons([...activeButtons, buttonId]);
    }
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const tabs = [
    { label: 'Chương 1', content: 'Nội dung Chương 1' },
    { label: 'Chương 2', content: 'Nội dung Chương 2' },
    { label: 'Chương 3', content: 'Nội dung Chương 3' },
    { label: 'Chương 4', content: 'Nội dung Chương 4' },
    { label: 'Chương 5', content: 'Nội dung Chương 5' },
  ];

  return (
    <>
    <br/>
      <h1 className="home-title">GIỚI THIẾT CHUNG VỀ ĐỀ TÀI</h1>
      <h1 className="home-title">Quản lý năng lượng điện tiêu thụ</h1>

      <br/>
      <br/>
      <h2 style={{textAlign:'center'}}>Lý do chọn đề tài</h2>
      <div className="App">
        <div className="buttons-container">
          {buttons.map((button) => (
            <div key={button.id} className="button-container">
              <button
                className={activeButtons.includes(button.id) ? 'active' : ''}
                onClick={() => handleButtonClick(button.id)}
              >
                {button.label}
              </button>
              <div className={`content ${activeButtons.includes(button.id) ? 'active' : ''}`}>
                {button.content}
              </div>
              <br/>
            </div>
          ))}
        </div>
      </div>


    <br/>
    <br/>

      <h2 style={{textAlign:'center'}}>Nội dung chính của đề tài</h2>

      <div className="App-title">
        <div className="title-topic" style={{ textAlign: 'center' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable auto tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        </div>
        <br/>
        {tabs.map((tab, index) => (
          <div key={index} role="tabpanel" hidden={activeTab !== index} className="tabpanel-container">
            {activeTab === index && (
              <div className="tabpanel-content">
                <p>{tab.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    <br/>
    <br/>

    <h2 style={{textAlign:'center'}}>Linh kiện sử dụng</h2>
    <Container className="container">
      <br/>
      <Grid lg={12} container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 250, height: '300px' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="./../../../public/images/esp.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Esp 32
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '15px' }}>
                    Vi điều khiển
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Link target="_blank" rel="noopener noreferrer" to='https://octopart.com/esp32-wroom-32-espressif+systems-91025511?gclid=CjwKCAiAqNSsBhAvEiwAn_tmxRK-cn0cM1J7OfmsbIXliJ8CQQuG0Dm6v1CPtAST1Pa1u0REyS-l0BoCH5AQAvD_BwE'>
                    <Button variant="contained" size="small">Xem chi tiết</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>

            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 250, height: '300px' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="../../../public/images/pzem004.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    PZEM 004
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '15px' }}>
                    Cảm biến đo các thông số
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Link target="_blank" rel="noopener noreferrer"  to='https://innovatorsguru.com/wp-content/uploads/2019/06/PZEM-004T-V3.0-Datasheet-User-Manual.pdf'>
                    <Button variant="contained" size="small">Xem chi tiết</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>

            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 250, height: '300px' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="../../../public/images/lcd.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    LCD 20x4
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '15px' }}>
                    Màn hình hiển thị
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Link target="_blank" rel="noopener noreferrer" to='https://www.vishay.com/docs/37314/lcd020n004l.pdf'>
                    <Button variant="contained" size="small">Xem chi tiết</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>

            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 250, height: '300px' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="../../../public/images/source.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Khối nguồn
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '15px' }}>
                    Chuyển đổi 220VAC sang 5VDC
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Link target="_blank" rel="noopener noreferrer" to='https://icdayroi.com/module-nguon-ac-220v-sang-dc-5v-700ma'>
                    <Button variant="contained" size="small">Xem chi tiết</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default Home;

