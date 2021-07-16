import React, { Component } from "react";
import { Header } from "../container";
import { TweetForm } from "../component/tweetForm";
import { TweetList } from "../component/tweetList";
import { Tweet } from "../component/tweet";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      tweetText: "",
      tweets: [],
    };
    this.onChangeTweetForm = this.onChangeTweetForm.bind(this);
    this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
  }

  componentWillMount() {
    fetch("tweetData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ tweets: data });
      })
      .catch((err) => console.log(err));
  }

  onChangeTweetForm(event) {
    this.setState({ tweetText: event.target.value });
  }

  //tweet atma özelliklerinin implementasyonu
  handleTweetSubmit() {
    const newTweet = [...this.state.tweets];
    const currentUser = JSON.parse(localStorage.getItem("isLoggedIn"));
    newTweet.unshift({
      id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      name: currentUser[0].name,
      username: currentUser[0].username,
      tweetContent: this.state.tweetText,
      likeCount: 10,
      retweetCount: 20,
      replyCount: 5,
      dateTime: new Date().toISOString(),
    });

    this.setState({
      tweets: newTweet,
    });
  }

  render() {
    const { tweetText, tweets } = this.state;

    return (
      <div className="latestTweets">
        <Header title="Home" />
        <TweetForm
          tweetText={tweetText}
          onChangeTweetForm={this.onChangeTweetForm}
          handleTweetSubmit={this.handleTweetSubmit}
        />
        <div className="latestTweets__divisor" />
        {tweets.length > 0 ? (
          <TweetList tweets={tweets} />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default Home;
