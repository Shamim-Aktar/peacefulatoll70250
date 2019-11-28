import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as action from '../action'

import Header from './Header'
const Dashboard=()=><div>Dashboard</div>
const Surveynew=()=><div>Surveynew</div>
const Landing=()=><div>Landing</div>

class App extends Component{
    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/surveys" component={Dashboard}/>
                <Route path="/surveys/new" component={Surveynew}/>
            </div>
            </BrowserRouter>
        </div>
    )
    }
}

export default connect(null, action)(App)