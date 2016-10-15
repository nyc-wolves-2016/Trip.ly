class PackingList extends React.Component {
  constructor() {
    super();

  }



  render(){
    let { name } = this.props.items;
    return(
      <li><p>Name: {name}</p>
        {this.props.items.map((item, i) =>
        <p> {item.name} </p>) }
      </li>
    )
  }
}
