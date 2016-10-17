class AddListErrors extends React.Component {
  render() {
    let { errors } = this.props;
    return(
      <div>
        {errors}
      </div>
    )
  }
}
