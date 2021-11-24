import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from '../commons/atoms/Test';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/yo" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
