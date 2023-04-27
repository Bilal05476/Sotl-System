import React from "react";

// imgaes import
import user from "../../assets/images/dashboard/user.png";
import user1 from "../../assets/images/dashboard/user1.jpg";
import user2 from "../../assets/images/dashboard/user2.jpg";
import user3 from "../../assets/images/dashboard/user3.jpg";
import man from "../../assets/images/dashboard/man.png";
import user5 from "../../assets/images/dashboard/user5.jpg";
import designer from "../../assets/images/dashboard/designer.jpg";

const RightSidebar = () => {
  return (
    <div>
      <div className="right-sidebar" id="right_side_bar">
        <div>
          <div className="container p-0">
            <div className="modal-header p-l-20 p-r-20">
              <div className="col-sm-8 p-0">
                <h6 className="modal-title font-weight-bold">CHAT BOX</h6>
              </div>
              <div className="col-sm-4 text-end p-0">
                <i className="me-2" data-feather="settings"></i>
              </div>
            </div>
          </div>
          <div className="friend-list-search mt-0">
            <input type="text" placeholder="search friend" />
            <i className="fa fa-search"></i>
          </div>
          <div className="p-l-30 p-r-30">
            <div className="chat-box">
              <div className="people-list friend-list">
                <ul className="list">
                  <li className="clearfix">
                    <img
                      className="rounded-circle user-image"
                      src={user}
                      alt=""
                    />
                    <div className="status-circle online"></div>
                    <div className="about">
                      <div className="name">Vincent Porter</div>
                      <div className="status"> Online</div>
                    </div>
                  </li>
                  <li className="clearfix">
                    <img
                      className="rounded-circle user-image"
                      src={user1}
                      alt=""
                    />
                    <div className="status-circle away"></div>
                    <div className="about">
                      <div className="name">Ain Chavez</div>
                      <div className="status"> 28 minutes ago</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
