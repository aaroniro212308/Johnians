import { Result} from "antd";
import React from "react";

const NotFound = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#f7f7f7", 
          width: "100%",
          height: "100vh", 
          display: "flex",
          flexDirection: "column", 
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      </div>
    </>
  );
};

export default NotFound;
