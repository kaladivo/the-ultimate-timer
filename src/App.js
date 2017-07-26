import React, {Component} from 'react';
import IntroPage from './components/IntroPage';
import TimerScreen from './components/TimerScreen';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

const INTRO_TIME = 5000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showIntro: true}
  }

  componentDidMount() {
    setTimeout(() => this.setState({showIntro: false}), INTRO_TIME);
  }

  render() {
      return <div>
        <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionEnterTimeout={2000}
        transitionAppearTimeout={2000}
        transitionLeaveTimeout={1000}
        >
        {this.state.showIntro ? <IntroPage key="intro" /> : <TimerScreen key="timer"/>}
      </ReactCSSTransitionGroup>
    </div>
  }
}

export default App;
