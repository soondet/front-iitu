import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table, Input, Button, Space } from "antd";
import { Row, Col } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { Form,  InputNumber } from 'antd';
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const apiLocation = axios.create({
  baseURL: `http://localhost:8006`,
});
const apiTrip = axios.create({
  baseURL: `http://localhost:8005`,
});
const apiTicket = axios.create({
  baseURL: `http://localhost:8004`,
});
const apiPassenger = axios.create({
  baseURL: `http://localhost:8003`,
});
const apiDriver = axios.create({
  baseURL: `http://localhost:8002`,
});
const apiBus = axios.create({
  baseURL: `http://localhost:8001`,
});

const data = [
  {
    key: "1",
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: "3",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      trips: [],
      tickets:[],
      buses:[],
      drivers:[]
    };
    apiLocation.get("/location/all").then((res) => {
      this.setState({ locations: res.data });
      console.log(this.state.locations);
    });
    apiTrip.get("/trip/all").then((res) => {
      this.setState({ trips: res.data });
      console.log(this.state.trips);
    });
    apiBus.get("/bus/all").then((res) => {
      this.setState({ buses: res.data });
      console.log(this.state.buses);
    });
  }
 
  onFinish = (values) => {
    const iin  = values.iin;
    const ticketId = values.ticketId;
    console.log(iin)
    apiTicket.get(`/ticket/decrese/${iin}`).then((res)=>{
      console.log(res.data)
    })
  };
  getByBusId = (e) => {
    apiDriver.get(`/driver/driversBus/${e}`).then((res) => {
      console.log(res.data)
      this.setState({ drivers: res.data }); 

      // console.log(this.state.locations)
    });
  };
  getByTripId = (e) => {
    apiLocation.get(`/location/locationsTrip/${e}`).then((res) => {
      console.log(res.data)
      this.setState({ locations: res.data }); 

      // console.log(this.state.locations)
    });
  };
  getByTripIdTicket = (e) => {
    
    apiTicket.get(`/ticket/ticketsTrip/${e}`).then((res) => {
      console.log(res.data)
      this.setState({ tickets: res.data }); 

      // console.log(this.state.locations)
    });
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const columnsTrips = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Location Area",
        dataIndex: "loc",
      },
      {
        title: "Number of Tickets",
        dataIndex: "numb",
      },
    ];
    const columnsLocations = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Trip ID",
        dataIndex: "tripId",
      },
      {
        title: "First Location",
        dataIndex: "firstLoc",
      },
      {
        title: "Last Location",
        dataIndex: "lastLoc",
      },
      {
        title: "Sequence",
        dataIndex: "seq",
      },
    ];
    const columnsTickets= [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Trip ID",
        dataIndex: "tripId",
      },
      {
        title: "Cost",
        dataIndex: "cost",
      },
      
      // {
      //   title: "Status",
      //   dataIndex: "status",
      // },
      // {
      //   title: "Passenger IIN",
      //   dataIndex: "passenger_iin",
      // },
      // {
      //   title: "Qrcode",
      //   dataIndex: "qrcode",
      // },

    ];
    const columnsBuses= [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Trip ID",
        dataIndex: "trip_Id",
      },
      {
        title: "State number",
        dataIndex: "state_number",
      },
      
      {
        title: "Model",
        dataIndex: "model",
      },
      {
        title: "Year",
        dataIndex: "year",
      },
      {
        title: "Capacity",
        dataIndex: "capacity",
      },

    ];
    const columnsDrivers= [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Bus id",
        dataIndex: "bus_id",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      
      {
        title: "Surname",
        dataIndex: "surname",
      },
      {
        title: "IIN",
        dataIndex: "iin",
      },
      {
        title: "Experience",
        dataIndex: "experience",
      },
      {
        title: "License",
        dataIndex: "driving_license_level",
      },

    ];

    return (
      
      <div className="App">
        <Row>
          <Col>
            <Table
              columns={columnsTrips}
              dataSource={this.state.trips}
              bordered
              title={() => "Trips"}
            />
          </Col>
          <Col>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByTripId(value)}
            />
            <Table
              columns={columnsLocations}
              dataSource={this.state.locations}
              bordered
              title={() => "Locations"}
            />
          </Col>
          <Col>
          <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByTripIdTicket(value)}
              />
            <Table
              columns={columnsTickets}
              dataSource={this.state.tickets}
              bordered
              title={() => "Tickets"}
            />
          </Col>
        </Row>
        <Row>
        <Col>
          <Form  {...layout} name="nest-messages" onFinish={this.onFinish}   >
          <Form.Item  label="Ticket ID" name={'ticketId'}>
            <Input />
       </Form.Item>
       <Form.Item  label="IIN" name={'iin'}>
            <Input />
       </Form.Item>
       <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
          </Form>
          </Col>
          <Col>
            <Table
              columns={columnsBuses}
              dataSource={this.state.buses}
              bordered
              title={() => "Buses"}
            />
          </Col>
          <Col>
          <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByBusId(value)}
              />
            <Table
              columns={columnsDrivers}
              dataSource={this.state.drivers}
              bordered
              title={() => "Drivers"}
            />
          </Col>
        
        </Row>
      </div>
    );
  }
}

export default App;
