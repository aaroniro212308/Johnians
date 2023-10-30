import React, { useState } from "react";
import { Form, Input, Modal, DatePicker, Select } from "antd";
const ModelJohnians = ({
  isModalOpen,
  handleCancel,
  handleOk,
  setFname,
  setLname,
  setBod,
  setNic,
  setAdmissionNo,
  setContactNo,
  setEmail,
  setJoinYear,
  setOlYear,
  setAlYear,
  setGames,
  setInterest,
  fname,
  lname,
  bod,
  nic,
  admissionNo,
  contactNo,
  email,
  joinYear,
  olyear,
  alyear,
  games,
  interest,
}) => {
  const options = [];
  options.push(
    {
      value: "cricket",
      label: "cricket",
    },
    {
      value: "soccer",
      label: "soccer",
    },
    {
      value: "basketball",
      label: "basketball",
    },
    {
      value: "hockey",
      label: "hockey",
    },
    {
      value: "volleyball",
      label: "volleyball",
    },
    {
      value: "tennis",
      label: "tennis",
    },
    {
      value: "gym",
      label: "gym",
    },
    {
      value: "indoor games",
      label: "indoor games",
    }
  );

  const [size, setSize] = useState("middle");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <div>
        <Modal
          title="Johnians"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Firstname"
              name="fname"
              rules={[
                {
                  required: true,
                  message: "Please input firstname",
                },
              ]}
            >
              <Input
                value={fname}
                placeholder="firstname"
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lname"
              rules={[
                {
                  required: true,
                  message: "Please input lastname",
                },
              ]}
            >
              <Input
                value={lname}
                placeholder="lastname"
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Birth of Date" name="bod">
              <DatePicker
                value={bod}
                onChange={(bod, dateString) => setBod(bod)}
                rules={[
                  { required: true, message: "Please select your birth date!" },
                ]}
              />
              {console.log(bod)}
            </Form.Item>
            <Form.Item label="Nic" name="nic">
              <Input
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your NIC!",
                  },
                  {
                    pattern: /^\d{12}$/, // Regular expression to check if the input is exactly 12 digits.
                    message: "NIC must be exactly 12 digits!", // Message to show when validation fails.
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="AdmissionNo" name="admissionNo">
              <Input
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="ContactNo" name="contactNo">
              <Input
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Join Year" name="joinYear">
              <Input
                onChange={(e) => setJoinYear(e.target.value)}
                value={joinYear}
              />
              {/* {console.log(joinYear)} */}
            </Form.Item>
            <Form.Item label="O/L Year" name="olyear">
              <Input
                value={olyear}
                onChange={(e) => setOlYear(e.target.value)}
              />
              {/* {console.log(olyear)} */}
            </Form.Item>
            <Form.Item label="A/L Year" name="alyear">
              <Input
                value={alyear}
                onChange={(e) => setAlYear(e.target.value)}
              />
              {/* {console.log(alyear)} */}
            </Form.Item>
            <Form.Item label="Games & Activities" name="games">
              <Select
                value={games}
                mode="multiple"
                size={size}
                placeholder="Please select"
                onChange={(value) => {
                  setGames(value);
                }}
                style={{
                  width: "100%",
                }}
                options={options}
              />
            </Form.Item>
            <Form.Item label="Interest" name="interest">
              <Select
                value={interest}
                mode="multiple"
                size={size}
                placeholder="Please select"
                onChange={(value) => {
                  setInterest(value);
                }}
                style={{
                  width: "100%",
                }}
                options={options}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ModelJohnians;
