import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Popconfirm, Table, message } from "antd";
import ModelPayments from "./ModelPayments";
import axios from "axios";
import moment from "moment";
import ModelEditPayments from "./ModelEditPayments";

const PaymentTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [fullname, setFullName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [upload, setUpload] = useState("");
  const [payDate, setPayDate] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [modaldata, setmodaldata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //edit model data
  const [editModalData, setEditModalData] = useState(null);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // const [editModalData, setEditModalData] = useState(null);

  //get all payment data dilu
  async function getPaymentList() {
    try {
      // Make a request to the backend
      const response = await axios.get("http://localhost:3008/api/payments");
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  // Function to execute the data retrieval and log the data
  async function getAllPayments() {
    const paymentsData = await getPaymentList();
    if (paymentsData) {
      console.log("Payments Data:", paymentsData);
      setData(paymentsData);
    } else {
      console.log("Error retrieving payments data");
    }
  }

  useEffect(() => {
    getAllPayments();
  }, []);

  // Row Edit cancel
  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = async (key) => {
    try {
      console.log("Deleting payment record with key:", key);

      const response = await axios.delete(
        `http://localhost:3008/api/payments/${key}`
      );

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);

        message.success("Payment record deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response.status === 404) {
        // Handle the case where the payment record was not found
        message.error("Payment record not found");
      } else {
        message.error("Failed to delete payment record");
      }
    } catch (error) {
      console.error("There was an error deleting the payment record:", error);
      message.error("Error deleting payment record");
    }
  };
  //handle add payments
  const handleAdd = async () => {
    // Start with form validation before proceeding
    if (!fullname || !membershipId || !amount || !paymentMethod || !payDate) {
      message.error("All fields are required!");
      return;
    }

    try {
      setIsLoading(true); // Indicates the start of the process

      const newPayment = {
        fullname,
        membershipId,
        amount,
        paymentMethod,
        upload,
        payDate,
      };

      // API interaction starts here
      const response = await axios.post(
        "http://localhost:3008/api/payments",
        newPayment
      );
      console.log(newPayment);

      console.log("Server Response:", response.data);

      form.resetFields(); // Clear the form fields
      setIsModalOpen(false); // Close the submission modal
      setIsLoading(false); // Revert the loading state
      getAllPayments(); // Update the UI with the latest data
      message.success("Payment record added successfully");
    } catch (error) {
      console.error("There was an error sending the request!", error);
      message.error("Failed to update payment record");
      setIsLoading(false); // Revert the loading state in case of an error
    }
  };

  //model handles
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (event) => {
    setIsModalOpen(false);
    handleAdd(event);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //model handles
  const showEditModal = (record) => {
    setEditModalData(record);
    console.log(record);
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    setIsModalOpen(false);
    const itemId = editModalData._id;
    handleEdit(itemId);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  // Handle Edit Johnians
  const handleEdit = async (itemId) => {
    try {
      setIsLoading(true); // Set the loading state

      // First, retrieve the current Johnian data. Assuming 'data' is your state holding all Johnians.
      const currentPayments = data.find((item) => item._id === itemId); // Please ensure correct ID reference

      if (!currentPayments) {
        message.error("The Johnian record was not found!");
        setIsLoading(false);
        return;
      }

      // Validate if essential fields are available
      // ... (validation logic here)
      // Prepare the updated Johnian object
      const updatedPayments = {
        ...currentPayments, // spreading current Johnian data to maintain other fields
        fullname: fullname || currentPayments.fullname, // if no new fname, the old one will remain
        membershipId: membershipId || currentPayments.membershipId,
        amount: amount || currentPayments.amount,
        paymentMethod: paymentMethod || currentPayments.paymentMethod,
        upload: upload || currentPayments.upload,
        payDate: payDate || currentPayments.payDate,

        // other fields follow the same pattern...
        // This ensures that only fields that were changed are updated,
        // while others remain the same as they were.
      };

      // Send a PUT request to the API to update the specific Johnian
      const response = await axios.put(
        `http://localhost:3008/api/payments/${itemId}`,
        updatedPayments
      );

      if (response.status === 200) {
        console.log("Server Response:", response.data);
        message.success("Johnians record updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        // handle successful response...
      } else {
        console.error("Server responded with status code:", response.status);
        // handle errors...
        message.error("Failed to Update johnians record");
      }
    } catch (error) {
      console.error("There was an error sending the request!", error);
      // handle errors...
      message.error("Error updating johnians record");
    } finally {
      setIsLoading(false); // Revert the loading state in all cases
    }
  };
  //image preview
  const handlePreview = (imageUrl) => {
    setCurrentImage(imageUrl);
    setPreviewVisible(true);
  };

  //column data
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      width: "2%",
      editable: true,
    },
    {
      title: "MemebershipId",
      dataIndex: "membershipId",
      width: "2%",
      editable: true,
    },

    {
      title: "Paid Date",
      dataIndex: "payDate",
      width: "1.5%",
      editable: true,
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD"); // Adjust the format as needed
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      width: "1%",
      editable: true,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      width: "1.5%",
      editable: true,
    },
    {
      title: "Slipt",
      dataIndex: "upload",
      width: "1%",
      editable: true,
      render: (text, record) => (
        <img
          src={record.upload}
          alt={record.name}
          style={{ width: "100px", height: "100px" }}
          onClick={() => handlePreview(record.upload)}
        />
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "2%",
      render: (_, record) => {
        return (
          <div className="operationspay">
            <Button
              onClick={() => showEditModal(record)}
              className="btnpay edit-btn"
            >
              Edit
            </Button>

            <Popconfirm
              title="Sure"
              onConfirm={() => handleDelete(record._id)}
              className="btnpay delete-btn"
            >
              <span>Delete</span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // Handler for row selection, which opens the modal
  const onRowClick = (record) => {
    setSelectedRow(record); // save selected row data in state
    setmodaldata(record);
  };

  return (
    <>
      <Form form={form} component={false}>
        <ModelPayments
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          setFullName={setFullName}
          setMembershipId={setMembershipId}
          setPaymentMethod={setPaymentMethod}
          setUpload={setUpload}
          setAmount={setAmount}
          setPayDate={setPayDate}
          fullname={fullname}
          membershipId={membershipId}
          amount={amount}
          paymentMethod={paymentMethod}
          upload={upload}
          payDate={payDate}
        />
        <ModelEditPayments
          isEditModalOpen={isEditModalOpen}
          handleEditCancel={handleEditCancel}
          handleEditOk={handleEditOk}
          setFullName={setFullName}
          setMembershipId={setMembershipId}
          setPaymentMethod={setPaymentMethod}
          setUpload={setUpload}
          setAmount={setAmount}
          setPayDate={setPayDate}
          fullname={fullname}
          membershipId={membershipId}
          amount={amount}
          paymentMethod={paymentMethod}
          upload={upload}
          payDate={payDate}
          editModalData={editModalData}
        />
        <Modal
          visible={previewVisible}
          title="Image Preview"
          footer={null} // No footer buttons
          onCancel={() => setPreviewVisible(false)} // Close modal upon cancellation
        >
          <img alt="Preview" style={{ width: "100%" }} src={currentImage} />
        </Modal>
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
          className="btn add-btn"
        >
          Add Payment
        </Button>
        <Table
          columns={columns}
          bordered
          dataSource={data}
          rowClassName="editable-row"
          pagination={{
            position: ["bottomLeft"],
            onChange: cancel,
          }}
          scroll={{
            y: 525,
          }}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
        />
      </Form>
    </>
  );
};

export default PaymentTable;
