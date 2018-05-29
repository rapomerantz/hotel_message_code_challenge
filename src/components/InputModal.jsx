import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import '../App.css';


export default class FormDialog extends React.Component {
  state = {
    open: false,
    newMessage: '', 
    title: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNewMessage = (event) => {

      this.setState({
          [event.target.id]: event.target.value
      })
    
  }

  handleSubmit = () => {
    if (this.state.newMessage.length > 0 && this.state.title.length > 0) {
      this.props.handleSubmit(this.state.newMessage, this.state.title)
      this.setState({
        newMessage: '',
        title: ''
      })
      this.handleClose();
    }
    else {
      alert('Make sure you fill out both text fields to add a new template')
    }
  }

  render() {
    return (
      <div>
        <Button className="addButton" variant="raised"  onClick={this.handleClickOpen}>Add New Message</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="addTemplate">Want to enter a new message? Simply type it below, replacing key terms in the following format: </DialogTitle>
          <DialogContent>
            <DialogContentText>
                <strong>salutation</strong> to sunny <strong>hotelCity, guestFirstName</strong>!
                we hope you're enjoying your stay in <strong>guestRoomNumber</strong>.
                Give us a call if you need anything! 
                <br/>
                <p>Variable Options:</p>
                <ul>
                  <li>guestFirstName</li>
                  <li>guestLastName</li>
                  <li>guestRoomNumber</li>
                  <li>hotelName</li>
                  <li>hotelCity</li>
                  <li>hotelTimezone</li>
                  <li>salutation</li>
                </ul>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Template Title"
              type="text"
              fullWidth
              onChange={this.handleNewMessage}
            />
            <TextField
              margin="dense"
              id="newMessage"
              label="New Message"
              type="text"
              fullWidth
              onChange={this.handleNewMessage}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}