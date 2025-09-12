// App.jsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AddBike from "./components/admin/AddBike.jsx";
import AllBikes from "./components/admin/AllBikes.jsx";
import Users from "./components/admin/Users.jsx";
import Explore from "./components/Explore/explore.jsx";
import BikeSpecs from "./components/bikespecs/BikeSpecs.jsx";
import ContactUs from "./components/ContactUs/contact.jsx";
import AboutUs from "./components/aboutUs/about.jsx";
import Login from "./components/login/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EditBike from "./components/admin/EditBike.jsx";
import EditUser from "./components/admin/EditUser.jsx";
import SearchResults from "./components/search/SearchResults.jsx";
// Blog components
import BlogList from "./components/blog/BlogList.jsx";
import BlogPost from "./components/blog/BlogPost.jsx";
import BlogEditor from "./components/blog/BlogEditor.jsx";
import UserBlogDashboard from "./components/blog/UserBlogDashboard.jsx";

// Home
import Home from "./components/home/Home.jsx";
import Profile from "./components/ProfilePage/profile.jsx";
import AboutSite from "./components/aboutUs/AboutSite.jsx";
// Import the Home component

function App() {
  return (
    <Routes>
      {/* Main Site wrapped in MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
            <Profile />
            <AboutSite />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactUs />
          </MainLayout>
        }
      />
      <Route
        path="/explore"
        element={
          <MainLayout>
            <Explore />
          </MainLayout>
        }
      />
      <Route
        path="/explore/bikespecs/:id"
        element={
          <MainLayout>
            <BikeSpecs />
          </MainLayout>
        }
      />

      {/* Blog Routes */}
      <Route
        path="/blog"
        element={
          <MainLayout>
            <BlogList />
          </MainLayout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <MainLayout>
            <BlogPost />
          </MainLayout>
        }
      />

      <Route
       path="/search"
       element={
         <MainLayout>
           <SearchResults />
         </MainLayout>
        }
      />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <MainLayout>
              <UserDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
     
      <Route
        path="/admin/add-bike"
        element={
          <ProtectedRoute role="admin">
            <AddBike />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/all-bikes"
        element={
          <ProtectedRoute role="admin">
            <AllBikes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-bike/:id"
        element={
          <ProtectedRoute role="admin">
            <EditBike />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/edit-user/:id"
        element={
          <ProtectedRoute role="admin">
            <EditUser />
          </ProtectedRoute>
        }
      />

      {/* Protected Blog Routes */}
      <Route
        path="/blog/edit/:id?"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BlogEditor />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/blog"
        element={
          <ProtectedRoute role="user">
            <MainLayout>
              <UserBlogDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <MainLayout>
            <h1 className="text-center mt-10">404 - Page Not Found</h1>
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
