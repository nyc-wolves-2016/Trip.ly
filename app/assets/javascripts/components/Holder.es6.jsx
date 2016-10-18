class Holder extends React.Component {
  constructor() {
    super();
    this.handleNested = this.handleNested.bind(this);
    this.handleNestedResource = this.handleNestedResource.bind(this);
    this.handleNestedItinerary = this.handleNestedItinerary.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
    this.handleNestedResetErrors = this.handleNestedResetErrors.bind(this);
  }

  handleNestedResetErrors() {
    this.props.onResetErrors();
  }


  handleNestedItinerary(response){
    this.props.onItineraryClick(response);
  }

  handleNested(response){
    this.props.onListClick(response);
  }

  handleNestedResource(response){
    this.props.onResourceListClick(response);
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div className="row">
        <div>
          <ItineraryPreview onItineraryClick={this.handleNestedItinerary} trip={trip}/>
        </div>
          <PackingLists onListClick={this.handleNested} trip={trip} packing_lists={packing_lists} handleDelete={this.handleDelete} onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors} onResetErrors={this.handleNestedResetErrors}/>
          <ResourceListPreview onResourceListClick={this.handleNestedResource} trip={trip} resource_lists={resource_lists}  onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors} onResetErrors={this.handleNestedResetErrors}/>
        <div>


        </div>

      </div>

    )
  }
}
