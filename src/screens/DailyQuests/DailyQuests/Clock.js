import React, { Component } from "react";
import styles from "./DailyQuests.module.sass";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  leading0(num) {
    return num < 10 ? "" + num : num;
  }
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24) - 9;
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  render() {
    return (
      <div className={styles.counterBlocksRow}>
        <div className={styles.counterBlocksInner}>
          {this.leading0(this.state.days)} d 
        </div>
        <div className={styles.counterBlocksInner}>
          {this.leading0(this.state.hours)} h 
        </div>
        <div className={styles.counterBlocksInner}>
          {this.leading0(this.state.minutes)} min 
        </div>
      </div>
    );
  }
}
export default Clock;
