import React from 'react';
import './Comments.css';

interface Comment {
    creation_date: string;
    text: string;
}

interface CommentsProps {
    comments: Comment[];
}

function Comments({ comments }: CommentsProps) {
    return (
        <div className="Comments">
            <h1>Comments</h1>
            {comments.map((comment, index) => (
                <div key={index}>
                    <p>{comment.text}</p>
                    <p>{comment.creation_date}</p>
                </div>
            ))}
        </div>
    );
}

export default Comments;