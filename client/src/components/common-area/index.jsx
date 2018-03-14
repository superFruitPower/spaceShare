import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import CommonAreaMain from './main.jsx';
import Members from './members.jsx';
import GroundRules from './ground-rules.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      ownerId: 0,
      name: null,
      purpose: '',
      todos: [],
      mainImage: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
      members: [],
      groundRules: '',
    };
  }
  componentDidMount() {
    console.log('common area did mount');
    Axios.get(`/api/currentSpace/${localStorage.getItem('id_token')}/${this.props.location.state ? this.props.location.state.spaceId : localStorage.getItem('id_space')}`)
      .then((space) => {
        this.setState({
          id: space.data.id,
          ownerId: space.data.owner_fb_id,
          name: space.data.name,
          purpose: space.data.purpose,
          todos: space.data.todos || [],
          mainImage: space.data.main_image || 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
          members: space.data.members || [],
          groundRules: space.data.ground_rules,
        });
      })
      .catch((error) => { console.dir(error); });
    Axios.get(`/api/isOwner/${localStorage.getItem('id_token')}/${this.props.location.state ? this.props.location.state.spaceId : localStorage.getItem('id_space')}`)
      .then((response) => {
        this.setState({ isOwner: response.data }, () => {
          console.log('isOwner', this.state.isOwner);
        });
      })
      .catch(error => console.error('error checking if current user is owner', error));
  }
  render() {
    console.dir(this.state);
    const {
      id,
      ownerId,
      name,
      purpose,
      todos,
      members,
      groundRules,
      isOwner,
    } = this.state;
    const commonAreaProps = { id, name, purpose, todos, isOwner };
    const membersProps = { ownerId, members, isOwner };
    const rulesProps = { groundRules, isOwner };

    return (
      <div>

        <div className="row justify-content-around">
          <div className="space-main-img-container">
            <img
              className="img-fluid space-main-img"
              src={this.state.mainImage}
              alt="Your lovely space"
            />
          </div>
        </div>

        <Switch>
          <Route
            exact
            path="/common-area"
            render={props => (
              <CommonAreaMain {...props} {...commonAreaProps} />
            )}
          />
          <Route
            path="/common-area/members"
            render={props => (
              <Members {...props} {...membersProps} />
            )}
          />
          <Route
            path="/common-area/ground-rules" 
            render={props => (
              <GroundRules {...props} {...rulesProps} />
            )}
          />
        </Switch>

      </div>
    );
  }
}

export default CommonArea;
