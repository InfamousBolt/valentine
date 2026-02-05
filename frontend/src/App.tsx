import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import PreviewPage from './pages/PreviewPage';
import ViewerPage from './pages/ViewerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/create" replace />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
        <Route path="/v/:id" element={<ViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
