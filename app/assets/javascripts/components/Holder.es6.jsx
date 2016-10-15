class Holder extends React.Component {
  constructor() {
    super();
    this.handleNested = this.handleNested.bind(this);
    this.handleNestedResource = this.handleNestedResource.bind(this);
  }

  handleNested(response){
    this.props.onListClick(response);
  }

  handleNestedResource(response){
    this.props.onResourceListClick(response);
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div>
        <div>

          <h1>Your Itinerary</h1>
        </div>
          <PackingLists onListClick={this.handleNested} trip={trip} packing_lists={packing_lists}/>
          <ResourceListPreview onResourceListClick={this.handleNestedResource} trip={trip} resource_lists={resource_lists}/>
        <div>

          
        </div>

      </div>

    )
  }
}
