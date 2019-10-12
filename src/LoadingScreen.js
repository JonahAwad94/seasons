import React from 'react';

const Loading = (props) => {
    return (
        <div className= "ui active dimmer">
            <div className="ui big text loader">
                {props.message}
            </div>
        </div>
    );
};

// If no message prop provided, message will default to 'Loading...'
// Useful for reusable components
Loading.defaultProps = {
    message: 'Loading...'
};

export default Loading;