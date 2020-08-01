export const formatDate = dateString => {
    if (!dateString) {
        return '';
    }
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const date = new Date(dateString);
    try {
        return date.toLocaleDateString('default', options);
    } catch (err) {
        // handle IE 11
        return date.toLocaleDateString();
    }
};