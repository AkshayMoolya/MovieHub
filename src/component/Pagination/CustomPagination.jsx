import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Pagination } from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const CustomPagination = ({ setPage, numOfPages }) => {
  const handlePageChange = (value) => {
    setPage(value);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {" "}
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => {
            handlePageChange(e.target.textContent);
          }}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>
      <span style={{ marginTop: "15px" }}>Made with 💚 by Akshay</span>
    </div>
  );
};

export default CustomPagination;
