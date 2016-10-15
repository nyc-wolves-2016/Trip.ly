class Trip extends React.Component {

  constructor(){
    super();
  }


  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props;

    return(
      <div>
        <div>
          <Itinerary itinerary={itinerary} />
          <h1>Your Itinerary</h1>

        </div>
          <PackingLists packing_lists={packing_lists}/>
        <div>
          <ResourceLists resource_lists={resource_lists} />
          <h1>Resource Lists: </h1>
        </div>

      </div>

    )

}
}
