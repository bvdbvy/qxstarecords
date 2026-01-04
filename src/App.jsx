import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Releases from "./pages/Releases";
import Press from "./pages/Press";

import RequireAdmin from "./admin/RequireAdmin";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminArtists from "./admin/AdminArtists";
import AdminAddArtist from "./admin/AdminAddArtist";
import AdminEditArtist from "./admin/AdminEditArtist";
import AdminReleases from "./admin/AdminReleases";
import AdminAddRelease from "./admin/AdminAddRelease";
import AdminEditRelease from "./admin/AdminEditRelease";
import AdminSubmissions from "./admin/AdminSubmissions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC SITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/press" element={<Press />} />
        </Route>

        {/* ADMIN AUTH */}
        <Route path="/admin/auth" element={<AdminLogin />} />

        {/* ADMIN (PROTECTED) */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="artists" element={<AdminArtists />} />
          <Route path="artists/new" element={<AdminAddArtist />} />
          <Route path="artists/edit/:id" element={<AdminEditArtist />} />

          <Route path="releases" element={<AdminReleases />} />
          <Route path="releases/new" element={<AdminAddRelease />} />
          <Route path="releases/edit/:id" element={<AdminEditRelease />} />

          <Route path="submissions" element={<AdminSubmissions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;