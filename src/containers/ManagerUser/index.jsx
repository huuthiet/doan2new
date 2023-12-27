import React from 'react';
import { Container, Button, Card, Badge, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ManagerUser = () => {
  return (
    <>
        <br/>
      <Container className="d-flex align-items-center justify-content-center">
        <Card className="p-4">
          <div className="row text-center">
            <h3>Quản lý phòng</h3>
          </div>
          <br />
          <br />
          <Container className="list-room">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="mb-3">
                  <h5 className="card-title">
                    List Room <span className="text-muted fw-normal ms-2">(834)</span>
                  </h5>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                  <div>
                    <Button variant="primary" onClick={() => {}}>
                      <i className="bx bx-plus me-1"></i> Add New
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="">
                  <div className="table-responsive">
                    <Table className="project-list-table" striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th scope="col" className="ps-4" style={{ width: '50px' }}>
                            <div className="form-check font-size-16">
                              <input type="checkbox" className="form-check-input" id="contacusercheck" />
                              <label className="form-check-label" htmlFor="contacusercheck"></label>
                            </div>
                          </th>
                          <th scope="col">Name</th>
                          <th scope="col">Room</th>
                          <th scope="col">Email</th>
                          <th scope="col">Energy</th>
                          <th scope="col" style={{ width: '200px' }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" className="ps-4">
                            <div className="form-check font-size-16">
                              <input type="checkbox" className="form-check-input" id="contacusercheck1" />
                              <label className="form-check-label" htmlFor="contacusercheck1"></label>
                            </div>
                          </th>
                          <td>
                            <div className="d-flex align-items-center">
                              {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-sm rounded-circle me-2" /> */}
                              <a href="#" className="text-body">
                                Simon Ryles
                              </a>
                            </div>
                          </td>
                          <td>
                            <Badge variant="success" className="mb-0">
                              Phòng khách
                            </Badge>
                          </td>
                          <td>SimonRyles@minible.com</td>
                          <td>125</td>
                          <td>
                            <div className="list-inline mb-0">
                                <Button variant="primary" className="me-2">
                                Detail
                                </Button>
                                <Button variant="primary">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default ManagerUser;
