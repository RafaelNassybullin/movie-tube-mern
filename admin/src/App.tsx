import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { GlobalStyle } from "style";
import Admin from "pages/Admin";
import { AddPage } from "pages/AddPage";
import { UpdatePage } from "pages/UpdatePage";
import { useSelector } from "react-redux";
import { isAuthReselect } from "store/selector/authSelector";
import { SponsorLinkPage } from "pages/SponsorLinkPage";

function App() {

  const isAuth = useSelector(isAuthReselect)

  return (
    <BrowserRouter>

      <GlobalStyle />

      <Routes>
       
        <Route path={"/"} element={<Admin />} />
       
        <Route path={"/*"} element={<Navigate to="/" replace />} />

        {isAuth ? (
          <Route path={"/add"} element={<AddPage />} />
        ) : (
          <Route path={"/add"} element={<Navigate to="/" replace />} />
        )}

        {isAuth ? (
          <Route path={"/update/:id"} element={<UpdatePage />} />
        ) : (
          <Route
            path={"/update/:id"}
            element={<Navigate to="/" replace />}
          />
        )}

        {isAuth ? (
          <Route path={"/sponsor"} element={<SponsorLinkPage />} />
        ) : (
          <Route path={"/sponsor"} element={<Navigate to="/" replace />} />
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
