import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import NavBar from '../utils/navbar';
import { Box, Button, Input, List, ListItem, Typography, TextareaAutosize, InputLabel, FormControl, Checkbox } from '@mui/material';

const AddQuestion = () => {
  const [question, setQuestion] = useState({ text: '', choices: [{ text: '', is_correct: false }] });
  const { quizId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e, index, field) => {
    const updatedChoices = [...question.choices];
    updatedChoices[index][field] = e.target.value;
    setQuestion({ ...question, choices: updatedChoices });
  };

  const addChoice = () => {
    setQuestion({ ...question, choices: [...question.choices, { text: '', is_correct: false }] });
  };

  const removeChoice = (index) => {
    const updatedChoices = question.choices.filter((_, i) => i !== index);
    setQuestion({ ...question, choices: updatedChoices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        quizId: quizId,
        question: question.text,
        option1 : question.choices[0].text,
        option2 : question.choices[1].text,
        option3 : question.choices[2].text,
        option4 : question.choices[3].text,
      }

      question.choices.forEach((options) => {
        if(options.is_correct){
          data['correctOption'] = options.text;
        }
      })
      console.log(data);
      await axios.post(
        `http://127.0.0.1:8000/quiz/questions/`,
        data,
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Typography sx={{mx: 2, my: 2}} variant='h5'>Add Question to Quiz {quizId}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', mx: 'auto', width: 500, my: '10%', flexDirection: 'column', gap: 2 }}>
      <InputLabel color='info' variant='standard'>Question</InputLabel>
      <FormControl>
        <TextareaAutosize
            minRows={5}
            minLength={255}
            value={question.text}
            placeholder='Type the Question here!!'
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            required
          />
        </FormControl>
        <List>
          {question.choices.map((choice, index) => (
            <ListItem key={index}>
              <FormControl>
              <Input
                type="text"
                placeholder={`Choice ${index + 1}`}
                value={choice.text}
                onChange={(e) => handleInputChange(e, index, 'text')}
                required
              />
              </FormControl>
              <Checkbox
                sx={{ mx: 1 }}
                checked={choice.is_correct}
                onChange={(e) => handleInputChange(e, index, "is_correct")}
              />
              <Typography sx={{ mx: 1 }} variant="span">
                Correct
              </Typography>
              <Button sx={{ mx: 1 }} variant="text" type="button" onClick={() => removeChoice(index)}>
                Remove Choice
              </Button>
            </ListItem>
          ))}
        </List>
        {
          question.choices.length !== 4 && <Button variant='contained' type="button" onClick={addChoice}>Add Choice</Button>
        }
        <Button variant='contained' type="submit">Save Question</Button>
      </Box>
    </div>
  );
};

export default AddQuestion;
