import React, { useState, useEffect } from 'react';
import { Grid, Box, Tabs, Tab, Alert, AlertTitle  } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

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
import Button from '@mui/material/Button';

import axios from 'axios';


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



const UserDasboardDetail = () => {
  const currentDate = new Date();

  // Lấy tháng từ đối tượng ngày
  const currentMonth = currentDate.getMonth() + 1;

  //Thông tin user
  const user = useSelector(state => state.user);
  const {currentUser} = user;
  const [idRoom, setIdRoom] = useState(currentUser.idroom);
  // Nếu thay đổi user thì cập lại id room
  useEffect(() => {
    if (currentUser) {
      setIdRoom(currentUser.idroom);
    }
  }, [currentUser]);
  //--------------------

  // set ngày bắt đầu và kết thúc để lọc dư liệu
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] 
    = useState(dayjs(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`)
    .format('YYYY-MM-DD'));
  // ngày bắt đầu và kế thúc để hiển thị, chưa lọc
  const [startDateDisplay, setStartDateDisplay] =  useState(startDate);
  const [endDateDisplay, setEndDateDisplay] =  useState(endDate);

  const handleStartDateDisplayChange = (event) => {
    const newDate = event.target.value;

    setStartDateDisplay(newDate);
  };
  const handleEndDateDisplayChange = (event) => {
    const newDate = event.target.value;

    setEndDateDisplay(newDate);
  };

  //Thanh lọc cố định
  const [value, setValue] = useState(2); //theo 1 tháng -> Cái này đại diện cho tab, cần thêm 1 giá trị bản sao
  // để khi tùy chọn khoảng ngày ở nút Lọc thì set giá trị
  //TẠM THỜI ĐANG GẶP VẤN ĐỀ KHI  SET ĐỒNG THỜI CẢ value lẫn rangTime, sử dụng tạm value, chưa
  //đụng tới lọc -> XEM ẢNH problem

  // NẾU ĐANG Ở 5, KHÔNG THUỘC TAB NÀO MÀ THUỘC TUY CHỌN, ĐƯỢC LƯU TRONG STATE KHI RELOAD 
  // LẠI KHÔNG MẤT THÌ CẦN SET UP LẠI MẶC ĐỊNH -> chưa làm tính năng này
  const [rangeTime, setRangeTime] = useState(value);

  const handleChangeTime = (event, newValue) => {
    
    setValue(newValue);
    // setRangeTime(newValue);
    // console.log("value", value);
    // timeRange:
    // 0: ngày
    // 1: tuần
    // 2: tháng: MẶC ĐỊNH
    // 3: năm
    // 4: tất cả
    // 5: Tùy chọn -> chọn khoảng thời gian
  };



  const [roomData, setRoomData] = useState({
    electric: 0,
    volt: 0,
    power: 0,
    energy: 0,
  });


function handleButtonFilter() {
  setStartDate(startDateDisplay);
  setEndDate(endDateDisplay);
  // setRangeTime(5); //chọn khoảng thời gian
  // console.log("rangeTime", rangeTime);
}

// day to day: MẶC ĐỊNH GỌI
const [dataLineChart, setDataLineChart] = useState([]);

const fetchData = async (idRoom, startDate, endDate, value) => {
  console.log("idRoom", idRoom);

  const deviceId = idRoom

  //MẶC ĐỊNH TRONG THÁNG
  let apiUrl = `http://localhost:3000/rooms_1day/${deviceId}/${currentMonth}`;  

  if (value === 0) {
    //ngày
   apiUrl = `http://localhost:3000/rooms_1hour/${deviceId}/${startDate}/${endDate}`;  
  } else if (value === 1) {
    //tuần
   apiUrl = `http://localhost:3000/rooms_1day_week/${deviceId}`;  
  } else if (value === 2) {
    //tháng
   apiUrl = `http://localhost:3000/rooms_1day/${deviceId}/${currentMonth}`;  
  } else if (value === 3) {
    //năm
   apiUrl = `http://localhost:3000/rooms_1mon_year/${deviceId}`;  
  } else if (value === 4) {
    //tất cả -> CHƯA LÀM
    apiUrl = `http://localhost:3000/rooms_1day/${deviceId}/${currentMonth}`;  
  } else {
    // lấy trong tháng
    apiUrl = `http://localhost:3000/rooms_1day/${deviceId}/${currentMonth}`;  
  }

  try {
    
    // const startDate =startDate;
    //  '2023-12-28'; 
    // const endDate = endDate;
    // '2023-12-28';

    

    const response = await axios.get(apiUrl);
    setDataLineChart(response.data);

    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData(idRoom, startDate, endDate, value);

  const intervalId = setInterval(() => {
    fetchData(idRoom, startDate, endDate, value);
  }, 60 * 60 * 1000);

  return () => {
    clearInterval(intervalId);
  };
}, [value]);

//------------------------------


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

    //----------------------------------------------------------

    
  // sort all
  // const [data, setData] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/rooms');
  //     setData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();

  //   // Lập lịch gọi API mỗi 1 tiếng
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 60 * 60 * 1000); // 1 tiếng = 60 phút * 60 giây * 1000 milliseconds

  //   // Cleanup: clear interval khi component bị unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // sort theo phòng
  // const [data, setData] = useState(null);

  // const fetchData = async (idRoom) => {
  //   try {
  //     const url = `http://localhost:3000/rooms/${idRoom}`;
  //     const response = await axios.get(url);
  //     setData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(2);

  //   // Lập lịch gọi API mỗi 1 tiếng
  //   const intervalId = setInterval(() => {
  //     fetchData(2);
  //   }, 60 * 60 * 1000); // 1 tiếng = 60 phút * 60 giây * 1000 milliseconds

  //   // Cleanup: clear interval khi component bị unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  //-------------------------
  


  return (
    
    // className='container-fluid'
    <div >
    <br/>
    <PaperWrapper>
        <Grid container justifyContent="center">
          <Grid item lg={8} md={8} sm={12} xs={12} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{display: 'flex', gap: '10px'}}>
                  <label htmlFor="startdate">Từ ngày: </label>
                  <input 
                    type='date' 
                    id='startdate' 
                    value={startDateDisplay}
                    onChange={handleStartDateDisplayChange} 
                  />
                  <label htmlFor="startdate">Đến ngày: </label>
                  <input 
                    type='date' 
                    id='startdate'
                    value={endDateDisplay}
                    onChange={handleEndDateDisplayChange} 
                  />
                  <Button onClick={handleButtonFilter} variant="contained" color="primary">
                    Lọc
                  </Button>
                </div>
              </Grid>

              <Grid item lg={8} md={8} sm={12} xs={12}>
                <div>
                  <Box sx={{ bgcolor: 'background.paper', margin: 0 }}>
                    <Tabs 
                      value={value} 
                      onChange={handleChangeTime} 
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

            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item lg={7} md={7} sm={10} xs={11} style={{ maxWidth: '100%', minHeight: '50vh' }}>
                <LineChart externalData={dataLineChart} timeRange={value}/>
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

export default UserDasboardDetail;