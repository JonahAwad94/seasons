import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loading from './LoadingScreen';

class App extends React.Component{
    // Specific to JavaScript, not react
    // Recommended not to do data loading in constructor,
    // do in componentDidMount instead
    constructor(props){
        super(props); // Reference to Parent's constructor -- must be called 

        this.state = { lat: null, errorMessage: '' };
    }

    // Alternatively to using 'constructor(props),' simply write:
    // state = { lat: null, errorMessage: ' ' };

    componentDidMount(){
        // get location
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude}),
                // never write 'this.state.lat = position.coords.latitude'
                // -- only ever do direct assignment in initialization
            (err) => this.setState({ errorMessage: err.message})
        );        
    }

    // Helper function, avoids multiple return statements in render method
    // Easier to wrap everything in render with a common element
    renderContent(){
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Loading message="Please accept location request"/>;
    }

    // Render is required
    // componentDidMount, componentDidUpdate, componentWillUnmount not required
    // Render is re-run every time 'setState' is called
    // Do not initialize requests in render method as it is called often
    render(){
        return (
            // "Border red" not actually used, just example for wrapping all render contents
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);