class ShareEvent extends React.Component {

  render() {
    let { name, location, details, contact_info, start_time, end_time, id } = this.props.data;

    return(
      <div>
          <li>
            <p>Name: {name}</p>
            <ul>
              <li>
                Start Time: {start_time}
              </li>
              <li>
                End Time: {end_time}
              </li>
              <li>
                Details: {details}
              </li>
            </ul>
          </li>
      </div>
    )
  }
}
