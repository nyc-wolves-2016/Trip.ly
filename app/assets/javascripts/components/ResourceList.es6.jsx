class ResourceList extends React.Component {
  constructor() {
    super();
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }


  render(){
    let { name, link, details } = this.props.rlist;
    if (link === null){
      var x = "#"
    } else {
      var x = link
    }

    return(
      <div>
        <li><h2><a href={x}>Name: {name}</a></h2>
          {this.props.resources.map((resource, i) =>
          <p key={i}> {resource.name} </p>) }
        </li>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
