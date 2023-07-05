import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchResult from '../pages/SearchResult';
// import Article from '../pages/Wine';
import Wines from '../pages/Wines';
import Countries from '../pages/Countries';
import Varieties from '../pages/Varieties';
import Wineries from '../pages/Wineries';
import Wine from '../pages/Wine';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SearchResult />} />
    {/* <Route path="/article" element={<Article />} /> */}
    <Route path="/wines" element={<Wines />} />
    <Route path="/wine/:wineId" element={<Wine />} />
    <Route path="/countries" element={<Countries />} />
    <Route path="/varieties" element={<Varieties />} />
    <Route path="/wineries" element={<Wineries />} />
  </Routes>
);

export default AppRoutes;