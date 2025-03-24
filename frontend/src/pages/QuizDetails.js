import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import NavBar from '../utils/navbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Card, CardContent, List, Typography } from '@mui/material';

const QuizDetail = () => {
  const [quiz, setQuiz] = useState(null);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        console.log(quizId);
        const res = await axios.get(`http://127.0.0.1:8000/quiz/quizzes/?quizId=${quizId}`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        console.log(JSON.stringify(res.data));
        setQuiz(res.data);
      } catch (error) {
        console.error('Error fetching quiz details', error);
      }
    };
    fetchQuizDetails();
  }, [quizId]);

  const handleDelete = async (e, question_id) => {
    e.preventDefault();
    
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/quiz/questions/?question_id=${question_id}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
  
      console.log("Deleted Successfully:", res.data);
  
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: prevQuiz.questions.filter(q => q.id !== question_id),
      }));
    } catch (error) {
      console.error("Error deleting question:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (e, question_id) => {
    e.preventDefault();
    navigate(`/quiz/${question_id}/edit-question`)
  }

  return (
    <div>
        <NavBar />
      {quiz ? (
        <>
        <Card sx={{display: 'flex', mx: 'auto', width: '90%', my: '2%', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{mx: 5, my: 1}} variant='h5'>{quiz.title}</Typography>
          {
            quiz.description && <Typography sx={{mx: 10}} variant='body'>Description: {quiz.description}</Typography>
          }
          
            <Button sx = {{width: '15%',margin:'auto', my: 2}} variant='contained' onClick={() => navigate(`/quiz/${quizId}/add-question`)}>Add Question</Button>
        </Card>  
          <List sx={{display: 'flex', mx: 'auto', width: '90%', my: '2%', flexDirection: 'column'}}>
          <Typography variant='h6'> QUESTIONS </Typography>
            {quiz.questions.map((question, index) => (
              <>
              <Card sx={{display: 'flex', mx: 'auto', width: '90%', my: '2%', flexDirection: 'column', gap: 1 }}>
                <CardContent>
                  <Typography variant='subtitle1'>{index+1}. {question.question}</Typography>
                  <FormControl>
                    <div sx={{display: 'inline-flex'}}>
                      <FormLabel>Options</FormLabel>
                      <Button onClick={(e) => handleDelete(e, question.id)}>DELETE</Button>
                      <Button onClick={(e) => handleEdit(e, question.id)}>EDIT</Button>
                    </div>
                      
                    <RadioGroup>
                      <FormControlLabel value={question.option1} control={<Radio />} label={question.option1} />
                      <FormControlLabel value={question.option2} control={<Radio />} label={question.option2} />
                      <FormControlLabel value={question.option3} control={<Radio />} label={question.option3} />
                      <FormControlLabel value={question.option4} control={<Radio />} label={question.option4} />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              </>
            ))}
          </List>
        </>
      ) : (
        <Typography variant='body'>Loading quiz details...</Typography>
      )}
    </div>
  );
};

export default QuizDetail;
