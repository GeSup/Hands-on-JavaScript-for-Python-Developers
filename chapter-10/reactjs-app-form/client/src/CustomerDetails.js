import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Label, Input } from "reactstrap"
import CONSTANTS from "./constants"
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get(`${CONSTANTS.API_ROOT}/api/get/` + id).then(response => {
      this.setState({ customerDetails: response })
    })
  };

  handleChange(event) {
    const details = this.state.customerDetails;
    details.data[event.target.name] = event.target.value;

    this.setState({ customerDetails: details });

    axios.post(`${CONSTANTS.API_ROOT}/api/save/` + this.props.val, details)
      .then(() => {
        this.props.handler();
      });
  };

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    return (<div className="customerdetails">
      <Card className="centeralign panel panel-info">
        <CardHeader className="panel-heading">
          <CardTitle className="panel-title">{this.state.customerDetails.data.name}</CardTitle>
        </CardHeader>
        <CardBody>

          <Form>
            <FormGroup>
              <Label>Name:</Label>
              <Input name="name" type="text" value={this.state.customerDetails.data.name} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Email:</Label>
              <Input name="email" type="email" value={this.state.customerDetails.data.email} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Phone:</Label>
              <Input name="phone" type="number" value={this.state.customerDetails.data.phone} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>City:</Label>
              <Input name="city" type="text" value={this.state.customerDetails.data.city} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>State:</Label>
              <Input name="state" type="text" value={this.state.customerDetails.data.state} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Country:</Label>
              <Input name="country" type="test" value={this.state.customerDetails.data.country} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Organization:</Label>
              <Input name="organization" type="test" value={this.state.customerDetails.data.organization} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Job Profile:</Label>
              <Input name="jobProfile" type="test" value={this.state.customerDetails.data.jobProfile} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Additional Info:</Label>
              <Input name="additionalInfo" type="test" value={this.state.customerDetails.data.additionalInfo} onChange={this.handleChange} />
            </FormGroup>

          </Form>
        </CardBody>
      </Card>
    </div>)
  }
}
