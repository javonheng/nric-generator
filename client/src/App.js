import React, { useState } from 'react';
import './App.css';
import { Typography, Button, Alert } from 'antd';
import NumericInput from './NumericInput';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';

function App() {

  const { Title } = Typography;
  const [year, setYear] = useState('');
  const [nric, setNRIC] = useState('');
  const [invalidYearInput, showInvalidYearInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeYear = (value) => {
    setYear(value);
  }

  const validateYear = (year) => {
    if (year < 1800 || year > 2100) {showInvalidYearInput(true)};
    if (year === "") {showInvalidYearInput(true)};
  }

  const handleSubmit = () => {
    validateYear(year);
    axios.post('/api/getNric', {
      year: year
    })
      .then(res => {
        setNRIC(res.data.nric);
        res.data.error ? setErrorMessage(res.data.error) : showInvalidYearInput(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <React.Fragment>
      <Title>
        Random NRIC Generator
      </Title>

      <NumericInput style={{width: 120}} value={year} onChange={handleChangeYear} /><br /><br />
      <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large" onClick={handleSubmit}>
        GENERATE
      </Button>

      <br /><br />
      {invalidYearInput && <Alert message={errorMessage} type="error" />}

      <br /><br />
      {nric && <Title level={5}>{nric}</Title>}
    </React.Fragment>
  );
}

export default App;
