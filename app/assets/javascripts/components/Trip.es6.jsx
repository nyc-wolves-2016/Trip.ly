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
      items: item_list[1],
      list: item_list[0]
    })
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props;

    return(
      <div>
        { this.state.holder ? <Holder onListClick={this.handleListClick} allLists={this.props}/> : null }
        { this.state.packingList ? <PackingList list={this.state.list} items={this.state.items}/> : null }

      </div>
    )

}
}
