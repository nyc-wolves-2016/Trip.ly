class Event extends React.Component {
  render() {
    let { name, location, details, contact_info, date, start_time, end_time } = this.props.data;
    return(
      <li>
        <p>Name: {name}</p>
        <ul>
          <li>
            Date: {date}
          </li>
          <li>
            Details: {details}
          </li>
          <li>
            Start Time: {start_time}
          </li>
        </ul>
      </li>
    )
  }
}
