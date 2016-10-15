class PackingList extends React.Component {
  constructor() {
    super();
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }


  render(){
    let { name } = this.props.list;
    return(
      <div>
        <li><p>Name: {name}</p>
          {this.props.items.map((item, i) =>
          <p key={i}> {item.name} </p>) }
        </li>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
