import * as firebase from 'firebase';

export function uploadImage(image) {
        console.log('gelen',image)

        const ref = firebase.storage().ref();
        const name = (+new Date()) + '-' + image.name;
        const metadata = {contentType: image.type};
        const task = ref.child(name).put(image, metadata);

        return task.then((snapshot) => {
            console.log(snapshot.downloadURL)
            return snapshot.downloadURL;
        });

}