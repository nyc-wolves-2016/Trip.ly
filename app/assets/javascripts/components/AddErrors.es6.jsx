class AddErrors extends React.Component {
  render() {
    let { errors } = this.props;
    return(
      <div>
        <ul>
          {Object.keys(errors).map(function(key, i) {
            return <li key={i}>{key} {errors[key]}</li>;
          })}
        </ul>
      </div>
    )
  }
}
