import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import '../App.css'

class Checklist extends React.Component {
  state = {
    checked: [], //No box checked by default 
  };

  handleToggle = element => () => {
    let checkListName = this.props.name
    this.setState({
      checked: [element],
    });
    this.props.handleChange(element, checkListName); 
  };

  render() {

    return (
      <div className="checkListContainer">

        <List>
        {this.props.jsonInput.map(element => (
          <ListItem
            key={element.id}
            button
            dense
            onClick={this.handleToggle(element)}
            value={element.id}
            disableRipple
          >
            <Checkbox
                checked={this.state.checked.indexOf(element) !== -1}
                tabIndex={-1}
                disableRipple
            />
            {/* Dynamically setting list item text based on tag props passed down from parent */}
            {/* Different contents require different spacing - passed down from parent as well */}
            <ListItemText primary={element[this.props.tag1] + this.props.space + element[this.props.tag2]} /> 
            
          </ListItem>
        ))}
    </List>

      </div>
    );
  }
}


export default Checklist;