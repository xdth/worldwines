import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchResult from '../pages/SearchResult';
import Wines from '../pages/Wines';
import Countries from '../pages/Countries';
import Varieties from '../pages/Varieties';
import Wineries from '../pages/Wineries';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SearchResult />} />
    <Route path="/wines" element={<Wines />} />
    <Route path="/countries" element={<Countries />} />
    <Route path="/varieties" element={<Varieties />} />
    <Route path="/wineries" element={<Wineries />} />
  </Routes>
);

export default AppRoutes;