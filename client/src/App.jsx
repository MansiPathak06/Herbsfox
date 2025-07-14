import React from "react";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
const user = JSON.parse(localStorage.getItem("user"));
import { BrowserRouter as Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Accounts from "./pages/Accounts";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Blogs from "./pages/Blogs";
import Rawherbs from "./pages/Rawherbs";
import Rumimastagi from "./pages/Rumimastagi";
import Scienceofflavour from "./pages/Scienceofflavour";
import Doshas from "./pages/Doshas";
import Akarkara from "./pages/Akarkara";
import Seedtospice from "./pages/Seedtospice";
import MyAccount from "./pages/MyAccount";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./pages/Footer";
import Paymentpolicy from "./pages/Paymentpolicy";
import Cancellationpolicy from "./pages/Cancellationpolicy";
import Shippingpolicy from "./pages/Shippingpolicy";
import Returnpolicy from "./pages/Returnpolicy";
import Tandcconditions from "./pages/Tandcconditions";
import Privacypolicy from "./pages/Privacypolicy";
import Herbs from "./pages/Herbs";
import Spices from "./pages/Spices";
import Poojaitems from "./pages/Poojaitems";
import Seeds from "./pages/Seeds";


// ----------------Products------------------------
// import Dhooplakdi from "./products/Dhooplakdi";
// import Badiyaaan from "./products/Badiyaaan";
// import Chotipeepal from "./products/Chotipeepal";
// import Dalchini from "./products/Dalchini";
// import Jaiphal from "./products/Jaiphal";
// import Javitri from "./products/Javitri";
// import Ashokchaal from "./products/Ashokchaal";
// import Ashwagandha from "./products/Ashwagandha";
// import Inderjaumeetha from "./products/Inderjaumeetha";
// import Jatmasi from "./products/Jatmasi";
// import Kahujeera from "./products/Kahujeera";
// import Kutki from "./products/Kutki";
// import Safedmusli from "./products/Safedmusli";
// import Shitalchini from "./products/Shitalchini";
// import Akarkara2 from "./products/Akarkara2";
// import Awlaamladry from "./products/Awlamladry";
// import Anantmool from "./products/Anantmool";
// import Babchi from "./products/Babchi";
// import Baibadang from "./products/Baibadang";
// import Chadila from "./products/Chadila";
// import Daruhaldi from "./products/Daruhaldi";
// import Inderjawkadwa from "./products/Inderjawkadwa";
// import Inderyanphal from "./products/Inderyanphal";
// import Isabgolbhusi from "./products/Isabgolbhusi";
// import Kaalijiri from "./products/Kaalijiri";
// import Kalimusli from "./products/Kalimusli";
// import Kondrusukha from "./products/Kondrusukha";
// import Kulanjan from "./products/Kulanjan";
// import Majith from "./products/Majith";
// import Majuhara from "./products/Majuhara";
// import Nagkesar from "./products/Nagkesar";
// import Nirajanphal from "./products/Niranjanphal";
// import Ratanjot from "./products/Ratanjot";
// import Rumimastagi2 from "./products/Rumimastagi2";
// import Sennaleave from "./products/Sennaleave";
// import Shilajeet from "./products/Shilajeet";
// import Sugarbadam from "./products/Sugarbadam";
// import Suranjankadvi from "./products/Suranjankadvi";
// import Kalatil from "./products/Kalatil";
// import Poppyseeds from "./products/Poppyseeds";
// import Flaxseed from "./products/Flaxseed";
// import Chiaseeds from "./products/Chiaseeds";
// import Tilsafed from "./products/Tilsafed";
import SearchResults from "./pages/SearchResults";


import AdminDashboard from "./pages/AdminDashboard.jsx";
import Productdetails from "./pages/Productdetails.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import "react-quill/dist/quill.snow.css";


function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<Blogs />} />

        {/* New dropdown-linked pages */}
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Blogs Page */}
        <Route path="/blogs" element={<Blogs />} />

        <Route path="/Rawherbs" element={<Rawherbs />} />
        <Route path="/Rumimastagi" element={<Rumimastagi />} />
        <Route path="/Scienceofflavour" element={<Scienceofflavour />} />
        <Route path="/Doshas" element={<Doshas />} />
        <Route path="/Akarkara" element={<Akarkara />} />
        <Route path="/Seedtospice" element={<Seedtospice />} />

        {/* New dropdown-linked pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/herbs" element={<Herbs />} />
        <Route path="/spices" element={<Spices />} />
        <Route path="/poojaitems" element={<Poojaitems />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/Footer" element={<Footer />} />

        <Route path="/Paymentpolicy" element={<Paymentpolicy />} />
        <Route path="/Cancellationpolicy" element={<Cancellationpolicy />} />
        <Route path="/Shippingpolicy" element={<Shippingpolicy />} />
        <Route path="/Returnpolicy" element={<Returnpolicy />} />
        <Route path="/Tandcconditions" element={<Tandcconditions />} />
        <Route path="/Privacypolicy" element={<Privacypolicy />} />

        {/* ---------------Pooja items----------------- */}
        {/* <Route path="/products/dhooplakdi" element={<Dhooplakdi />} /> */}

        {/* ---------------spices--------------------- */}
        {/* <Route path="/products/badiyaan" element={<Badiyaaan />} />
        <Route path="/products/chotipeepal" element={<Chotipeepal />} />
        <Route path="/products/dalchini" element={<Dalchini />} />
        <Route path="/products/jaiphal" element={<Jaiphal />} />
        <Route path="/products/javitri" element={<Javitri />} /> */}

        {/* ----------------Herbs-------------------------- */}
        {/* <Route path="/products/Ashokchaal" element={<Ashokchaal />} />
        <Route path="/products/Ashwagandha" element={<Ashwagandha />} />
        <Route path="/products/Inderjaumeetha" element={<Inderjaumeetha />} />
        <Route path="/products/Jatmasi" element={<Jatmasi />} />
        <Route path="/products/Kahujeera" element={<Kahujeera />} />
        <Route path="/products/Kutki" element={<Kutki />} />
        <Route path="/products/Safedmusli" element={<Safedmusli />} />
        <Route path="/products/Shitalchini" element={<Shitalchini />} />
       <Route path="/products/Akarkara" element={<Akarkara2 />} />

        <Route path="/products/Awlamladry" element={<Awlaamladry />} />
        <Route path="/products/Anantmool" element={<Anantmool />} />
        <Route path="/products/Babchi" element={<Babchi />} />
        <Route path="/products/Baibadang" element={<Baibadang />} />
        <Route path="/products/Chadila" element={<Chadila />} />
        <Route path="/products/Daruhaldi" element={<Daruhaldi />} />
        <Route path="/products/Inderjawkadwa" element={<Inderjawkadwa />} />
        <Route path="/products/Inderyanphal" element={<Inderyanphal />} />
        <Route path="/products/Isabgolbhusi" element={<Isabgolbhusi />} />
        <Route path="/products/Kaalijiri" element={<Kaalijiri />} />
        <Route path="/products/Kalimusli" element={<Kalimusli />} />
        <Route path="/products/Kondrusukha" element={<Kondrusukha />} />
        <Route path="/products/Kulanjan" element={<Kulanjan />} />
        <Route path="/products/Majith" element={<Majith />} />
        <Route path="/products/Majuhara" element={<Majuhara />} />
        <Route path="/products/Nagkesar" element={<Nagkesar />} />
        <Route path="/products/Niranjanphal" element={<Nirajanphal />} />
        <Route path="/products/Ratanjot" element={<Ratanjot />} />
        <Route path="/products/Rumimastagi2" element={<Rumimastagi2 />} />
        <Route path="/products/Shilajeet" element={<Shilajeet />} />
        <Route path="/products/Sugarbadam" element={<Sugarbadam />} />
        <Route path="/products/Sennaleave" element={<Sennaleave />} />
        <Route path="/products/Suranjankadvi" element={<Suranjankadvi />} /> */}

        {/* /Product detaiks */}
        <Route path="/products/:slug" element={<Productdetails/>}/>
      

        {/* ----------------------Seeds---------------------- */}
        {/* <Route path="/products/kalatil" element={<Kalatil />} />
        <Route path="/products/Poppyseeds" element={<Poppyseeds />} />
        <Route path="/products/Flaxseed" element={<Flaxseed />} />
        <Route path="/products/Chiaseeds" element={<Chiaseeds />} />
        <Route path="/products/Tilsafed" element={<Tilsafed />} /> */}

        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/search" element={<SearchResults />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </CartProvider>
  );
}

export default App;
