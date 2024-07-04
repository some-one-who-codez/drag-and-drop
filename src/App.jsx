import { useState } from "react";
import "./App.css";

function App() {
  // hold the old and new index of an item in the list being fragged
  let oldIndex = 0;
  let newIndex = 0;

  // some dummy todo items
  const [todoItems, setTodoItems] = useState([
    "Go shopping",
    "Study DSA",
    "Edit videos",
    "Post new content",
    "Tidy up",
    "Create Drag & Drop Repo",
  ]);

  return (
    <div className="p-10">
      <h1 className="m-4">TODO App</h1>

      <div>
        <ul
          onDragStart={(event) => {
            // set old index from currently being dragged element
            const target = event.target;
            oldIndex = Number(target.closest("li").id);
          }}
          onDrag={(event) => {
            // set old index from currently being dragged element
            const target = event.target;
            oldIndex = Number(target.closest("li").id);
          }}
          onDragOver={(event) => {
            // prevent default actions
            event.preventDefault();
          }}
          onDrop={(event) => {
            // get new index to update list
            const target = event.target;
            newIndex = Number(target.closest("li").id);

            // copy the todoItems as they can't be mutated directly
            const todoItemsCopy = [...todoItems];

            // get the value of the item
            const todoItemText = todoItemsCopy[oldIndex];

            // delete the item from its previous index
            todoItemsCopy.splice(oldIndex, 1);

            // add the item in the new index
            todoItemsCopy.splice(newIndex, 0, todoItemText);

            // update the list and the UI
            setTodoItems(todoItemsCopy);
          }}
        >
          {
            // map the todoItems to list item elements
            todoItems.map((item, index) => {
              return (
                <li
                  // the id is needed so we can identify each li uniquely
                  id={index}
                  key={index}
                  // this attribute must be true so the elements can be dragged
                  draggable={true}
                  className="py-1"
                >
                  <div className="bg-blue-400 rounded-md p-2">{item}</div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
