import React from 'react';

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
          <input type="email" className="form-control" id="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="subject" placeholder="Subject" value={this.state.subject} onChange={e => this.setState({subject: e.target.value})} />
        </div>
        <div className="form-group">
          <textarea className="form-control" id='body' rows="3" value={this.state.body} onChange={e => this.setState({body: e.target.value})} ></textarea>
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }

  submit = (e) => {
    e.preventDefault();
    let {email, subject, body} = this.state;
    let formData = {email, subject, body};
    //superagent.post('http://email-server.com', formData)
    //.then(()=> alert("Email sent."));
    alert("Message sent");
  };

}