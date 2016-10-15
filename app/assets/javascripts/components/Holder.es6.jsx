class Holder extends React.Component {
  constructor() {
    super();
    this.handleNested = this.handleNested.bind(this);
  }

  handleNested(response){
    this.props.onListClick(response);
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div>
        <div>

          <h1>Your Itinerary</h1>
        </div>
          <PackingLists onListClick={this.handleNested} trip={trip} packing_lists={packing_lists}/>
        <div>

          <h1>Resource Lists: </h1>
        </div>

      </div>

    )
  }
}
