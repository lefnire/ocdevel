import React from 'react';


class DashboardPage extends React.Component {
  state = {
    hasClicked: true
  }

  handleClick = () => {
    const clicked = this.state.hasClicked;
    this.setState(() => ({hasClicked: !clicked}));
  }


  render() {
    return (
      <div className="page-container">
          <div className="side-container side-container__info">
                <div className="stacked-headers">
                    <h3> ocDevel </h3>
                    <br />
                    <br />
                    <h2 className="stacked__name">Full-Stack Dev</h2>
                    <h2>Machine Learning Guide Podcast</h2>
                </div>
          </div>
          <div className="side-container card-container">
              {this.state.hasClicked ?
                <div className="info info-back">
                    <div className="section side-container__media">
                    <div className="section button-title">
                        <div className="back-button" onClick={this.handleClick}>
                          <i className="fas fa-chevron-circle-left fa-3x"></i>
                        </div>
                        <div className="side-container__title">
                          <h1> About ocDevels Creator </h1>
                        </div>
                    </div>

                          <div className="pic-links">
                              <div className="side-container__picName">
                                   <img className="side-container__profilePic" src="/images/profile_pic.jpeg" alt="Profile picture" />
                              </div>
                             <div className="side-container__icons">
                                  <a target="_blank" href="https://www.facebook.com/lefnire">
                                    <i className="fab fa-facebook-square fa-3x"></i>
                                  </a>
                                  <a target="_blank" href="https://www.linkedin.com/in/lefnire">
                                  <i className="fab fa-linkedin fa-3x"></i>
                                  </a>
                                  <a target="_blank" href="https://twitter.com/lefnire">
                                    <i className="fab fa-twitter-square fa-3x"></i>
                                  </a>
                                  <a target="_blank" href="https://github.com/lefnire">
                                    <i className="fab fa-github-square fa-3x"></i>
                                  </a>
                             </div>
                            </div>
                     </div>
                    <div className="section side-container__bio">

                        <p>
                          Tyler is a full-stack Senior JavaScript developer and
                          has spent 10 years in web & mobile. He is focused on Node,
                          React / React Native, and Angular / Ionic.
                          He is the also creator of HabitRPG, a startup begun on
                           Kickstarter which now has 800k+ users.
                          Tyler built an enterprise PDF-creation service employed by 1.5k sites,
                          and websites for clients such as Adidas, BigFix, and UCSF.
                           Currently obsessed with machine learning, he labels himself a
                           "bonafide singularitarian". Available starting April for
                           remote work in React, Angular / Ionic, Node, and/or Python.
                        </p>
                    </div>
                </div>
                :
                <div className="info info-front">
                  <button className="button-link" type="button" onClick={this.handleClick}>...Get to Know Us</button>
                </div>
              }



            </div>
      </div>
    )};
  };


// const DashboardPage = () => (
// <div className="page-container">
//     <div className="side-container side-container__info">
//           <div className="stacked-headers">
//               <h3> ocDevel </h3>
//               <br />
//               <br />
//               <h2 className="stacked__name">Full-Stack Dev</h2>
//               <h2>Machine Learning Guide Podcast</h2>
//           </div>
//     </div>
//     <div className="side-container card-container">
//         <div className="info info-front">
//           <h1> ...Get to know us </h1>
//         </div>
//         <div className="info info-back">
//             <div className="side-container__media">
//                   <div className="side-container__title">
//                     <h1> About <br /> ocDevels <br /> Creator </h1>
//
//                   </div>
//                   <div className="side-container__item side-container__picName">
//                        <img className="side-container__profilePic" src="/images/profile_pic.jpeg" alt="Profile picture" />
//                   </div>
//                  <div className="side-container__icons">
//                       <a target="_blank" href="https://www.facebook.com/lefnire">
//                         <i className="fab fa-facebook-square fa-3x"></i>
//                       </a>
//                       <a target="_blank" href="https://www.linkedin.com/in/lefnire">
//                       <i className="fab fa-linkedin fa-3x"></i>
//                       </a>
//                       <a target="_blank" href="https://twitter.com/lefnire">
//                         <i className="fab fa-twitter-square fa-3x"></i>
//                       </a>
//                       <a target="_blank" href="https://github.com/lefnire">
//                         <i className="fab fa-github-square fa-3x"></i>
//                       </a>
//                  </div>
//
//              </div>
//             <div className="side-container__bio">
//
//                 <p>
//                   Tyler is a full-stack Senior JavaScript developer and has spent 10 years in web &
//                   mobile. He is focused on Node,
//                   React / React Native, and Angular / Ionic. He is the also creator of HabitRPG, a startup begun on Kickstarter
//                   which now has
//                   800k+ users. Tyler built an enterprise PDF-creation service employed by 1.5k sites, and websites for clients
//                   such as Adidas,
//                   BigFix, and UCSF. Currently obsessed with machine learning, he labels himself a "bonafide singularitarian".
//                   Available starting April for remote work in React, Angular / Ionic, Node, and/or Python.
//                 </p>
//
//             </div>
//         </div>
//
//       </div>
// </div>
//
//
// // <div className="vl"></div>
//
//
// );

export default DashboardPage;
