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

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const btnNextSong = $(".btn-next");
const btnPrevSong = $(".btn-prev");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,
  isPlaying: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Noi Nay Co Anh",
      singer: "Son Tung Mtp",
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
      name: "Shape of you",
      singer: "Ed",
      path: "./assets/music/song3.mp3",
      image: "assets/img/image3.jpg",
    },
    {
      name: "Lily",
      singer: "Alan Walker",
      path: "./assets/music/song4.mp3",
      image: "assets/img/image4.jpg",
    },
    {
      name: "Sugar",
      singer: "Maroon5",
      path: "./assets/music/song5.mp3",
      image: "assets/img/image5.jpg",
    },
    {
      name: "Proud of you",
      singer: "Fiona Fung",
      path: "./assets/music/song6.mp3",
      image: "assets/img/image6.jpg",
    },
  ],
  setConfig: function(key,value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
  },
  render: function () {
    const hmtls = this.songs.map((song,index) => {
      return `
            <div class="song ${index === this.currentIndex ? 'active' : ''} " data-index= "${index}">
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
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

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
        cdThumbAnimate.play();
        _this.isPlaying = true;
        player.classList.add("playing");
      };

      // Khi song on pause
      audio.onpause = function () {
        cdThumbAnimate.pause();
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

      // Next song
      btnNextSong.onclick = function () {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.nextSong();
        }
        audio.play();
        _this.render()
        _this.ScrollActiveSong()
      };
      
      // Previous song
      btnPrevSong.onclick = function () {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.prevSong();
        }
        audio.play();
        _this.render()
        _this.ScrollActiveSong()
      };

      // Random bai hat
      btnRandom.onclick = function (e) {
        _this.isRandom = !_this.isRandom;
        _this.setConfig('isRandom', _this.isRandom)
        btnRandom.classList.toggle("active", _this.isRandom);
      };

      // Repeat bai hat
      btnRepeat.onclick = function (e) {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig('isRepeat', _this.isRepeat)
        btnRepeat.classList.toggle("active", _this.isRepeat);
      };

      // Khi kết thúc một bài hát
      audio.onended = function(e) {
        if(_this.isRepeat) {
          audio.play()
        } else {
          btnNextSong.click()
        }
      }

      // Lắng nghe hành vi click vào playlist
      playlist.onclick = function(e) {
        const songNode = e.target.closest('.song:not(.active)') 

        if (songNode || e.target.closest('.option')) {

          // Click vào song 
          if(songNode) {
            _this.currentIndex = Number(songNode.dataset.index)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
          }

          // Click vào option
          if(e.target.closest('.option')) {
            console.log("sduhfjas")

          }

        }
      }
    };
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  ScrollActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    },100)
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.background = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function() {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    // console.log(_this.songs.length)
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    } while (newIndex === app.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
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

    // Hien thi trang thai config
    btnRandom.classList.toggle("active", _this.isRandom);
    btnRepeat.classList.toggle("active", _this.isRepeat);
  },
};

app.start();

