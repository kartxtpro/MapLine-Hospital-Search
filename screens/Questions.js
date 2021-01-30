import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

export class Question extends React.Component {
  static propTypes = {
    bullets: PropTypes.array,
    bulletStyle: PropTypes.object,
    actionText: PropTypes.string,
    containerStyle: PropTypes.object,
    actionStyle: PropTypes.object,
    actionTextStyle: PropTypes.object,
    onClick: PropTypes.func,
    key: PropTypes.number,
  };

  render() {
    return (
      <View
        key={this.props.key}
        style={[styles.defaultContainerStyle, this.props.containerStyle]}
      >
        <Text style={[styles.defaultTitleStyle, this.props.titleStyle]}>
          {this.props.question}
        </Text>

        <Text style={[styles.defaultReplyStyle, this.props.replyStyle]}>
          {this.props.reply}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: "white",
    margin: 15,
  },
  defaultTitleStyle: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    borderRadius: 5,
    margin: 5,
  },
  defaultReplyStyle: {
    fontSize: 19,
    textAlign: "center",
  },
});
