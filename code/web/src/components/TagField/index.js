import React, { Component } from "react";

const ENTER_KEY = 13;

class TagField extends Component {
  state = {
    currentInput: ""
  };

  render() {
    console.log(this);
    const {
      props: {
        form: { values },
        label,
        placeholder
      },
      state: { currentInput }
    } = this;
    return (
      <div>
        <h4 className="labelQuestion">{label}</h4>
        <div className="tagContainer mb40">
          <input
            className="inputTags mb5"
            placeholder={placeholder}
            value={currentInput}
            onChange={ev => {
              this.setState({ currentInput: ev.target.value });
            }}
            onKeyDown={e => {
              if (e.keyCode === ENTER_KEY) {
                e.preventDefault();
                if (currentInput.length > 1) {
                  this.props.unshift(currentInput);
                  this.setState({ currentInput: "" });
                }
              }
            }}
          />
          <div className="tagBox">
            <ul className="tagsList">
              {values[this.props.name].length > 0 &&
                values[this.props.name].map((field, index) => (
                  <li className="tag txCenter mb5 ml5" key={field}>
                    {field}
                    <button
                      onClick={ev => {
                        ev.preventDefault();
                        this.props.remove(index);
                      }}
                    >
                      <span className="deleteTags vaMiddle ml5 o50">
                        &times;
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TagField;
