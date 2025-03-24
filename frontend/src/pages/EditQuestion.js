import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import NavBar from '../utils/navbar';
import { Box, Button, Input, List, ListItem, Typography, TextareaAutosize, Checkbox, FormControl } from '@mui/material';

const AddQuestion = () => {
  const [question, setQuestion] = useState({ text: '', choices: [{ text: '', is_correct: false }] });
  const { questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        console.log(questionId);
        const res = await axios.get(`http://127.0.0.1:8000/quiz/questions/?question_id=${questionId}`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        console.log(JSON.stringify(res.data));
        let data = {
            text: res.data[0].question,
            quizId: res.data[0].quizId,
            choices: [
                {text: res.data[0].option1, is_correct:false},
                {text: res.data[0].option2, is_correct:false},
                {text: res.data[0].option3, is_correct:false},
                {text: res.data[0].option4, is_correct:false},
            ]
        };
        data.choices.forEach((data) => {
            if(data.text === res.data[0].correctOption)
                data.is_correct = true
        });
        
        console.log(data)
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching quiz details', error);
      }
    };
    fetchQuestionDetails();
  }, [questionId]);

  const handleInputChange = (e, index, field) => {
    const updatedChoices = [...question.choices];
    console.log(index, field, updatedChoices)
    if(field === 'is_correct'){
        if(updatedChoices[index][field] === 'on')
            updatedChoices[index][field] = false;
        else
            updatedChoices[index][field] = 'on';     
    }else
            updatedChoices[index][field] = e.target.value;
    setQuestion({ ...question, choices: updatedChoices });
  };

  const removeChoice = () => {

  }

  const addChoice = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(question.quizId)
    try {
      let data = {
        questionId: questionId,
        question : question.text,
        quizId : question.quizId,
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
      await axios.put(
        `http://127.0.0.1:8000/quiz/questions/?question_id=${questionId}`,
        data,
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      navigate(`/quiz/${question.quizId}`);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Typography sx={{ mx: 2, my: 2 }} variant="h5">
        Edit Question
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          mx: "auto",
          width: 500,
          my: "10%",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl variant="filled">
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Question
        </Typography>

          <TextareaAutosize
            minRows={5}
            minLength={255}
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            required
          />
        </FormControl>

        <List>
          {question.choices.map((choice, index) => (
            <ListItem key={index}>
              <FormControl variant="filled">
                <Input
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleInputChange(e, index, "text")}
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

        {question.choices.length !== 4 && (
          <Button variant="contained" type="button" onClick={addChoice}>
            Add Choice
          </Button>
        )}

        <Button variant="contained" type="submit">
          Save Question
        </Button>
      </Box>
    </div>
  );
};

export default AddQuestion;
