const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
// const numberProgressStart = document.getElementById('number-progress-start')
// let numberProgressEnd = document.getElementById('number-progress-end')
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const playList = JSON.parse(localStorage.getItem('playlist')) ?? [{
    songName: 'Smart',
    artist: 'Lee Serafim',
    file: 'LE SSERAFIM Smart',
    duration: '-02:46',
    liked: false
}, {
    songName: 'Maniac',
    artist: 'VIVIZ',
    file: 'VIVIZ MANIAC',
    duration: '-03:15',
    liked: false
}, {
    songName: 'Drama',
    artist: 'Aespa',
    file: 'aespa Drama',
    duration: '-03:35',
    liked: false
}, {
    songName: 'Born to be',
    artist: 'ITZY',
    file: 'ITZY BORN TO BE',
    duration: '-02:58',
    liked: false
}]

let sortedPlaylist = [...playList]

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
};

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
};

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    };
};

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart')
        likeButton.querySelector('.bi').classList.add('bi-heart-fill')
        likeButton.classList.add('button-active')
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart')
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill')
        likeButton.classList.remove('button-active')
    };
};

function initializeSong() {
    cover.src = `imagens/${sortedPlaylist[index].file}.webp`
    song.src = `songs/${sortedPlaylist[index].file}.mp3`
    songName.innerText = sortedPlaylist[index].songName
    bandName.innerText = sortedPlaylist[index].artist
    // numberProgressStart.innerText = '00:00'
    // numberProgressEnd.innerText = sortedPlaylist[index].duration
    likeButtonRender();
};

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
    };
    initializeSong();
    playSong();
};

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
    };
    initializeSong();
    playSong();
};

function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);


    // function readableDuration(seconds) {
    //     sec = Math.floor(seconds);
    //     min = Math.floor(sec / 60);
    //     min = min >= 10 ? min : '0' + min;
    //     sec = Math.floor(sec % 60);
    //     sec = sec >= 10 ? sec : '0' + sec;
    //     return `${min}:${sec}`
    // }

    // numberProgressStart.innerText = readableDuration(song.currentTime);
    // let numberProgress = song.duration - song.currentTime;
    // numberProgressEnd.innerText = `-${readableDuration(numberProgress)}`;
};

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime
};

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length; // Tamanho do array
    let currentIndex = size - 1; // Posição do último elemento do array
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size); // Sorteia um numero maior ou igual a 0 e menor que 1
        let aux = preShuffleArray[currentIndex]; // Salva o valor do último elemento do array
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex]; // Adiciona no array na posição do index o número que foi sorteado
        preShuffleArray[randomIndex] = aux; // Retorna a cópia do valor anterior salvo do array
        currentIndex -= 1; // Reduz a possição do index do array para a próxima interação
    };
};

function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active')
    } else {
        isShuffled = false;
        sortedPlaylist = [...playList]
        shuffleButton.classList.remove('button-active')
    };
};

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active')
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active')
    };
};

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    };
};

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60)
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60)
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

function updateTotalTime() {
    toHHMMSS(song.duration)
    totalTime.innerText = toHHMMSS(song.duration);
};


function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false
    };
    likeButtonRender();   
    localStorage.setItem(
        'playlist',
        JSON.stringify(playList)
    );
};

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);