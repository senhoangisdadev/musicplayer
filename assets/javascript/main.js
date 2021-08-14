// 1.Render songs
// 2.Scroll top
// 3.Play / pause / seek
// 4.CD rotate
// 5.Next / prev
// 6.Random
// 7.Next / repeat then end
// 8.Active song
// 9.Scroll active song into view
// 10.Play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");

const app = {
  currentIndex: 0,
  isPlaying: false,
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
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý đĩa CD quay \ dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, //10s
      iterations: Infinity
    });
    cdThumbAnimate.pause()

    // Hàm xử  lý phóng to thu nhỏ
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    };

    // Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      // Khi song on playing
      audio.onplaying = function () {
        cdThumbAnimate.play()
        _this.isPlaying = true;
        player.classList.add("playing");
      };

      // Khi song on pause
      audio.onpause = function () {
        cdThumbAnimate.pause()
        _this.isPlaying = false;
        player.classList.remove("playing");
      };

      // Tiến độ bài hát
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = progressPercent;
        }
      };

      // Xử lý tua
      progress.onchange = function (e) {
        const seek = (audio.duration / 100) * e.target.value;
        audio.currentTime = seek;
      };
    };
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.background = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function() {
    this.currentIndex++
  },
  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin đầu tiên vào IU khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();
  },
};

app.start();

// console.log(app.songs[0]);
