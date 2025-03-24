import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import { Box, FormControl, FormLabel, Input, Button, Typography, TextareaAutosize } from '@mui/material';
import NavBar from '../utils/navbar';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/quiz/quizzes/', quiz, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating quiz', error);
    }
  };

  return (
    <div>
        <NavBar />
        <Box component="form" onSubmit={handleCreateQuiz} sx={{display: 'flex', mx: 'auto', width: 500, my: '10%', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h4'>Create Quiz</Typography>
            <FormControl>
              <FormLabel htmlFor="title">Title *</FormLabel>
                      <Input
                        type='text'
                        required
                        fullWidth
                        placeholder="Quiz Title"
                        id='title'
                        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                      />
            </FormControl>

            <FormControl>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Description
              </Typography>
                <TextareaAutosize
                  type='textarea'
                  minRows={5}
                  fullWidth
                  placeholder="Description"
                  id='description'
                  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                />
            </FormControl>
            <Button type="submit" fullWidth variant="contained"> Create </Button>
      </Box>
    </div>
  );
};

export default CreateQuiz;
