import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import NavBar from '../utils/navbar';
import { Box, Card, List, ListItem, ListItemText, Typography } from '@mui/material';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/quiz/quizzes/', {
          headers: { Authorization: `Bearer ${getAuthToken()}` }
        });
        setQuizzes(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching quizzes', error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <NavBar />
      <Box sx={{display: 'flex', mx: 'auto', width: '90%', my: '2%', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h5'>Quizzes</Typography>
          <List>
            {quizzes.map((quiz) => (
              <Card sx={{display: 'flex', mx: 'auto', width: '90%', my: '2%', flexDirection: 'column', gap: 2 }}>
                  <ListItem key={quiz.id} sx={{ width: 'auto' }} button onClick={() => navigate(`/quiz/${quiz.id}`)}>
                    <ListItemText primary={quiz.title} />
                    <ListItemText primary={quiz.description} />
                  </ListItem>
              </Card>
            ))}
          </List>
      </Box>
    </div>
  );
};

export default QuizList;
