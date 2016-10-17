class Trip extends React.Component {

  constructor(){
    super();
    this.state = {
      items: [],
      resources: [],
      events: [],
      holder: true,
      packingList: false,
      resourceList: false,
      itinerary: false,
      rlist: [],
      list: []
    };
    this.handleItineraryClick = this.handleItineraryClick.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.handleResourceListClick = this.handleResourceListClick.bind(this);
    this.handleReturnTripPage = this.handleReturnTripPage.bind(this);
  }

  handleItineraryClick(itinerary_events){
    this.setState({
      holder: false,
      itinerary: true,
      events: itinerary_events
    })
  }

  handleListClick(item_list){
    this.setState({
      holder: false,
      packingList: true,
      items: item_list[1],
      list: item_list[0]
    })
  }

  handleResourceListClick(item_list){
    this.setState({
      holder: false,
      resourceList: true,
      resources: item_list[1],
      rlist: item_list[0]
    })
  }


  handleReturnTripPage() {
    this.setState({
      holder: true,
      packingList: false,
      resourceList: false,
      itinerary: false
    })
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props;

    return(
      <div>

        { this.state.holder ? <Holder onListClick={this.handleListClick}
        onItineraryClick={this.handleItineraryClick} onResourceListClick={this.handleResourceListClick} allLists={this.props}/> : null }
        { this.state.itinerary ? <Itinerary onReturnTripPage={this.handleReturnTripPage} events={this.state.events} itinerary={this.props.itinerary} /> : null }
        { this.state.packingList ? <PackingList onReturnTripPage={this.handleReturnTripPage} list={this.state.list} items={this.state.items}/> : null }
        { this.state.resourceList ? <ResourceList
          onReturnTripPage={this.handleReturnTripPage}
          rlist={this.state.rlist}
          resources={this.state.resources}/> : null }
      </div>
    )

}
}
