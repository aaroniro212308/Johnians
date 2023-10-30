import React, { useEffect } from "react";
import { DatePicker, Form, Input, InputNumber, Modal, Radio } from "antd";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { initializeApp } from "firebase/app";
import moment from "moment";

const ModelEditPayments = ({
  isEditModalOpen,
  handleEditCancel,
  handleEditOk,
  setFullName,
  setMembershipId,
  setPaymentMethod,
  setUpload,
  setAmount,
  setPayDate,
  fullname,
  membershipId,
  amount,
  paymentMethod,
  upload,
  payDate,
  editModalData,
}) => {
  // Initialize Firebase with your project's configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCRsik5Dprl2CDyfEwQrlSnjVq90n21kCM",
    authDomain: "uploadfile-33b73.firebaseapp.com",
    projectId: "uploadfile-33b73",
    storageBucket: "uploadfile-33b73.appspot.com",
    messagingSenderId: "1050045828284",
    appId: "1:1050045828284:web:fa6ba67dd2671d2ab094b9",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const convertToURL = (e) => {
    const file = e.target.files[0];
    const storage = getStorage(firebaseApp); // Get the storage instance

    const storageRef = ref(storage, file.name); // Create a reference to the file

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Image uploaded to Firebase Storage");
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setUpload(downloadURL); // Update the state with the download URL
      });
    });
  };

  const [form] = Form.useForm();
  useEffect(() => {
    if (isEditModalOpen && editModalData) {
      const validDate = editModalData.payDate
        ? moment(editModalData.payDate)
        : null;

      // This sets the form values when the modal is opened and 'editModalData' is available
      form.setFieldsValue({
        fullname: editModalData.fullname,
        membershipId: editModalData.membershipId,
        payDate: validDate,
        amount: editModalData.amount,
        paymentMethod: editModalData.paymentMethod,
        upload: editModalData.upload,
        // payDate:editModalData.validDate,

        // ... other fields
      });
    }
  }, [isEditModalOpen, editModalData, form]);

  return (
    <>
      <div>
        {isEditModalOpen && editModalData && (
          <Modal
            open={isEditModalOpen}
            title="Payment Edit"
            visible={isEditModalOpen} // Change 'open' to 'visible'
            onOk={handleEditOk}
            onCancel={handleEditCancel}
          >
            <Form
              form={form}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item label="Fullname" name="fullname">
                <Input
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="MembershipId" name="membershipId">
                <Input
                  value={membershipId}
                  onChange={(e) => setMembershipId(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Payment Date" name="payDate">
                <DatePicker
                  value={payDate}
                  onChange={(date, dateString) => setPayDate(date)}
                />
              </Form.Item>
              <Form.Item label="Amount" name="amount">
                <InputNumber
                  value={amount}
                  onChange={(value) => setAmount(value)}
                />
              </Form.Item>
              <Form.Item label="Payment Method" name="paymentMethod">
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Radio value="cash">Cash</Radio>
                  <Radio value="bank">Bank</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Payment slipt" name="upload">
                {/* If 'upload' is a URL, you can display it */}
                {editModalData.upload && (
                  <img
                    src={editModalData.upload}
                    alt="slipt"
                    style={{ marginBottom: "10px", width: "50%" }}
                  />
                )}

                {/* The file uploader for new files */}
                <input accept="image/*" type="file" onChange={convertToURL} />
              </Form.Item>
              {upload === "" || upload == null ? (
                ""
              ) : (
                <Form.Item label="Preview">
                  <img
                    src={upload}
                    width={50}
                    height={50}
                    alt="slip"
                    style={{
                      marginBottom: "30px",
                      width: "40%",
                      height: "40%",
                    }}
                  />
                </Form.Item>
              )}
            </Form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ModelEditPayments;
