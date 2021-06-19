import Axios from "axios";

const USER_API_BASE_URL = "http://tweet-balancer-1914636209.ap-south-1.elb.amazonaws.com/api/v1.0/tweets/";

class TweetService {
  getAllTweets(username) {
    return Axios.get(USER_API_BASE_URL + username + "/all");
  }
  getAllUsersTweets(username) {
    return Axios.get(USER_API_BASE_URL + username);
  }
  deleteUsersTweets(username, id) {
    return Axios.delete(
      USER_API_BASE_URL + username + "/" + "delete" + "/" + id
    );
  }

  likeUsersTweets(username, id) {
    return Axios.put(USER_API_BASE_URL + username + "/" + "like" + "/" + id);
  }

  postTweet(username, tweetObj) {
    console.log("username ", username, tweetObj);
    return Axios.post(USER_API_BASE_URL + username + "/add", tweetObj);
  }

  replyTweet(username, id, tweetObj) {
    console.log("username ", username, id, tweetObj);
    console.log(USER_API_BASE_URL + username + "/reply/" + id);
    return Axios.post(USER_API_BASE_URL + username + "/reply/" + id, tweetObj);
  }
  editTweet(username, id, tweetObj) {
    console.log("username ", username, id, tweetObj);
    console.log(USER_API_BASE_URL + username + "/update/" + id);
    return Axios.put(USER_API_BASE_URL + username + "/update/" + id, tweetObj);
  }
}

export default new TweetService();
