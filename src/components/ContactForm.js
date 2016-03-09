import React from 'react';

export default class ContactForm extends React.Component {
  render() {
    return (
      <form className="contact-form">
        <div className="form-group">
          <input type="email" className="form-control" id="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="subject" placeholder="Subject" />
        </div>
        <div className="form-group">
          <textarea className="form-control" id='body' rows="3"></textarea>
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}