/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import axiosInstance from "../helpers/axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watertypeNames : [],
      productChartValues : [],
      totalProducts : '',
      orderChartValues : [],
      totalOrders : '',
      remainingProducts : []
    };
  }

  watertypeNames() {
    axiosInstance.get('/watertypeNames').then((response) => {
      this.setState({
        watertypeNames : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }
  prodChartValues() {
    axiosInstance.get('/prodwatertypeTotals').then((response) => {
      this.setState({
        productChartValues : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }
  totalProds() {
    axiosInstance.get('/totalProducts').then((response) => {
      this.setState({
        totalProducts : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }
  orderChartValues() {
    axiosInstance.get('orderwatertypeTotals').then((response) => {
      this.setState({
        orderChartValues : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }
  totalOrders() {
    axiosInstance.get('totalOrders').then((response) => {
      this.setState({
        totalOrders : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }
  remainingProducts() {
    axiosInstance.get('remainingProducts').then((response) => {
      this.setState({
        remainingProducts : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }

  componentDidMount() {
    this.watertypeNames()
    this.prodChartValues()
    this.totalProds()
    this.orderChartValues()
    this.totalOrders()
    this.remainingProducts()
  }

  render() {
    let first_chart_options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };
    let remaining_stock = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: this.state.watertypeNames,
          datasets: [
            {
              label: "Inventory(Bottles)",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#00d6b4",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#00d6b4",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#00d6b4",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.remainingProducts
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 50,
                suggestedMax: 125,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,242,195,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };


    let orders = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: this.state.watertypeNames,
          datasets: [
            {
              label: "Orders(Bottles)",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.orderChartValues
            }
          ]
        };
      },
      options: first_chart_options
    };

    let product = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
        return {
          labels: this.state.watertypeNames,
          datasets: [
            {
              label: "Quantity(Bottles)",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.state.productChartValues
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };

    return (
        <>
          <div className="content">
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <h5 className="card-category">Total Products in Stock</h5>
                        <CardTitle tag="h2">Inventory</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                          data={remaining_stock.data}
                          options={remaining_stock.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Total Ordered Products</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                      {this.state.totalOrders}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                          data={orders.data}
                          options={orders.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Total Manufactured products</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bell-55 text-info" />{" "}
                      {this.state.totalProducts}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                          data={product.data}
                          options={product.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
    );
  }
}

export default Dashboard;
