import React from 'react';
import { API } from '../../backend';

const Image=({product})=>{
    const url = product ? `${API}/product/photo/${product._id}`: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqWdYq4VfkBHYVEIXU5VLOgCl9ofe2xHytnA&usqp=CAU`
    return(
        <div className="rounded border border-success p-2">
        <img
          src={url}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    );
}
export default Image;