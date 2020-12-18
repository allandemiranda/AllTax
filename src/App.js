import { useState, useEffect } from "react";
import { Navbar, Form, Row, Col } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function App() {
    const tableData = {
        category: [
            {
                nome: "comida",
                product: [
                    {
                        nome: "arroz",
                        brand: [
                            { nome: "nordeste", valores: [1, 2, 3, 4] },
                            { nome: "china", valores: [4, 3, 2, 1] },
                        ],
                    },
                    {
                        nome: "feijão",
                        brand: [
                            { nome: "tio", valores: [1, 3, 3, 3] },
                            { nome: "zuzu", valores: [1, 1, 3, 4] },
                        ],
                    },
                ],
            },
            {
                nome: "carro",
                product: [
                    {
                        nome: "pneu",
                        brand: [
                            { nome: "pirelli", valores: [1, 0, 1, 4] },
                            { nome: "golden", valores: [2, 2, 0, 4] },
                        ],
                    },
                    {
                        nome: "limpador",
                        brand: [
                            { nome: "xa", valores: [0, 4, 0, 4] },
                            { nome: "ya", valores: [1, 2, 2, 2] },
                        ],
                    },
                ],
            },
        ],
    };

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: "column",
        },
        xAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr"],
        },
        series: [
            {
                name: "Sales",
                data: tableData.category[0].product[0].brand[0].valores,
            },
        ],
        title: {
            text: "Sales By Month for:",
        },
        yAxis: {
            title: {
                text: 'Sales'
            }
        },
    });

    const [categoryState, setCategoryState] = useState(
        tableData.category[0].nome
    );

    const [productState, setProductState] = useState(
        tableData.category[0].product[0].nome
    );

    const [brandState, setBrandState] = useState(
        tableData.category[0].product[0].brand[0].nome
    );

    useEffect(() => {
        tableData.category.map((value) => {
            if (value.nome === categoryState) {
                setProductState(value.product[0].nome);
            }
        });
    }, [categoryState]);

    useEffect(() => {
        tableData.category.map((value) => {
            if (value.nome === categoryState) {
                value.product.map((value1) => {
                    if (value1.nome === productState) {
                        setBrandState(value1.brand[0].nome);
                    }
                });
            }
        });
    }, [productState]);

    useEffect(() => {
        tableData.category.map((value) => {
            if (value.nome === categoryState) {
                value.product.map((value1) => {
                    if (value1.nome === productState) {
                        value1.brand.map((value2) => {
                            if (value2.nome === brandState) {
                                setChartOptions({
                                    ...chartOptions,
                                    series: [
                                        { name: "Sales", data: value2.valores },
                                    ],
                                });
                            }
                        });
                    }
                });
            }
        });
    }, [brandState]);

    return (
        <div>
            <Navbar style={{ backgroundColor: "#0087bd" }}>
                <Navbar.Brand href="#home" style={{ color: "#fff" }}>
                    Menu
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
            </Navbar>
            <br></br>
            <Form>
                <Form.Row>
                  <Col md="2"></Col>
                    <Form.Group as={Row} md="3" controlId="Category-form">
                        <Form.Label column lg={4}>Category:</Form.Label>
                        <Col md="8">
                            <Form.Control
                                as="select"
                                onChange={(event) => {
                                    setCategoryState(event.target.value);
                                }}
                                custom
                            >
                                {tableData.category.map((value, key) => {
                                    return (
                                        <option key={key}>{value.nome}</option>
                                    );
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Col md="2"></Col>
                    <Form.Group as={Row} md="3" controlId="Product-form">
                        <Form.Label column lg={4}>Product:</Form.Label>
                        <Col md="8">
                            <Form.Control
                                as="select"
                                onChange={(event) => {
                                    setProductState(event.target.value);
                                }}
                                custom
                            >
                                {tableData.category.map((value, key) => {
                                    if (value.nome === categoryState) {
                                        return value.product.map(
                                            (value1, key1) => {
                                                return (
                                                    <option key={key1}>
                                                        {value1.nome}
                                                    </option>
                                                );
                                            }
                                        );
                                    }
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Col md="2"></Col>
                    <Form.Group as={Row} md="3" controlId="Brand-form">
                        <Form.Label column lg={3}>Brand:</Form.Label>
                        <Col md="9" >
                            <Form.Control
                                as="select"
                                onChange={(event) => {
                                    setBrandState(event.target.value);
                                }}
                                custom
                            >
                                {tableData.category.map((value) => {
                                    if (value.nome === categoryState) {
                                        return value.product.map((value1) => {
                                            if (value1.nome === productState) {
                                                return value1.brand.map(
                                                    (value2, key2) => {
                                                        return (
                                                            <option key={key2}>
                                                                {value2.nome}
                                                            </option>
                                                        );
                                                    }
                                                );
                                            }
                                        });
                                    }
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form.Row>
            </Form>
            <br></br>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}

export default App;
