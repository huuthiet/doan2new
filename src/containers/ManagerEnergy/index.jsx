import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import {database} from '../../firebase-config';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';

import {
  Grid, 
  Paper,
  Card, 
  CardActions,
  CardContent,
  CardMedia,  
  Button,
  Typography
} from '@mui/material';

import './style.scss';


const ManagerEnergy = props => {

  // const layouts = getLayoutsFromSomewhere();
  const layouts = [
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 2, y: 0, w: 1, h: 1 },
    // Thêm các ô khác tương tự
  ];

  const inlineStyles = {
    color: 'blue',
    fontSize: '16px',
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'lightgray',
    height: '100px',
  };

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const roomRef = ref(database, `rooms`);

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setRoomList(data);
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
  }, []);

  return (
    <div className="container">
      {/* <Helmet>
        <title>Energy</title>
        <meta name="description" content="Description of Energy" />
      </Helmet> */}
      <Grid lg={10} container spacing={2}>
        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tủ 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thông số last update
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Link to="/dashboard-detail">
                <Button variant="contained" size="small">Xem chi tiết</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid> */}

        {roomList.map((room) => (
          <>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Tủ {room.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dòng điện: {room.electric} (A)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Điện áp: {room.volt} (V)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Công suất: {room.power} (Wh)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Năng lượng: {room.energy} (KW)
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Link to={`/dashboard-detail/${room.id}`}>
                    <Button variant="contained" size="small">Xem chi tiết</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </>
        ))}
        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tủ 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thông số last update
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" size="small">Xem chi tiết</Button>  
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tủ 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thông số last update
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" size="small">Xem chi tiết</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tủ 4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thông số last update
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" size="small">Xem chi tiết</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tủ 5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thông số last update
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" size="small">Xem chi tiết</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tủ 6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thông số last update
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" size="small">Xem chi tiết</Button>
            </CardActions>
          </Card>
        </Grid> */}
      </Grid>
    </div>
  );
}


// export default compose(withConnect)(CreateRoom);
export default ManagerEnergy;
