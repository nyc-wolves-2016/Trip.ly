class Trip extends React.Component {

  constructor(){
    super();
    this.state = {
      items: [],
      holder: true,
      packingList: false,
      packingListID: null
    };
    this.handleListClick = this.handleListClick.bind(this);
  }

  handleListClick(item_list){
    this.setState({
      holder: false,
      packingList: true,
      items: item_list
    })
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props;

    return(
      <div>
        { this.state.holder ? <Holder onListClick={this.handleListClick} allLists={this.props}/> : null }
        { this.state.packingList ? <PackingList items={this.state.items}/> : null }

      </div>
    )

}
}
