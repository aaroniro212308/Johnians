import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Space,
  Drawer,
  message,
} from "antd";
import ModelJohnians from "./ModelJohnians";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { MailOutlined, SearchOutlined } from "@ant-design/icons";
import { loogo } from "../../data/data";
import moment from "moment";
import ModelEditJohnians from "./ModelEditJohnians";
import html2canvas from "html2canvas";
import MyComponent from "./MyComponent";
// import MyComponent from "./MyComponent";
// import nodemailer from "nodemailer";



const JohniansTable = () => {
  
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modaldata, setmodaldata] = useState([]);
  const [editModalData, setEditModalData] = useState(null);
  //drawer
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  //data
  const [data, setData] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [nic, setNic] = useState("");
  const [bod, setBod] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [joinYear, setJoinYear] = useState("");
  const [olyear, setOlYear] = useState("");
  const [alyear, setAlYear] = useState("");
  const [games, setGames] = useState([]);
  const [interest, setInterest] = useState([]);
  //mail
  const [mailVisible, setMailVisible] = useState(false);

  //drawer */
  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //search bar start-------------
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //search end-----------

  //handle get all johnians data aron anna
  async function getJohniansList() {
    try {
      // Make a request to the backend
      const response = await axios.get("http://localhost:3008/api/johnians");

      // Access and return the data from the response
      const data = response.data;
      return data;
    } catch (error) {
      // Handle the error in case the request fails
      console.error("Error fetching data: ", error);
      return null; // or handle error more appropriately depending on your setup
    }
  }

  // Function to execute the data retrieval and log the data
  async function getAllJohnians() {
    const johniansData = await getJohniansList();
    if (johniansData) {
      // console.log("Johnians Data:", johniansData);
      setData(johniansData);
    } else {
      console.log("Error retrieving Johnians data");
    }
  }

  useEffect(() => {
    getAllJohnians();
  }, []);

  // Row Edit cancel
  const cancel = () => {
    setEditingKey("");
  };
  // Handle delete Johnians
  const handleDelete = async (key) => {
    try {
      console.log("Deleting johnians record with key:", key);

      const response = await axios.delete(
        `http://localhost:3008/api/johnians/${key}`
      );

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);

        message.success("Johnians record deleted successfully");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response.status === 404) {
        // Handle the case where the payment record was not found
        message.error("Johnians record not found");
      } else {
        message.error("Failed to delete johnians record");
      }
    } catch (error) {
      console.error("There was an error deleting the Johnians record:", error);
      message.error("Error deleting johnians record");
    }
  };

  // Handle Edit Johnians
  const handleEdit = async (itemId) => {
    try {
      setIsLoading(true); // Set the loading state

      // First, retrieve the current Johnian data. Assuming 'data' is your state holding all Johnians.
      const currentJohnian = data.find((item) => item._id === itemId); // Please ensure correct ID reference

      if (!currentJohnian) {
        message.error("The Johnian record was not found!");
        setIsLoading(false);
        return;
      }

      // Validate if essential fields are available
      // ... (validation logic here)
      // Prepare the updated Johnian object
      const updatedJohnian = {
        ...currentJohnian, // spreading current Johnian data to maintain other fields
        fname: fname || currentJohnian.fname, // if no new fname, the old one will remain
        lname: lname || currentJohnian.lname,
        nic: nic || currentJohnian.nic,
        bod: bod || currentJohnian.bod,
        admissionNo: admissionNo || currentJohnian.admissionNo,
        contactNo: contactNo || currentJohnian.contactNo,
        email: email || currentJohnian.email,
        joinYear: joinYear || currentJohnian.joinYear,
        olyear: olyear || currentJohnian.olyear,
        alyear: alyear || currentJohnian.alyear,
        games: games || currentJohnian.games,
        interest: interest || currentJohnian.interest,
        // other fields follow the same pattern...
        // This ensures that only fields that were changed are updated,
        // while others remain the same as they were.
      };

      // Send a PUT request to the API to update the specific Johnian
      const response = await axios.put(
        `http://localhost:3008/api/johnians/${itemId}`,
        updatedJohnian
      );

      if (response.status === 200) {
        console.log("Server Response:", response.data);
        message.success("Johnians record updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);

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

  // Handle Add Johnians
  const handleAdd = async () => {
    if (
      !fname ||
      !lname ||
      !bod ||
      !nic ||
      !admissionNo ||
      !contactNo ||
      !email ||
      !joinYear ||
      !olyear ||
      !alyear ||
      !games ||
      !interest
    ) {
      message.error("All fields are required!");
      return;
    }

    try {
      setIsLoading(true); // Set the loading state

      const lastJohnian = data[data.length - 1];
      let autoIncrement = 1; // Default value if there are no existing Johnians
      if (lastJohnian) {
        // Extract the auto-increment part from the last Johnian's membershipId
        const lastAutoIncrementStr = lastJohnian.membershipId.split("/")[2];
        autoIncrement = parseInt(lastAutoIncrementStr, 10) + 1;
      }
      // Pad the auto-increment to ensure it's always four digits
      const autoIncrementStr = autoIncrement.toString().padStart(4, "0");
      const newJohnians = {
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
        membershipId: `JJCC/${joinYear}${alyear}/${autoIncrementStr}`,
      };

      // Send a POST request to the API to add the new payment
      const response = await axios.post(
        "http://localhost:3008/api/johnians",
        newJohnians
      );

      // console.log(newJohnians);
      if (response.status === 200) {
        console.log("Server Response:", response.data);

        form.resetFields(); // Clear the form fields
        setIsModalOpen(false); // Close the submission modal
        setIsLoading(false); // Revert the loading state

        getAllJohnians(); // Update the UI with the latest data
        message.success("Johnians record added successfully");
      } else {
        console.error("Server responded with status:", response.status);
        message.error("Failed to add Johnians record due to server error");
        setIsLoading(false); // Revert the loading state in case of server error
      }
    } catch (error) {
      console.error("There was an error sending the request!", error);
      message.error("Failed to update johnians record");
      setIsLoading(false); // Revert the loading state in case of an error
    }
  };

  //add model handles
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleAdd();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showEditModal = (record) => {
    setEditModalData(record);
    console.log(record);
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
    const itemId = editModalData._id;
    handleEdit(itemId);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  //column data
  const columns = [
    {
      key: "1",
      title: "Firstname",
      dataIndex: "fname",
      width: "1.5%",
      editable: true,
      ...getColumnSearchProps("fname"),
    },
    {
      key: "2",
      title: "Lastname",
      dataIndex: "lname",
      width: "1.5%",
      editable: true,
      ...getColumnSearchProps("lname"),
    },
    {
      key: "3",
      title: "Date of Birth",
      dataIndex: "bod",
      width: "1.2%",
      editable: true,
      inputType: "date",
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD"); // Adjust the format as needed
      },
    },
    {
      key: "4",
      title: "NIC",
      dataIndex: "nic",
      width: "1.5%",
      editable: true,
      ...getColumnSearchProps("nic"),
    },
    {
      key: "5",
      title: "AdmissionNo",
      dataIndex: "admissionNo",
      width: "2%",
      editable: true,
    },
    {
      key: "6",
      title: "ContactNo",
      dataIndex: "contactNo",
      width: "3%",
      editable: true,
      ...getColumnSearchProps("contactNo"),
    },
    {
      key: "7",
      title: "Email",
      dataIndex: "email",
      width: "3%",
      editable: true,
    },
    {
      key: "8",
      title: "Join year",
      dataIndex: "joinYear",
      width: "1.2%",
      editable: true,
      render: (text, record) => {
        return moment(text).format("YYYY"); // Adjust the format as needed
      },
    },
    {
      key: "9",
      title: "O/L Year",
      dataIndex: "olyear",
      width: "1.2%",
      editable: true,
      render: (text, record) => {
        return moment(text).format("YYYY"); // Adjust the format as needed
      },
    },
    {
      key: "10",
      title: "A/L Year",
      dataIndex: "alyear",
      width: "1.2%",
      editable: true,
      render: (text, record) => {
        return moment(text).format("YYYY"); // Adjust the format as needed
      },
    },
    {
      key: "11",
      title: "Games & Activities",
      dataIndex: "games",
      width: "3%",
      editable: true,
    },
    {
      key: "12",
      title: "Interest",
      dataIndex: "interest",
      width: "3%",
      editable: true,
    },
    {
      key: "13",
      title: "MemebershipId",
      dataIndex: "membershipId",
      width: "2%",
      // editable: true,
    },
    {
      key: "14",
      title: "operation",
      dataIndex: "operation",
      width: "2.5%",
      render: (_, record) => {
        return (
          <div className="operations">
            <Button
              onClick={() => showEditModal(record)}
              className="btn edit-btn"
            >
              Edit
            </Button>
            {console.log(record._id)}

            <Popconfirm
              title="Sure"
              onConfirm={() => handleDelete(record._id)}
              className="btn delete-btn"
            >
              <span>Delete</span>
            </Popconfirm>
            <Button
              title="Sure to delete?"
              onClick={() => setMailVisible(true)}
              className="btnpay mail-btn"
            >
              <MailOutlined className="mail-icon" />
              <span className="mail-text">Mail</span>
            </Button>
            <Button
              title="Sure to delete?"
              onClick={() => handleCard(record)}
              className="btnpay mail-btn"
            >
              <span className="mail-text">Card</span>
            </Button>
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
  //print row
  const handleCard = (record) => {
    // const newData = data.filter((item) => item.key !== key);
    console.log(record);
    showLargeDrawer();
  };

  //download card
  const handleDownload = async () => {
    const cardElement = document.getElementById("card-johnian");

    // Convert the card to a canvas
    const canvas = await html2canvas(cardElement);

    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "membership_card.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


 
  
  return (
    <>
      <Form form={form} component={false}>
        <ModelJohnians
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          setFname={setFname}
          setLname={setLname}
          setBod={setBod}
          setNic={setNic}
          setAdmissionNo={setAdmissionNo}
          setContactNo={setContactNo}
          setEmail={setEmail}
          setJoinYear={setJoinYear}
          setOlYear={setOlYear}
          setAlYear={setAlYear}
          setGames={setGames}
          setInterest={setInterest}
          setMembershipId={setMembershipId}
          fname={fname}
          lname={lname}
          bod={bod}
          nic={nic}
          admissionNo={admissionNo}
          contactNo={contactNo}
          email={email}
          joinYear={joinYear}
          olyear={olyear}
          alyear={alyear}
          games={games}
          interest={interest}
          membershipId={membershipId}
        />

        <ModelEditJohnians
          isEditModalOpen={isEditModalOpen}
          handleEditCancel={handleEditCancel}
          handleEditOk={handleEditOk}
          setFname={setFname}
          setLname={setLname}
          setBod={setBod}
          setNic={setNic}
          setAdmissionNo={setAdmissionNo}
          setContactNo={setContactNo}
          setEmail={setEmail}
          setJoinYear={setJoinYear}
          setOlYear={setOlYear}
          setAlYear={setAlYear}
          setGames={setGames}
          setInterest={setInterest}
          setMembershipId={setMembershipId}
          fname={fname}
          lname={lname}
          bod={bod}
          nic={nic}
          admissionNo={admissionNo}
          contactNo={contactNo}
          email={email}
          joinYear={joinYear}
          olyear={olyear}
          alyear={alyear}
          games={games}
          interest={interest}
          membershipId={membershipId}
          editModalData={editModalData}
        />

        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
          className="btn add-btn"
        >
          Add Johnians
        </Button>
        <Table
          columns={columns}
          bordered
          dataSource={data}
          // columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            position: ["bottomLeft"],
            onChange: cancel,
          }}
          scroll={{
            y: 490,
          }}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}

          // rowKey={(record)=>{record}}
        />
      </Form>
      <Drawer
        title="Membership Card"
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Form>
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: "flex",
            }}
          >
            {/* card */}
            <div className="card-johnian" id="card-johnian">
              <div className="card-title">
                <h3>Jaffna Johnians sports club</h3>
              </div>

              <div className="card-details">
                <img src={loogo} alt="logos" width="100px" />
                <div className="card-john">
                  <span className="label">
                    Fullname:{" "}
                    <span className="label-content">
                      {modaldata.fname + " " + modaldata.lname}
                    </span>
                  </span>
                  <span className="label">
                    NIC: <span className="label-content">{modaldata.nic}</span>
                  </span>
                  <span className="label">
                    Date of Birth:{" "}
                    <span className="label-content">
                      {moment(modaldata.bod).format("YYYY-MM-DD")}
                    </span>
                  </span>
                  <span className="label">
                    MembershipId:{" "}
                    <span className="label-content">
                      {modaldata.membershipId}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/* card end */}
          </Space>
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={handleDownload}>
                {" "}
                {/* <-- Add your Download Button here */}
                Download
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>
     {/*  <Drawer
        title="Mail"
        placement="left"
        size={size}
        onClose={() => setMailVisible(false)}
        visible={mailVisible}
      >
        <Form layout="vertical">
          <Form.Item
            name="to"
            label="To"
            rules={[
              {
                required: true,
                message: "Please input the receiver's email!",
              },
            ]}
          >
            <Input placeholder="Receiver's Email" />
          </Form.Item>
          <Form.Item name="subject" label="Subject">
            <Input placeholder="Email Subject" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea rows={4} placeholder="Your Message" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={onSubmitMail}
            >
              Send Email
            </Button>
          </Form.Item>
        </Form>
     
      </Drawer> */}
      <MyComponent
      mailVisible={mailVisible}
      setMailVisible={setMailVisible}/>
    </>
  );
};

export default JohniansTable;
