let editEnabled = true; //TODO This should also be used in API

export const isTodoEditable = (todo) => {
    return editEnabled && !todo.completed;
};