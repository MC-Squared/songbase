class SongReferences extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="song-references">
        {this.props.references.map((ref) => {
          return <div className="song-reference" key={ref.id}>{this.props.books.find((book) => book.id == ref.book_id).name + ": #" + ref.index}</div>
        }, this)}
      </div>
    );
  }

}