import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, ProgressBar, Form, Col } from 'react-bootstrap';
import PaperWrapper from '../../components/PaperWrapper';

import { useDispatch, useSelector } from 'react-redux';

const ProfileCard = ({ fullName, phoneNumber }) => {
  console.log("fullName", fullName)
  console.log("phoneNumber", phoneNumber)
  return (
    <Col lg={4}>
      <Card>
        <Card.Body>
        <div className="d-flex flex-column align-items-center text-center">
            <Card.Img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
            <div className="mt-3">
              <h4>{fullName}</h4>
              <p className="text-muted font-size-sm">{phoneNumber}</p>
              <Button variant="outline-primary">Message</Button>
            </div>
          </div>
          <hr className="my-4" />
          {/* <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
              <span className="text-secondary">https://bootdey.com</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
              <span className="text-secondary">bootdey</span>
            </li>
          </ul> */}
        </Card.Body>
      </Card>
    </Col>
  );
};

const EditProfile = ({ fullName, phoneNumber, email, idRoom }) => {
  return (
    <Col lg={8}>
      <Card>
      <Card.Body>
          <div className="row mb-3">
            <Form.Group as={Col} sm={3}>
              <Form.Label>Full Name</Form.Label>
            </Form.Group>
            <Form.Group as={Col} sm={9} className="text-secondary">
              <Form.Control type="text" defaultValue={fullName} />
            </Form.Group>
          </div>
          <div className="row mb-3">
            <Form.Group as={Col} sm={3}>
              <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group as={Col} sm={9} className="text-secondary">
              <Form.Control type="text" defaultValue={email} />
            </Form.Group>
          </div>
          <div className="row mb-3">
            <Form.Group as={Col} sm={3}>
              <Form.Label>Phone</Form.Label>
            </Form.Group>
            <Form.Group as={Col} sm={9} className="text-secondary">
              <Form.Control type="text" defaultValue={phoneNumber} />
            </Form.Group>
          </div>
          <div className="row mb-3">
            <Form.Group as={Col} sm={3}>
              <Form.Label>Id Room</Form.Label>
            </Form.Group>
            <Form.Group as={Col} sm={9} className="text-secondary">
              <Form.Control type="text" defaultValue={idRoom} />
            </Form.Group>
          </div>
          <div className="row">
            <Col sm={3}></Col>
            <Col sm={9} className="text-secondary">
              <Button variant="primary" className="px-4">Save Changes</Button>
            </Col>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idRoom, setIdRoom] = useState("");

  const user = useSelector(state => state.user);
  const {currentUser} = user;

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullname);
      setEmail(currentUser.email);
      setPhoneNumber(currentUser.phonenumber);
      setIdRoom(currentUser.idroom);
    }
  }, [currentUser]);

  return (
    <>
    <br/>
    <div className="container">
        <div className="main-body">
            <Form>
            <div className="row">
                <ProfileCard phoneNumber = {phoneNumber} fullName={fullName}/>
                <EditProfile phoneNumber = {phoneNumber} fullName={fullName} email={email} idRoom={idRoom}/>
            </div>
            </Form>
        </div>
    </div>
    </>
  );
};

export default Profile;
