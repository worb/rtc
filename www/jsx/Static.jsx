/**********************************************************\
** Static.jsx                                             **
**                                                        **
** The root node of the Reactor app.                      **
**                                                        **
** Designed and engineered by Worb Corp.                  **
\**********************************************************/

var React = require('react');


var Static = React.createClass({
    getInitialState: function() {
        var staticContent = require('../md/' + this.props.params.slug + '.md')
        return {
            staticContent: staticContent
        }
    },
    render: function(){
        return (
            <div className={"static" + " " + this.props.params.slug}>
                <div dangerouslySetInnerHTML={{__html: this.state.staticContent}} />
            </div>
        );
    }
});

module.exports = Static;
