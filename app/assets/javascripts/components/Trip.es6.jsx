class Trip extends React.Component {

  constructor(){
    super();
    this.handleClickAddPacking = this.handleClickAddPacking.bind(this);
  }

  // handlClickAddPacking(event) {
  //   event.preventDefault();
  //
  // }

  render(){
    return(
      <p>Test HI!</p>

      <PackingPreview /*packingLists = {this.state.trip.packing_lists}*/ />

    )
  }
}
