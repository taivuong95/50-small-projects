const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');


draggables.forEach(function (draggable) {
    draggable.addEventListener('dragstart', function () {
        draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend', function () {
        draggable.classList.remove('dragging');
    })
})

containers.forEach(function (container) {
    container.addEventListener('dragover', function (e) {
        e.preventDefault();
        const draggable = document.querySelector('.dragging')
        const afterElement = getDragAfterElement(container, e.clientY);
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
})

function getDragAfterElement(container, y) {
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