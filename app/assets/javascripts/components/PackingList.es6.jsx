class PackingList extends React.Component {
  let { name } = this.props.packingList
  render(){
    return(
      <li>
        <span><a href="placeholder">{name}</a></span>
      </li>
    )
  }
}
