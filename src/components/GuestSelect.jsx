import React, { Component } from 'react'

import GuestJson from '../providedData/Guests.json'

export default class GuestSelect extends Component {

    formatTimeStamp = (timestamp) => {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(timestamp*1000);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        let seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        // Return timestamp in new format
        return formattedTime
    }

  render() {


    let guestSelectOptions = GuestJson.map((guest => {
        // console.log('startTimeStamp', this.reformatTimeStamp(guest.reservation.startTimestamp));

        let startTimestamp = this.formatTimeStamp(guest.reservation.startTimestamp);
        let endTimestamp = this.formatTimeStamp(guest.reservation.endTimestamp);

        return <option value={guest.id}>
                    {guest.firstName} {guest.lastName}, Room: {guest.reservation.roomNumber} - 
                    Start: {startTimestamp} - End: {endTimestamp}
                </option>
    }))
    


    return (
      <div>

        <select name="guesSelect" id="guestSelect">
          {guestSelectOptions}
        </select>   

      </div>
    )
  }
}
