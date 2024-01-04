// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="http://localhost:3000/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// function Footer(props) {
//   const { description, title } = props;

//   return (
//     <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
//     <hr className="my-4" />
//       <Container maxWidth="lg">
//         <Typography variant="h6" align="center" gutterBottom>
//           {title}
//         </Typography>
//         <Typography
//           variant="subtitle1"
//           align="center"
//           color="text.secondary"
//           component="p"
//         >
//           {description}
//         </Typography> 
//         <Copyright />
//       </Container>
//     </Box>
//   );
// }

// // Footer.propTypes = {
// //   description: PropTypes.string.isRequired,
// //   title: PropTypes.string.isRequired,
// // };

// export default Footer;

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

export default function Footer() {
  return (
    <>
    <br/>
    <br/>
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
    
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        {/* <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div> */}

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                DỰ ÁN QUẢN LÝ NĂNG LƯỢNG
              </h6>
              <p>
                Đây là dự án thực hiện bởi Kiên và Thiết cho môn học Đồ án môn học 2
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>THỰC HIỆN</h6>
              <p>
                  Giáo viên hướng dẫn: Huỳnh Thị Thu Hiền
              </p>
              <p>
                Sinh viên thực hiện:
              </p>
              <p>
                Lê Tấn Kiên
              </p>
              <p>
                Nguyễn Hữu Thiết
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Nội dung</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Giới thiệu
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Quản lý năng lượng
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>LIÊN HỆ</h6>
              <p>
                {/* <MDBIcon color='secondary' icon='home' className='me-2' /> */}
                Địa chỉ: Số 1, Võ Văn Ngân, Linh Chiểu, Thủ Đức, HCM
              </p>
              <p>
                {/* <MDBIcon color='secondary' icon='phone' className='me-3' /> */}
                Di động: 0903243425
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='#'>
           Kiên + Thiết
        </a>
      </div>
    </MDBFooter>
    </>
  );
}