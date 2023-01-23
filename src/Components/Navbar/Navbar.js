import { AppBar, Toolbar, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../../images/Logo.png"
import "./styles.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
//This is a Navbar Component

//creating a theme to change text color from white to black 
const theme = createTheme({
    palette:{
        primary:{
            main: "#000000"
        }
    }
})

//Our navbar contains the Alma Better logo and two menu options for Home and My Quizzes Page
//made using MUI Appbar components

export const Navbar= () => {
    return (
        <AppBar position="static" style={{ background: '#FFFFFF' }}>
            <Toolbar sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            justifyContent: "space-between"
            }}>
                <NavLink to="/">
                    <img src={Logo} alt="AlmaBetter-Logo" width='120px' />
                </NavLink>
                <ThemeProvider theme={theme}>
                    <Stack direction='row' spacing= {4}>       
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "activenav" : "navbar")}
                        >
                            Home
                        </NavLink>
          
                        <NavLink
                            to="/my-quizes"
                            className={({ isActive }) => (isActive ? "activenav" : "navbar")}
                        >
                            My Quizzes
                        </NavLink>
                    </Stack>
                </ThemeProvider>   
            </Toolbar>
        </AppBar>
    )
}