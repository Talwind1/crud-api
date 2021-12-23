import react, { Component } from "react";
import Avatar from "./Avatar.js";
import avatarApi from "./api.js";
import Input from "./Input.js";
import Card from "./Card";

class App extends react.Component {
  state = { data: [], name: "", image: "", errorMsg: "" };

  async componentDidMount() {
    try {
      const { data } = await avatarApi.get("data-avatars");
      this.setState({ data }, () => {
        console.log(this.state);
      });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  }

  handleChange = (value, objType) => {
    this.setState({ objType: value });
  };
  create = async () => {
    try {
      const newAvatar = {
        name: this.state.name,
      };
      const { data } = await avatarApi.post("/data-avatars/", newAvatar);

      this.setState((state) => {
        return {
          data: [...state.data, data],
        };
      });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  };

  delete = async (id) => {
    try {
      await avatarApi.delete(`/avatars/data-avatrs${id}`);
      const data = this.state.data.filter((item) => item.id !== id);
      this.setState({ data });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  };

  update = async (value, id) => {
    try {
      const updateItem = { name: value.updateName };
      const { data } = await avatarApi.put(
        `/avatars/data-avatrs${id}`,
        updateItem
      );
      const index = this.state.data.findIndex((el) => el.id === id);
      const newItems = [...this.state.data];
      newItems[index] = data;
      this.setState({ data: newItems });
    } catch (e) {
      this.setState({ errorMsg: e.message });
    }
  };

  displayData = (id) => {
    return this.state.data.map((obj, key) => {
      return (
        <div key={obj.id}>
          <Avatar name={obj.name} imgURL={obj.imgURL} id={obj.id} />
        </div>
      );
    });
  };
  renderData = () => {
    return (
      <div>
        {this.state.data.map((el) => {
          return (
            <div key={el.id}>
              <Card data={el} />
              <Input
                type="updatedName"
                handleCallback={this.update}
                id={el.id}
              />
              <button onClick={() => this.delete(el.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return (
      <div className="App">
        {this.state.data && this.renderData()}
        {this.displayData()}

        <Input
          label="Name"
          handleChange={(e) => {
            this.handleChange(e.target.value, "name");
          }}
        />
        <Input
          label="Image"
          handleChange={(e) => {
            this.handleChange(e.target.value, "image");
          }}
        />

        <button onClick={this.create} value={this.state.avatar}>
          Create
        </button>
      </div>
    );
  }
}

export default App;
