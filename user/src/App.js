import { BrowserRouter,Routes,Route } from "react-router-dom";
//import productList from "./components/productList";
import ListProduct from "./components/ListProduct";
import AddPhotoProduct from "./components/AddPhotoProduct";
import EditPhotoProduct from "./components/EditPhotoProduct";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ListProduct/>}/> 
    <Route path="add" element={<AddPhotoProduct/>}/> 
    <Route path="edit/:id" element={<EditPhotoProduct/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
