import { Routes, Route } from "react-router-dom";

import { Room } from "./pages/Room";
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Erro } from "./pages/ErroPage";

import { AuthContextProvider } from "./context/auth";
import { AdminRoom } from "./pages/Admin";

export function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Erro />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/rooms/new" element={<NewRoom />} />
        <Route path="/admin/rooms/:id" element={<AdminRoom />} />
      </Routes>
    </AuthContextProvider>
  );
}
