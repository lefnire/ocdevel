import React from 'react';
import request from 'superagent';
import _ from 'lodash';

export default class ContactForm extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    return (
      <form className="contact-form" onSubmit={this.submit}>
        <div className="form-group">
          <h1 className="contact-formh1"> Let's work together! Contact me today.</h1>
          <input type="email" className="form-control" id="email" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="subject" placeholder="Subject" value={this.state.subject} onChange={e => this.setState({subject: e.target.value})} />
        </div>
        <div className="form-group">
          <textarea className="form-control" id='body' rows="3" value={this.state.text} onChange={e => this.setState({text: e.target.value})} ></textarea>
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }

  submit = e => {
    e.preventDefault();
    request.post('http://localhost:3000/email')
      .send(_.pick(this.state, ['email', 'subject', 'text']))
      .end((err, res) => {
        if (err)
          return alert(res.error);
        alert("Email sent.")
      })
  };

}