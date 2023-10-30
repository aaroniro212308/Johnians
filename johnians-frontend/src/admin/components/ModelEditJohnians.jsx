import React, { useEffect, useState } from "react";
import { Form, Input, Modal, DatePicker, Select } from "antd";
import moment from "moment";
const ModelEditJohnians = ({
  isEditModalOpen,
  handleEditCancel,
  handleEditOk,
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
  editModalData,
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
  const [form] = Form.useForm();
  useEffect(() => {
    if (isEditModalOpen && editModalData) {
      const validDate = editModalData.bod ? moment(editModalData.bod) : null;

      // This sets the form values when the modal is opened and 'editModalData' is available
      form.setFieldsValue({
        id: editModalData._id,
        fname: editModalData.fname,
        lname: editModalData.lname,
        nic: editModalData.nic,
        bod: validDate,
        admissionNo: editModalData.admissionNo,
        contactNo: editModalData.contactNo,
        email: editModalData.email,
        joinYear: editModalData.joinYear,
        olyear: editModalData.olyear,
        alyear: editModalData.alyear,
        games: editModalData.games,
        interest: editModalData.interest,

        // ... other fields
      });
      console.log(editModalData._id);
    }
  }, [isEditModalOpen, editModalData, form]);

  return (
    <>
      <div>
        {isEditModalOpen && editModalData && (
          <Modal
            title="Johnian Edit"
            open={isEditModalOpen}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
          >
            <Form
              form={form}
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
              <Form.Item label="Firstname" name="fname">
                <Input
                  value={fname}
                  placeholder="firstname"
                  onChange={(e) => setFname(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Lastname" name="lname">
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
                />
                {/* {console.log(bod)} */}
              </Form.Item>
              <Form.Item label="Nic" name="nic">
                <Input value={nic} onChange={(e) => setNic(e.target.value)} />
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
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  onChange={(value)=>{setGames(value)}}
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
                  onChange={(value)=>{setInterest(value)}}
                  style={{
                    width: "100%",
                  }}
                  options={options}
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ModelEditJohnians;
