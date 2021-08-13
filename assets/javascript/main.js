const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $(".cd")
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')


const app = {
  currentIndex: 0,
  songs: [
    {
      name: "See you again",
      singer: "Charlie Puth",
      path: "./assets/music/song1.mp3",
      image: "assets/img/image1.jpg",
    },
    {
      name: "Photograh",
      singer: "Ed",
      path: "./assets/music/song2.mp3",
      image: "assets/img/image2.jfif",
    },
    {
      name: "Perfect",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
    {
      name: "Perfect",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
    {
      name: "Perfect",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
    {
      name: "Perfect",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
    {
      name: "Perfect",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
    {
      name: "Perfect",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
  ],
  render: function () {
    const hmtls = this.songs.map((song) => {
      return `
            <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                    </div>
                    `;
    });
    $(".playlist").innerHTML = hmtls.join("");
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;

    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    };
  },
  defineProperties: function() {
      Object.defineProperty(this, 'currentSong',{
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
  },
  loadCurrentSong: function(){
  },
  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin đầu tiên vào IU khi chạy ứng dụng
    this.loadCurrentSong()

    // Render playlist
    this.render();
  },
};

app.start();

console.log(app.songs[0]);
