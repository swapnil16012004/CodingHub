import { useContext } from "react";
import { MyContext } from "../../App";
import { Alert } from "@mui/material";

const FlashMessage = () => {
  const context = useContext(MyContext);
  return (
    <div className="flex-container d-flex justify-content-center mt-3">
      {context.flashMessage && (
        <Alert
          severity="success"
          style={{ width: "1050px", fontSize: "medium" }}
        >
          {context.flashMessage}
        </Alert>
      )}
    </div>
  );
};

export default FlashMessage;
