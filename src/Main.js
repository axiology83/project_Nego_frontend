import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const images1 = [
  {
    original: "/img/slides/001.png",
    thumbnail: "/img/slides/001.png",
  },
  {
    original: "/img/slides/002.png",
    thumbnail: "/img/slides/002.png",
  },
  {
    original: "/img/slides/003.png",
    thumbnail: "/img/slides/003.png",
  },
  {
    original: "/img/slides/004.png",
    thumbnail: "/img/slides/004.png",
  },

  {
    original: "/img/slides/005.png",
    thumbnail: "/img/slides/005.png",
  },
  {
    original: "/img/slides/006.png",
    thumbnail: "/img/slides/006.png",
  },
  {
    original: "/img/slides/007.png",
    thumbnail: "/img/slides/007.png",
  },
  {
    original: "/img/slides/008.png",
    thumbnail: "/img/slides/008.png",
  },
  {
    original: "/img/slides/chat-animation.gif",
    thumbnail: "/img/slides/chat-animation.gif",
  },
  {
    original: "/img/slides/009.png",
    thumbnail: "/img/slides/009.png",
  },
  {
    original: "/img/slides/010.png",
    thumbnail: "/img/slides/010.png",
  },
  {
    original: "/img/slides/011.png",
    thumbnail: "/img/slides/011.png",
  },
 
  {
    original: "/img/slides/012.png",
    thumbnail: "/img/slides/012.png",
  },
  {
    original: "/img/slides/013.png",
    thumbnail: "/img/slides/013.png",
  },
  {
    original: "/img/slides/014.png",
    thumbnail: "/img/slides/014.png",
  },
];

function Main() {
  return (
    <div>
      <div style={{widhth: '1080px', textAlign: 'center'}}>
      <h1>
        테스트용 ID: jwy@0 <br/>
        테스트용 비밀번호: 1<br/>
        위 계정으로 로그인 하고 이 프로젝트의 기능들을 살펴보세요
       
        
      </h1>
      </div>
      <div style={{display: 'inline-flex'}}>
      <ImageGallery items={images1} />
      </div>
    </div>
  );
}

export default Main;
