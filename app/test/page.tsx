import React from "react";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}



export default async function PostsPage() {
const posts = await getPosts();
  return (
    <main>
      <h1>Posts archive</h1>
      <ol>
        {posts.map((post:any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </main>
  );
}