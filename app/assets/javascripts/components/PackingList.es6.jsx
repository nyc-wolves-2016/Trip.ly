class PackingList extends React.Component {
  constructor() {
    super();
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    $("#add-item-form").removeClass("hidden");
    $("#item-submit").addClass("hidden");
  }

  handleItemSubmit(response){
    this.props.items.push(response);
    this.forceUpdate();
  }

  render(){
    let { name } = this.props.list;
    return(
      <div>
        <li><p>Name: {name}</p>
        <div>
          <input id="item-submit" type="button" value="Add Item" onClick={this.onButtonClick}/>
        </div>
        <div id="add-item-form" className="hidden">
          <AddItemForm data={this.props.list} onItemSubmit={this.handleItemSubmit}/>
        </div>
          {this.props.items.map((item, i) =>
          <p key={i}> {item.name} </p>) }
        </li>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
