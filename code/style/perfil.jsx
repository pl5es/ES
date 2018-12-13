import React, { Component } from "react";

class Perfil extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="container">
          <div className="row container-header">
            <div className="col-md-2 margin-left">
              <div className="logo" />
            </div>
            <div className="col-md-10 header">
              <div className="row">
                <div className="col-md-6 container-search-bar">
                  <input type="text" />
                </div>
                <div className="col-md-1 search-icon" />
                <div className="col-md-5 container-icons end">
                  <div className="icons" />
                  <div className="icons" />
                  <div className="icons" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-profile">
          <div className="col-md-2" />
          <div className="col-md-8 profile">
            <div className="container-personal-info">
              <div className="photo-area" />
              <div className="personal-info">
                <div className="name">Name Surname</div>
                <div className="ORCID-number">
                  1234567890
                  <div className="ORCID-id">ORCID ID</div>
                </div>
                <div className="text">Universidade de Coimbra</div>
                <div className="text">Biology</div>
              </div>
            </div>
            <div className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
              necessitatibus suscipit impedit sint doloremque explicabo ad
              possimus aut iste quam laboriosam nostrum ducimus dolorem vel nemo
              voluptates. Officia, recusandae minus quae delectus obcaecati
              dolorem alias incidunt quia sint, hic qui in dicta nam
              voluptatibus ducimus dolor odit tempore? Vero adipisci rerum
              tempora autem magni. Aliquam repellendus consectetur eos facere
              ipsa?
            </div>
          </div>
          <div className="col-md-2 container-edit-profile">
            <div className="text">Edit Profile</div>
          </div>
        </div>
        <div className="row buttons">
          <div className="col-md-10" />
          <div className="col-md-2">
            <div className="container-buttons">
              <button>Papers</button>
              <button>Message</button>
            </div>
          </div>
        </div>
        <div className="row container-post">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="post">
              <div className="col-md-12 author">
                <div className="id">
                  <div className="photo" />
                  <div className="name">Name Surname</div>
                </div>
                <div className="area">
                  <div className="text">
                    <div className="grey">in</div>
                    Biology
                  </div>
                </div>
                <div className="date">
                  <div className="day">25/10/2019</div>
                  <div className="time">14:31</div>
                </div>
              </div>
              <div className="col-md-12 content">
                <div className="text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid, necessitatibus suscipit impedit sint doloremque
                  explicabo ad possimus aut iste quam laboriosam nostrum ducimus
                  dolorem vel nemo voluptates. Officia, recusandae minus quae
                  delectus obcaecati dolorem alias incidunt quia sint, hic qui
                  in dicta nam voluptatibus ducimus dolor odit tempore? Vero
                  adipisci rerum tempora autem magni. Aliquam repellendus
                  consectetur eos facere ipsa?
                </div>
              </div>
              <div className="col-md-12 link">
                <div className="article">
                  <div className="title">
                    Artificial Intelligence for Biology?
                  </div>
                  <div className="url">sciencemag.org</div>
                </div>
                <div className="hashtags">
                  <div className="text">#Artificial Intelligence</div>
                  <div claclassNamess="text">#Biology</div>
                  <div className="text">#Research</div>
                </div>
              </div>
              <div className="col-md-12 engagement">
                <div className="botoes">
                  <div className="icon" />
                  <div className="icon" />
                  <div className="icon" />
                </div>
                <div className="numbers">
                  <div className="upvotes">
                    <div className="number">23</div>
                    <div className class="text">
                      Up votes
                    </div>
                  </div>
                  <div className="comments">
                    <div className="number">2</div>
                    <div className="text">Comments</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
