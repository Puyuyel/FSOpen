import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} >
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {
        visible &&
        <>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {
            currentUser.username === blog.user.username &&
            <button onClick={() => handleRemove(blog.id)}>remove</button>
          }
        </>
      }
    </div>
  )
}

export default Blog