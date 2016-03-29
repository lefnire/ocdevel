import React from 'react';
import request from 'superagent';
import _ from 'lodash';

export default class Contact extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    if (this.state.messageSent) {
      return (
        <div className="message-sent">
          <h1>Message sent!</h1>
          <p>We'll get back to you shortly</p>
        </div>
      );
    }

    return (
      <form className="contact-form" onSubmit={this.submit}>
        <div className="form-group">
          <h1 className="contact-formh1"> Let's work together! Contact me today.</h1>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <input required type="email" className="form-control" id="email" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
        </div>
        <div className="form-group">
          <input required type="text" className="form-control" id="subject" placeholder="Subject" value={this.state.subject} onChange={e => this.setState({subject: e.target.value})} />
        </div>
        <div className="form-group">
          <textarea required className="form-control" id='body' rows="3" value={this.state.text} onChange={e => this.setState({text: e.target.value})} ></textarea>
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }

  submit = e => {
    e.preventDefault();
    request.post('http://ocdevel-server.herokuapp.com/email')
      .send(_.pick(this.state, ['email', 'subject', 'text']))
      .end((error, res) => {
        if (error) {
          debugger;
          return this.setState({error: _.get(error, 'response.body.error', error)});
        }
        this.setState({messageSent: true})
      })
  };

}