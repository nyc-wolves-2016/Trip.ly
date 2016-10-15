class PackingList extends React.Component {
  constructor() {
    super();

  }



  render(){
    let { name } = this.props.list;
    return(
      <li><p>Name: {name}</p>
        {this.props.items.map((item, i) =>
        <p key={i}> {item.name} </p>) }
      </li>
    )
  }
}
