import React, { Component } from 'react';
import Home from './HomeComponent';
import Accommodation from './AccomodationComponent';
import Services from './ServicesComponent';
import MeetingEvent from './MeetingEventComponent';
import Restaurant from './RestaurantComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// Animation
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Main extends Component {
    // do componentDidMout here end get fetchData from props

    render() {
        // 
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route exact path="/accommodations" component={Accommodation} />
                            <Route exact path="/services" component={Services} />
                            <Route exact path="/events" component={MeetingEvent} />
                            <Route exact path="/restaurant" component={Restaurant} />
                            <Route exact path="/contact" component={Contact} />
                            <Route exact path="/about" component={About} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default Main;