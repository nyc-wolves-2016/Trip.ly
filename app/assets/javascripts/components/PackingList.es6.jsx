class PackingList extends React.Component {
  constructor() {
    super();
    this.state = {items: []}
  }

  componentDidMount(){
    let { trip_id, id } = this.props.list;
    $.ajax({
      url: "/trips/" + trip_id + "/packing_lists/" + id
    }).done(function(response){
      this.setState({ items: response })
    }.bind(this));
  }

  render(){
    let { trip_id, id, name } = this.props.list;
    return(
      <li><p>Name: {name}</p>
        {this.state.items.map((item, i) =>
        <p> {item.name} </p>) }
      </li>
    )
  }
}
