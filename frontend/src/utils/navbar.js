import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { removeAuthToken, isAuthenticated } from './auth'

const NavBar = () => {
    const navItems = {
        'Quiz' : '/create-quiz'
    };

    const navigate = useNavigate();
    const currentURL = window.location.pathname.replace('/', '');

    const handleLogout = () => {
        removeAuthToken();
        navigate('/login');
    }

    const LoggedNav = () => {
        return (
            <List sx={{ display: 'flex', gap: 2 }}>
                {Object.keys(navItems).map((key, index) => (
                    <ListItem key={index} sx={{ width: 'auto' }}>
                        <Button variant='primary' onClick={() => navigate(navItems[key])}>{key}</Button>
                    </ListItem>
                ))}

                <ListItem sx={{ width: 'auto' }}>
                    <Button variant='primary' onClick={handleLogout}>Logout</Button>
                </ListItem>
            </List>
        );
    };

    return (
        <AppBar position="static">
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="inherit" onClick={() => navigate('/')}>
                        <Typography variant="h5" mx={1}>QUIZLET</Typography>
                    </Button>

                    <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                        {currentURL === 'login' && (
                            <Button variant="inherit" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        )}
                        {currentURL === 'register' && (
                            <Button variant="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        )}
                        {isAuthenticated() && <LoggedNav />}
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default NavBar;