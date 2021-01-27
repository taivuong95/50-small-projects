import React from 'react';
import './App.css';
class AppDragDropDemo extends React.Component {
    constructor(props) {
        super(props);
        this.draggingRef = React.createRef();
        this.state = {
            tasks: [
                { name: 'Angular', category: 'wip', bgcolor: 'yellow' },
                { name: 'React', category: 'wip', bgcolor: 'pink' },
                { name: 'Vue', category: 'complete', bgcolor: 'skyblue' },
            ]
        }
    }


    onDragStart = (e, id) => {
        console.log('dragstart:', id);
        e.dataTransfer.setData("id", id);
        this.draggingRef.current.classList.add('dragging');

    }
    onDragEnd = (e) => {
        this.draggingRef.current.classList.remove('dragging')
    }
    onDragOver = e => {
        e.preventDefault();
        // phần tử đang dragging
        const draggable = document.querySelector('.dragging')
        // console.log(e.nativeEvent.srcElement);
        const container = e.nativeEvent.srcElement
        const afterElement = this.getDragAfterElement(container, e.clientY);
        // if (afterElement === null) {
        //     container.appendChild(draggable);
        // } else {
        //     container.insertBefore(draggable, afterElement);
        // }
    }
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
    onDrop = (e, cat) => {
        let id = e.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter(task => {
            if (task.name == id) {
                task.category = cat;
            }
            return task;
        });
        this.setState({
            ...this.state,
            tasks,
        })
    }
    render() {
        var tasks = {
            wip: [],
            complete: [],
        }
        this.state.tasks.forEach((task, idx) => {
            tasks[task.category].push(
                <div key={task.name}
                    ref={this.draggingRef}
                    onDragStart={e => this.onDragStart(e, task.name)}
                    onDragEnd={e => this.onDragEnd(e)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: task.bgcolor }}>
                    {task.name}
                </div>
            )
        });

        return (
            <div className='container-drag'>
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div className="wip container"
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'wip')}
                >
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                <div
                    className="droppable container"
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, 'complete')}
                >
                    <span className="task-header">COMPLETED</span>
                    {tasks.complete}
                </div>
            </div>
        )
    }
}

export default AppDragDropDemo;

/**
 *
 * NOTES:
1.  To make an element draggable add the "draggable" attribute
2.  To make an area droppable, implement the 'dragover' event.
3.  To capture the drag data, implement the 'dragstart' event.
4.  To capture the drop, implement the 'drop' event
5.  You can also implement the 'drag' event that is fired as the element is being dragged.
*/


