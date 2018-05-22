class SongIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterSongs = this.filterSongs.bind(this);
  }

  handleChange(event) {
    switch(event.target.id) {
      case "index_search":
        this.setState({search: event.target.value});
        break;
    }
  }

  filterSongs() {
    var stripString = function(str) {
      str = str.replace(/\[.+?\]/g, '');
      return str.replace(/[’'",“\-—–!?()0-9]/g, '');
    }
    var songs = this.props.songData;
    var strippedSearch = stripString(this.state.search);

    // filter songs by language settings
    songs = songs.filter(function(song) {
      return this.props.settings.languages.includes(song.lang);
    }, this);

    var indexMatch = songs.filter(function(song) {
      return Object.values(song.references).includes(this.state.search);
    }, this);

    var titleStartRegex = new RegExp("^" + strippedSearch, 'i');
    var titleStart = songs.filter(function (song) {
      return titleStartRegex.test(stripString(song.title));
    }, this);

    var titleMatchRegex = new RegExp(strippedSearch, 'i');
    var titleMatch = songs.filter(function (song) {
      return titleMatchRegex.test(stripString(song.title));
    }, this);

    var lyricsMatchRegex = new RegExp(strippedSearch, 'i');
    var lyricsMatch = songs.filter(function (song) {
      return lyricsMatchRegex.test(stripString(song.lyrics));
    }, this);

    searchResults = indexMatch
                      .concat(titleStart)
                      .concat(titleMatch)
                      .concat(lyricsMatch);

    return searchResults.filter(function removeDuplicates(song, index, self) {
      return self.indexOf(song) === index;
    });

  }



  render() {
    return (
      <div className="song-index">
        <div className="settings-btn" onClick={this.props.toggleSettingsPage}>
          <img src={this.props.images.settings_icon}/>
        </div>
        <div className="search-form form" >
          <input
            id="index_search"
            value={this.state.search}
            onChange={this.handleChange}
            name="song[search]"
            className="index_search"
            placeholder="search..." />
        </div>
        <div className="title-list">
          {this.filterSongs().map(function(obj, i){
            return <div className="index_row" key={i} id={obj.id} onClick={this.props.setSong}>{obj.title}</div>;
          }, this)}
        </div>

      </div>
    );
  }
}