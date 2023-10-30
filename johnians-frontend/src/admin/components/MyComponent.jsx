import React, { useState } from "react";
import { Drawer, Form, Input, Button } from "antd";

const MyComponent = ( {setMailVisible,mailVisible}) => {
  // const [mailVisible, setMailVisible] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const handleEmailFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3008/send-email", {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(emailData),
    
      });
      console.error(emailData);
     

      if (response.status === 200) {
        console.log("Email sent successfully");
        setMailVisible(false);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
     
    }
    
  };

  return (
    <div>
      <Drawer
        title="Mail"
        placement="left"
        visible={mailVisible}
        onClose={() => setMailVisible(false)}
      >
        <Form layout="vertical" onFinish={handleEmailFormSubmit}>
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
            <Input
              placeholder="Receiver's Email"
              onChange={(e) =>
                setEmailData({ ...emailData, to: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item name="subject" label="Subject">
            <Input
              placeholder="Email Subject"
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Your Message"
              onChange={(e) =>
                setEmailData({ ...emailData, message: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default MyComponent;
