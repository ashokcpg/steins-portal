import React from "react";
/**
 * @param  {} {photoInfo "Photo Info"
 * @param  {} photoDescription "Photo Description"
 * @param  {} publishedDate "Published Date"
 * @param  {} file} "File URL"
 */
function PolaroidImage({ photoDescription, publishedDate, file, ...props }) {
  return (<div class="polaroid w-full" {...props} >
    <div className="single-day-regular caption">{photoDescription || 'Your Description'}</div>
    <p className='single-day-regular-italic'>{publishedDate || '2004-12-13'}</p>
    <img src={file} alt="asd" {...props} />
  </div>);
}


export function PolaroidImageAuth({ photoDescription, publishedDate, file}) {
  return (<div class="polaroid w-72">
    <div className="single-day-regular caption">{photoDescription || 'Your Description'}</div>
    <p className='single-day-regular-italic'>{publishedDate || '2004-12-13'}</p>
    <img src={file} alt="asd"/>
  </div>);
}

export default PolaroidImage