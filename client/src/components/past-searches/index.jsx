import React from 'react';
import Axios from 'axios';
import ResultListItem from '../results/result-list-item.jsx';
import SearchListItem from '../results/search-list-item.jsx';

class PastSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [{
        image_url: '',
        name_first: 'no people were found for this search',
        name_last: '',
        profession: '',
        sleep: '',
        personality: '',
      }],
      places: [{
        main_image: '',
        name: 'There are no results for this search.',
        cost: '',
        neighborhood: '',
        description: '',
        id: '',
      }],
      searches: [{
        purpose: 'You do not have any past searches',
        neighborhood: 'location',
        price_min: '0',
        price_max: '0',
        timeline: 'long-term',
        smoking: 'outside is fine',
        pet: 'anywhere',
        include_people: 'people included',
        sleep: 'early bird',
        personality: 'introvert',
        age_min: '0',
        age_max: '100',
        timestamp: 'time-stamp',
      }],
      heading: 'Past Searches',
      profilelink: '/profile',
    };
    this.newSearch = this.newSearch.bind(this);
  }
  componentDidMount() {
    console.log('SearchResults did mount');
    // Axios.get('/api/search-results', {
    //   params: {
    //     token: localStorage.getItem('id_token'),
    //     search_id: localStorage.getItem('id_search'),
    //   },
    // })
    //   .then((response) => {
    //     if (response.data.people.length) {
    //       this.setState({
    //         people: response.data.people,
    //       });
    //     }
    //     if (response.data.places.length) {
    //       this.setState({
    //         places: response.data.places,
    //       });
    //     }
    //     if (response.data.searches.length) {
    //       this.setState({
    //         searches: response.data.searches,
    //       });
    //     }
    //   })
    //   .catch((error) => { console.log(error); });
  }
  newSearch() {
    this.props.history.push('/search');
  }
  render() {
    const {
      heading, people, places, searches, profilelink,
    } = this.state;
    return (
      <div>
        <div className="row mb-2 mt-2">
          <div className="col-10">
            <h1>{heading}</h1>
          </div>
          <div className="col-2">
            <button className="btn btn-secondary" onClick={this.newSearch}>New Search</button>
          </div>
        </div>
        <div className="row">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#places" role="tab">Places</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#people" role="tab">People</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#searches" role="tab">Past Searches</a>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade" id="people" role="tabpanel">
            {people.map(person => (
              <ResultListItem
                image={person.image_url}
                name={`${person.name_first} ${person.name_last}`}
                financial={person.profession}
                about={person.sleep}
                description={person.personality}
                link={profilelink}
              />
            ))}
          </div>
          <div className="tab-pane fade" id="places" role="tabpanel">
            {places.map(place => (
              <ResultListItem
                image={place.main_image}
                name={place.name}
                financial={place.cost}
                about={place.neighborhood}
                description={place.description}
                id={place.id}
                link={{ pathname: '/listing', state: { spaceId: place.id } }}
              />
            ))}
          </div>
          <div className="tab-pane fade show active" id="searches" role="tabpanel">
            {searches.map(search => (
              <SearchListItem
                purpose={search.purpose}
                neighborhood={search.neighborhood}
                price_min={search.price_min}
                price_max={search.price_max}
                timeline={search.timeline}
                smoking={search.smoking}
                pet={search.pet}
                include_people={search.include_people}
                sleep={search.sleep}
                personality={search.personality}
                age_min={search.age_min}
                age_max={search.age_max}
                timestamp={search.timestamp}
                id={search.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PastSearches;
