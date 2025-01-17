import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";

import { GET_USER_COMMUNITIES } from "../../utils/queries";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

function MyCommunities({ userID, onEdit }) {
  const [moreBtn, setMoreBtn] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", location: "" });
  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };

  const { data: communitiesData, loading: communitiesLoading } = useQuery(
    GET_USER_COMMUNITIES,
    {
      variables: { userID },
      skip: !userID,
    }
  );

  const navigate = useNavigate();

  if (communitiesLoading) return <p>Loading...</p>;
  const myListData = communitiesData.getUserCommunities;

  const handleEditClick = (id, name, location) => {
    setIsEditing(id);
    setUpdatedData({ name, location });
  };

  const handleSaveClick = (id) => {
    onEdit(id, updatedData);
    setIsEditing(null);
    setUpdatedData({ name: "", location: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="itemsList">
      {myListData.map((item, i) => {
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item.id} className="itemSection">
            <Link to={`/communities/${item._id}`} className="itemCard">
              <div className="itemData">
                {isEditing === item.id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={updatedData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="location"
                      value={updatedData.location}
                      onChange={handleInputChange}
                    />
                    <button onClick={() => handleSaveClick(item.id)}>
                      Save
                    </button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h4>{item.name}</h4>
                    <ul className="itemDataList">
                      <li>
                        <span>Membership:</span> {item.membership}
                      </li>
                      <li>
                        <span>Location:</span> {item.location}
                      </li>
                      <li>
                        <span>Members:</span> {item.members}
                      </li>
                    </ul>
                  </>
                )}
              </div>
              <div className="itemImgDiv">
                <img alt={`item-${item.id}-img`} src={item.image} />
              </div>
            </Link>
            <div className="itemOptions">
              <button className="itemDeleteBtn">
                <TrashIcon className="optIcon" />
              </button>
              <button
                onClick={() =>
                  handleEditClick(item.id, item.name, item.location)
                }
                className="itemEditBtn"
              >
                <Pencil1Icon className="optIcon" />
              </button>
            </div>
          </div>
        );
      })}
      {myListData.length ? (
        <div className="btnsDiv">
          <div className="underListBtns">
            {myListData.length > 1 ? (
              <button onClick={moreBtnOpen} className="blackMoreBtn">
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            ) : (
              <button onClick={moreBtnOpen} className="grayMoreBtn">
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            )}

            <button
              onClick={() => navigate("/newcommunity")}
              className="blackMoreBtn"
            >
              + Add new community
            </button>
          </div>
          <span className="listBtnSpacer"></span>
        </div>
      ) : (
        <span>No communities have been created!</span>
      )}
    </div>
  );
}

export default MyCommunities;
