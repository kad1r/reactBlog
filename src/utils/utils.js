export function generateSlug(title) {
    if(!title){
        return 'ERROR';
    }
    return title.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-ve-')
        .replace(/ı/g, 'i')         // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')
}