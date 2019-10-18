import React from 'react';
import Router from './components/router/AppRouter'
import Welcome from './components/pages/welcome/Welcome'

import './App.css';

function App() {


    if (IsLoggedIn()) {
        return LoggedId()
    } else {
        return NoLoggedIn()
    }
}

function IsLoggedIn() {
    var token = localStorage.getItem("usr_token")

    if (token && token != null)
        return true
    else
        return false
}

function LoggedId() {
    return <Router />
}

function NoLoggedIn() {
    
    return <Welcome />
        // return <Login />
}

export default App;