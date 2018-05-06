import React, {Component} from 'react';
import Post from "../../components/Post";

const POST = [
    {
        id: 1,
        title: 'Başlık 1',
        content: 'İçerik 1',
        timestamp: 'Mar 12 2012 10:00:00 AM',
        tags: 'asdas, asd as,daasd a, asd ',
        slug: 'ilk-deneme-bu-1',
        category: 'yazılım',
        state: 1
    },
    {
        id: 2,
        title: 'Başlık 2',
        content: 'İçerik 2',
        timestamp: 'Mar 12 2012 10:00:00 AM',
        tags: 'asdas, asd as,daasd a, asd ',
        slug: 'ilk-deneme-bu-2',
        category: 'yazılım',
        state: 1
    },
    {
        id: 3,
        title: 'Başlık 3',
        content: 'İçerik 3',
        timestamp: 'Mar 12 2012 10:00:00 AM',
        tags: 'asdas, asd as,daasd a, asd ',
        slug: 'ilk-deneme-bu-3',
        category: 'yazılım',
        state: 1
    }
];

class Posts extends Component {
    render() {
        return (
            <div>
                {
                    POST.map((post) => {
                        return <Post key={post.id}
                                     id={post.slug}
                                     title={post.title}
                                     content={post.content}
                                     footer={post.footer}/>
                    })
                }
            </div>
        );
    }
}

export default Posts;