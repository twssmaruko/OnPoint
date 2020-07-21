export const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    // eslint-disable-next-line comma-dangle
    ...updatedProperties
});
