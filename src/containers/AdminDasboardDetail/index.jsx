import React, { useState, useEffect } from 'react';
import { Grid, Box, Tabs, Tab, Alert, AlertTitle  } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom';

import { getDatabase, ref, child, get, onValue } from "firebase/database";
import {database} from '../../firebase-config';
// import firestore from '../../firebase-config';
import { useDispatch, useSelector } from 'react-redux';


import LineChart from '../../components/LineChart';
import ElectricMetter from '../../components/ElectricMetter';
import PaperWrapper from '../../components/PaperWrapper';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const CardView = ({ title, value, unit }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        padding: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};





const AdminDasboardDetail = () => {
  const currentDate = new Date();

  const [idRoom, setIdRoom] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIdRoom(id);
    }
  }, [id]);

  // Sử dụng id trong component của bạn
  console.log('Room ID:', id);
  

  const [startDate, setStartDate] = useState(dayjs('2023-01-07').format('YYYY-MM-DD'));
  const [endDate, setEndDate] 
    = useState(dayjs(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`)
    .format('YYYY-MM-DD'));

  const handleStartDateChange = (event) => {
    const newDate = event.target.value;

    setStartDate(newDate);
    //THỰC HIỆN SORT DỮ LIỆU LUÔN VÀ HIỂN THỊ
  };
  const handleEndDateChange = (event) => {
    const newDate = event.target.value;

    setEndDate(newDate);
    //THỰC HIỆN SORT DỮ LIỆU LUÔN VÀ HIỂN THỊ
  };

  const [value, setValue] = useState(2); //theo 1 tháng
  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

// Lấy tháng từ đối tượng ngày
const currentMonth = currentDate.getMonth() + 1;


  const [valueElectric, setValueElectric] = useState(Math.random());

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setValueElectric(Math.random());
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  

  // const user = useSelector(state => state.user);
  // const {currentUser} = user;

  

  // get 
  
  // const [electric, setElectric] = useState(0); 
  // const [volt, setVolt] = useState(0); 
  // const [power, setPower] = useState(0); 
  // const [energy, setEnergy] = useState(0);

  const [roomData, setRoomData] = useState({
    electric: 0,
    volt: 0,
    power: 0,
    energy: 0,
  });

    
  // useEffect(() => {
  //   const fetchRoomData = async () => {
  //     const roomRef = ref(database, `rooms/${idRoom}`);
  //     try {
  //       const snapshot = await get(roomRef);
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         console.log("dataaaaa", data);
  //       } else {
  //         console.log('Room not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching room data:', error);
  //     }
  //   };

  //   fetchRoomData();
  // }, [idRoom]);


  //-----------------------real time--------------------------
  useEffect(() => {
    const roomRef = ref(database, `rooms/${idRoom}`);

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setRoomData(data);
        console.log("dataaa", data);
      } else {
        console.log('Room not found');
      }
    };

    // Đăng ký lắng nghe sự kiện realtime
    const unsubscribe = onValue(roomRef, handleData);

    // Hủy đăng ký lắng nghe khi component unmount
    return () => {
      unsubscribe();
    };
  }, [idRoom]);


  // ------------------------- 10 minutes/per ----------------------------
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const roomRef = ref(database, `rooms/${idRoom}`);
    //       const snapshot = await get(roomRef);
  
    //       if (snapshot.exists()) {
    //         const data = snapshot.val();
    //         setRoomData(data);
    //         console.log(data);
    //       } else {
    //         console.log('Room not found');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching room data:', error);
    //     }
    //   };
  
    //   // Gọi hàm lấy dữ liệu ngay khi component được mount
    //   fetchData();
  
    //   // Thiết lập interval để lấy dữ liệu mỗi 10 phút
    //   const intervalId = setInterval(() => {
    //     fetchData();
    //   }, 10 * 60 * 1000 ); // 10 phút * 60 giây/phút * 1000 mili giây
  
    //   // Hủy interval khi component unmount
    //   return () => {
    //     clearInterval(intervalId);
    //   };
    // }, [idRoom]);


  return (
    
    // className='container-fluid'
    <div >
    <div>DasboardDetail</div>
    <PaperWrapper>
        <Grid container justifyContent="center">
          <Grid item lg={8} md={8} sm={12} xs={12} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  <label htmlFor="startdate">Từ ngày: </label>
                  <input 
                    type='date' 
                    id='startdate' 
                    value={startDate}
                    onChange={handleStartDateChange} 
                  />
                  <label htmlFor="startdate">Đến ngày: </label>
                  <input 
                    type='date' 
                    id='startdate'
                    value={endDate}
                    onChange={handleEndDateChange} 
                  />
                </div>
              </Grid>

              <Grid item lg={8} md={8} sm={12} xs={12}>
                <div>
                  <Box sx={{ bgcolor: 'background.paper', margin: 0 }}>
                    <Tabs 
                      value={value} 
                      onChange={handleChange} 
                      variant="scrollable"
                      scrollButtons="auto"
                      indicatorColor="primary" 
                      textColor="primary"
                      label="scrollable auto tabs example">
                      <Tab label="1 Ngày" />
                      <Tab label="1 Tuần" />
                      <Tab label="1 Tháng" />
                      <Tab label="1 Năm" />
                      <Tab label="Tất cả" />
                    </Tabs>
                  </Box>
                </div>
              </Grid>
            </Grid>
{/* 
              <Grid container spacing={2} style={{ display: 'flex',  justifyContent: 'center' }}>
                <Grid item lg={7} md={7} sm={10} xs={11}  style={{ maxWidth: '100%', minHeight: '50vh' }}>
                    <LineChart />
                </Grid>

                <Grid item lg={5} md={5} sm={10} xs={11} 
                  style={{ display: 'flex',  flexDirection: 'column', alignItems: 'center', maxWidth: '100%', height: '400px' }}>
                    <Grid item container spacing={2}>
                        <Grid item lg={6} md={6} sm={6} xs={11}>
                            <CardView title="Dòng điện" value={roomData.electric} unit="" />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={11}>
                            <CardView title="Điện áp" value={roomData.volt} unit="" />
                        </Grid>
                    </Grid>

                    <Grid item container spacing={2}>
                        <Grid item lg={6} md={6} sm={6} xs={11} >
                            <CardView title="Công suất" value={roomData.power} unit="" />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={11} >
                            <CardView title="Năng lượng" value={roomData.en} unit="" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}

            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item lg={7} md={7} sm={10} xs={11} style={{ maxWidth: '100%', minHeight: '50vh' }}>
                <LineChart/>
              </Grid>

              <Grid
                item
                container
                lg={5}
                md={5}
                sm={10}
                xs={11}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '100%',
                  height: '400px',
                }}
                spacing={2}
              >
                <Grid item container spacing={2}>
                  <Grid item lg={6} md={6} sm={4} xs={11}>
                    <CardView title="Dòng điện (A)" value={roomData.electric} unit="" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={4} xs={11}>
                    <CardView title="Điện áp (V)" value={roomData.volt} unit="" />
                  </Grid>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item lg={6} md={6} sm={4} xs={11}>
                    <CardView title="Công suất (Wh)" value={roomData.power} unit="" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={4} xs={11}>
                    <CardView title="Năng lượng (KW)" value={roomData.energy} unit="" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Alert severity="info">
              <AlertTitle>Tiền điện tháng {currentMonth}</AlertTitle>
              Tổng: <strong>1000</strong> VNĐ
            </Alert>
            </PaperWrapper>
    </div>
  )
}

export default AdminDasboardDetail;