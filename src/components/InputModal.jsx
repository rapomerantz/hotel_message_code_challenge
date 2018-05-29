import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      this.props.handleSubmit(this.state.newMessage, this.state.title)
      this.setState({
        newMessage: '',
        title: ''
      })
      this.handleClose();    
  }

  render() {
    return (
      <div>
        <Button variant="raised"  onClick={this.handleClickOpen}>Add New Message</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Want to enter a new message? Simply type it below, replacing key terms in the following format: </DialogTitle>
          <DialogContent>
            <DialogContentText>
                Welcome to sunny <strong>hotelCity, guestFirstName</strong>!
                we hope you're enjoying your stay in <strong>guestRoomNumber</strong>.
                Give us a call if you need anything! 
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              onChange={this.handleNewMessage}
            />
            <TextField
              autoFocus
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
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}