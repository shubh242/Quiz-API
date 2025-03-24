import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizList from './pages/QuizList';
import CreateQuiz from './pages/CreateQuiz';
import AddQuestion from './pages/AddQuestion';
import QuizDetail from './pages/QuizDetails';
import EditQuestion from './pages/EditQuestion'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
            <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
            <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizDetail /></ProtectedRoute>} />
            <Route path="/quiz/:quizId/add-question" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
            <Route path="/quiz/:questionId/edit-question" element={<ProtectedRoute><EditQuestion /></ProtectedRoute>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
