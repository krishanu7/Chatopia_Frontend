import { useEffect, useState } from "react";
import "./ChatOnline.css";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/" + currentId);
        setFriends(res.data);
      } catch (error) {
        console.log("Error fetching friends: ", error);
      }
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    const isFriend = (userId) => {
      return friends.some((friend) => friend._id === userId);
    };
    const getUsername = (userId) => {
      const friend = friends.find((friend) => friend._id === userId);
      return friend ? friend.username : "";
    };

    const getProfilePicture = (userId) => {
      const friend = friends.find((friend) => friend._id === userId);
      return friend ? friend.profilePicture : "";
    };
    const onlineFriendsData = onlineUsers
      .map((user) => ({
        userId: user.userId,
        username: getUsername(user.userId),
        profilePicture: getProfilePicture(user.userId),
      }))
      .filter((user) => user.userId !== currentId && isFriend(user.userId));

    setOnlineFriends(onlineFriendsData);
  }, [onlineUsers, currentId, friends]);

  const handleClick = async (user) => {
    try {
      const existingConversation = await axios.get(
        `/conversations/find/${currentId}/${user.userId}`
      );

      if (existingConversation.data) {
        setCurrentChat(existingConversation.data);
      } else {
        const newConversation = await axios.post("/conversations", {
          senderId: currentId,
          receiverId: user.userId,
        });

        setCurrentChat(newConversation.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          key={friend.userId}
          className="chatOnlineFriend"
          onClick={() => handleClick(friend)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              alt={friend.username}
              src={
                friend?.profilePicture
                  ? PF + friend.profilePicture
                  : PF + "person/noAvatar.png"
              }
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
