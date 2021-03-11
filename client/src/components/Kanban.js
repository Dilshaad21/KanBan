import React, { Component } from "react";
import Board from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import axios from "axios";

class Kanban extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: {
        columns: [
          {
            id: 1,
            title: "Development",
            cards: [
            ],
          },
          {
            id: 2,
            title: "Testing",
            cards: [
            ],
          },
          {
            id: 3,
            title: "Done",
            cards: [
            ],
          },
          {
            id: 4,
            title: "Deploy",
            cards: [
            ],
          },
        ],
      },
    };
  }

  componentDidMount() {
    axios
      .get("/get-data")
      .then((response) => {
        let cards = response.data;
        let columns = this.state.board.columns;

        cards.map((card) => {
          let index = columns.findIndex((d) => d.title === card.category);
          let newCardData = {
            id: card._id,
            title: card.title,
            description: card.description,
          };
          // console.log(index);
          columns[index].cards.push(newCardData);
          return null;
        });

        this.setState({ board: columns });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state);
  }

  saveData = () => {
    const data = this.state.board;
    console.log("Saving data.....", data);
    axios
      .post("/post-data", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Board
          allowRemoveLane
          allowRenameColumn
          allowRemoveCard
          onLaneRemove={console.log}
          onCardRemove={(e)=>{this.setState({ board: e})}}
          onCardDragEnd={(e)=>{this.setState({ board: e})}}
          onLaneRename={console.log}
          initialBoard={this.state.board}
          allowAddCard={{ on: "top" }}
          onNewCardConfirm={(draftCard) => {
            return {
              id: new Date().getTime(),
              ...draftCard,
            };
          }}
          onCardNew={(e)=>{this.setState({board: e})}}
        />
        <button onClick={this.saveData}>Save</button>
      </div>
    );
  }
}

export default Kanban;
