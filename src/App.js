import 'antd/dist/antd.css';

import { Layout, Typography, Table, Input, Checkbox, Row, Col } from 'antd';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastname',
        key: 'lastname',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
    },
];

function App() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await fetch('https://venbest-test.herokuapp.com/');
            const data = await response
                .json()
                .then((data) => data.map((item, idx) => ({ ...item, id: idx })));
            setFilteredData(data);
            setData(data);
        };

        fetchAPI().catch((e) => console.log(e));
    }, []);

    const handleChangeInputName = (e) => {
        const name = e.target.value.toLowerCase();
        setFilteredData(data.filter((item) => item.name.toLowerCase().includes(name)));
    };

    const handleChangeInputLastname = (e) => {
        const lastname = e.target.value.toLowerCase();
        setFilteredData(data.filter((item) => item.lastname.toLowerCase().includes(lastname)));
    };

    const handleChangeInputAge = (e) => {
        const age = e.target.value.toLowerCase();
        setFilteredData(data.filter((item) => item.age === +age));

        if (age === '') {
            setFilteredData(data);
        }
    };

    const onChange = (e) => {
        if (e.toString() === 'f') {
            setFilteredData(data.filter((item) => item.sex === 'f'));
        } else if (e.toString() === 'm') {
            setFilteredData(data.filter((item) => item.sex === 'm'));
        } else {
            setFilteredData(data);
        }
    };

    return (
        <Layout>
            <Header>
                <Title style={{ color: 'lightblue', textAlign: 'center' }}>Venbest test</Title>
            </Header>
            <Layout>
                <Sider style={{ backgroundColor: '#40A9FF', paddingTop: '10px' }}>
                    <Title level={3} style={{ color: '#001529', textAlign: 'center' }}>
                        Filters
                    </Title>
                    <Row justify={'center'}>
                        <Col span={20}>
                            <Input
                                style={{ marginBottom: '5px' }}
                                placeholder="Name"
                                onChange={handleChangeInputName}
                            />
                            <Input
                                style={{ marginBottom: '5px' }}
                                placeholder="Surname"
                                onChange={handleChangeInputLastname}
                            />
                            <Input
                                style={{ marginBottom: '5px' }}
                                placeholder="Age"
                                onChange={handleChangeInputAge}
                            />
                            <Checkbox.Group
                                style={{ color: 'white' }}
                                options={[
                                    { label: 'M', value: 'm' },
                                    { label: 'F', value: 'f' },
                                ]}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </Sider>
                <Content>
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={filteredData}
                        rowKey={(record) => record.id}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
