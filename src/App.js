import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table, Input, Button, Space } from "antd";
import { Row, Col } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, InputNumber } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const apiLocation = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiTrip = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiTicket = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiPassenger = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiDriver = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiBus = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiHistory = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiSchedule = axios.create({
  baseURL: `http://localhost:8762`,
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
      tickets: [],
      buses: [],
      drivers: [],
      history: [],
      schedule: [],
      historyPush: {
        id: null,
        passengerId: null,
        ticketId: null,
        cost: null,
      },
      choosedTicket: 1,
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
    apiDriver.get("/driver/all").then((res) => {
      this.setState({ drivers: res.data });
      console.log(this.state.drivers);
    });
    apiHistory.get("/history/all").then((res) => {
      this.setState({ history: res.data });
      console.log(this.state.history);
    });
    apiSchedule.get("/schedule/all").then((res) => {
      this.setState({ schedule: res.data });
      console.log(this.state.schedule);
    });
  }

  handleSubmitTrip = (e) => {
    e.id = Number(e.id);
    e.numb = Number(e.numb);
    console.log(e);
    axios
      .post("http://localhost:8762/trip/create", e)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleSubmitLocation = (e) => {
    e.id = Number(e.id);
    e.tripId = Number(e.tripId);
    e.seq = Number(e.seq);
    console.log(e);
    axios
      .post("http://localhost:8762/location/create", e)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleSubmitDrivers = (e) => {
    e.id = Number(e.id);
    e.busId = Number(e.busId);
    e.iin = Number(e.iin);
    e.experience = Number(e.experience);
    console.log(e);
    axios
      .post("http://localhost:8762/driver/create", e)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleSubmitBus = (e) => {
    e.id = Number(e.id);
    e.tripId = Number(e.tripId);
    e.year = Number(e.year);
    e.capacity = Number(e.capacity);
    console.log(e);
    axios
      .post("http://localhost:8762/bus/create", e)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  handleSubmitSchedule = (e) => {
    e.id = Number(e.id);
    e.busId = Number(e.busId);
    console.log(e);
    axios
      .post("http://localhost:8762/schedule/create", e)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  onFinish = (values) => {
    const iin = values.iin;
    const ticketId = values.ticketId;
    console.log(iin);
    apiTicket.get(`/ticket/decrese/${iin}`).then((res) => {
      console.log(res.data);
    });
  };
  onFinishHistory = (values) => {
    this.setState({
      historyPush: {
        id: Number(values.id),
        passengerId: Number(values.passengerId),
        ticketId: Number(this.state.choosedTicket.id),
        cost: this.state.choosedTicket.cost,
      },
    });
    console.log(this.state.historyPush);

    // axios.get();
    console.log("ssssss");
    console.log(values);
    // const ticketId = values.passengerId;
    // console.log(iin);
    axios
      .post("http://localhost:8762/history/create", this.state.historyPush)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  getByBusId = (e) => {
    apiDriver.get(`/driver/driversBus/${e}`).then((res) => {
      console.log(res.data);
      this.setState({ drivers: res.data });

      // console.log(this.state.locations)
    });
  };
  getByPassengerId = (e) => {
    axios.get(`http://localhost:8762/history/all/${e}`).then((res) => {
      console.log(res.data);
      this.setState({ history: res.data });

      // console.log(this.state.locations)
    });
  };
  getByTripId = (e) => {
    apiLocation.get(`/location/locationsTrip/${e}`).then((res) => {
      console.log(res.data);
      this.setState({ locations: res.data });

      // console.log(this.state.locations)
    });
  };
  getByTripIdTicket = (e) => {
    apiTicket.get(`/ticket/ticketsTrip/${e}`).then((res) => {
      console.log(res.data);
      this.setState({ tickets: res.data });

      // console.log(this.state.locations)
    });
  };
  getByBusIdSchedule = (e) => {
    apiSchedule.get(`/schedule/schedulesBus/${e}`).then((res) => {
      console.log(res.data);
      this.setState({ schedule: res.data });

      // console.log(this.state.locations)
    });
  };
  render() {
    const { history, schedule } = this.state;
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
    const columnsTickets = [
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
    const columnsBuses = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Trip ID",
        dataIndex: "tripId",
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
    const columnsDrivers = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Bus id",
        dataIndex: "busId",
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
        dataIndex: "drivingLicenseLevel",
      },
    ];
    const columnsHistory = [
      {
        title: "History ID",
        dataIndex: "id",
      },
      {
        title: "Passenger ID",
        dataIndex: "passengerId",
      },
      {
        title: "Ticket ID",
        dataIndex: "ticketId",
      },
      {
        title: "Cost",
        dataIndex: "cost",
      },
    ];
    const columnsSchedule = [
      {
        title: "Schedule ID",
        dataIndex: "id",
      },
      {
        title: "Bus ID",
        dataIndex: "busId",
      },
      {
        title: "Start time",
        dataIndex: "startTime",
      },
      {
        title: "End Time",
        dataIndex: "endTime",
      },
    ];
    const textStyle = {
      textAlignVertical: "center",
      textAlign: "center",
    };
    console.log(this.state.choosedTicket);
    return (
      <div className="App">
        <h1>Bus Intercity System</h1>
        <hr></hr>
        <Row>
          <Col>
            <Row>
              <h1 style={{ textStyle }}>1.All available trips</h1>
            </Row>
            <Row>
              <h1 style={{ textStyle }}>2.Locations of this Trips</h1>
            </Row>
          </Col>
          <Col>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {}, // click row
                  onDoubleClick: (event) => {}, // double click row
                  onContextMenu: (event) => {}, // right button click row
                  onMouseEnter: (event) => {}, // mouse enter row
                  onMouseLeave: (event) => {}, // mouse leave row
                };
              }}
              style={{ marginLeft: 10 }}
              columns={columnsTrips}
              dataSource={this.state.trips}
              bordered
              title={() => "Trips"}
            />
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Search
              // style = {{ width : 150, height : 150, marginLeft : 370 }}
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
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Row>
              <h1 style={{ textStyle }}>1.By Trip Id get cost for ticket</h1>
            </Row>
            <Row>
              <h1 style={{ textStyle }}>2.Buy ticket</h1>
            </Row>
          </Col>
          <Col span={4} style={{ marginLeft: 20 }}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByTripIdTicket(value)}
            />
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    this.setState({
                      choosedTicket: record,
                    });
                  }, // click row
                  onDoubleClick: (event) => {}, // double click row
                  onContextMenu: (event) => {}, // right button click row
                  onMouseEnter: (event) => {}, // mouse enter row
                  onMouseLeave: (event) => {}, // mouse leave row
                };
              }}
              columns={columnsTickets}
              dataSource={this.state.tickets}
              bordered
              title={() => "Tickets"}
            />
            <h1>You choosed {this.state.choosedTicket.tripId}</h1>
          </Col>
          <Col span={4}>
            <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
              <Form.Item label="Ticket ID" name={"ticketId"}>
                <Input />
              </Form.Item>
              <Form.Item label="IIN" name={"iin"}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinishHistory}
            >
              <Form.Item label="History ID" name={"id"}>
                <Input />
              </Form.Item>
              <Form.Item label="Passenger ID" name={"passengerId"}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Search
              // style = {{ width : 150, height : 150, marginLeft : 370 }}
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByPassengerId(value)}
            />
            <Table
              columns={columnsHistory}
              dataSource={this.state.history}
              bordered
              title={() => "History"}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Row>
              <h1 style={{ textStyle }}>1.Buses</h1>
            </Row>
            <Row>
              <h1 style={{ textStyle }}>2.Drivers</h1>
            </Row>
          </Col>
          <Col style={{ marginLeft: 40 }}>
            <Table
              columns={columnsBuses}
              dataSource={this.state.buses}
              bordered
              title={() => "Buses"}
            />
          </Col>
          <Col style={{ marginLeft: 30 }}>
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
          <Col>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByBusIdSchedule(value)}
            />
            <Table
              columns={columnsSchedule}
              dataSource={this.state.schedule}
              bordered
              title={() => "Schedules"}
            />
            <h1>You choosed {this.state.choosedTicket.tripId}</h1>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <h2>Add Trip</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.handleSubmitTrip}
            >
              <Form.Item label="ID" name={"id"}>
                <Input />
              </Form.Item>
              <Form.Item label="Location" name={"loc"}>
                <Input />
              </Form.Item>
              <Form.Item label="Number" name={"numb"}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col style={{ marginLeft: 30 }}>
            <h2>Add Location</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.handleSubmitLocation}
            >
              <Form.Item label="ID" name={"id"}>
                <Input />
              </Form.Item>
              <Form.Item label="Trip Id" name={"tripId"}>
                <Input />
              </Form.Item>
              <Form.Item label="First Location" name={"firstLoc"}>
                <Input />
              </Form.Item>
              <Form.Item label="Last Location" name={"lastLoc"}>
                <Input />
              </Form.Item>
              <Form.Item label="Sequence" name={"seq"}>
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
            <h2>Add Driver</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.handleSubmitDrivers}
            >
              <Form.Item label="ID" name={"id"}>
                <Input />
              </Form.Item>
              <Form.Item label="Bus ID" name={"busId"}>
                <Input />
              </Form.Item>
              <Form.Item label="Name" name={"name"}>
                <Input />
              </Form.Item>
              <Form.Item label="Surname" name={"surname"}>
                <Input />
              </Form.Item>
              <Form.Item label="IIN" name={"iin"}>
                <Input />
              </Form.Item>
              <Form.Item label="Experience" name={"experience"}>
                <Input />
              </Form.Item>
              <Form.Item label="Level" name={"drivingLicenseLevel"}>
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
            <h2>Add Bus</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.handleSubmitBus}
            >
              <Form.Item label="ID" name={"id"}>
                <Input />
              </Form.Item>
              <Form.Item label="Trip ID" name={"busId"}>
                <Input />
              </Form.Item>
              <Form.Item label="State Number" name={"state_number"}>
                <Input />
              </Form.Item>
              <Form.Item label="Modal" name={"model"}>
                <Input />
              </Form.Item>
              <Form.Item label="Year" name={"year"}>
                <Input />
              </Form.Item>
              <Form.Item label="Capacity" name={"capacity"}>
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
            <h2>Add Schedule</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.handleSubmitSchedule}
            >
              <Form.Item label="ID" name={"id"}>
                <Input />
              </Form.Item>
              <Form.Item label="Bus Id" name={"busId"}>
                <Input />
              </Form.Item>
              <Form.Item label="Start Number" name={"startTime"}>
                <Input />
              </Form.Item>
              <Form.Item label="End Time" name={"endTime"}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
