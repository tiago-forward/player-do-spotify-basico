const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress')
const numberProgressStart = document.getElementById('number-progress-start')
let numberProgressEnd = document.getElementById('number-progress-end')

let isPlaying = false;

const playList = [{
    songName: 'Smart',
    artist: 'Lee Serafim',
    file: 'LE SSERAFIM Smart',
    duration: '-02:46'
}, {
    songName: 'Maniac',
    artist: 'VIVIZ',
    file: 'VIVIZ MANIAC',
    duration: '-03:15'
}, {
    songName: 'Drama',
    artist: 'Aespa',
    file: 'aespa Drama',
    duration: '-03:35'
}, {
    songName: 'Born to be',
    artist: 'ITZY',
    file: 'ITZY BORN TO BE',
    duration: '-02:58'
}]

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

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    } else {
        playSong();
    }
};

function initializeSong(){
    cover.src = `imagens/${playList[index].file}.webp`
    song.src = `songs/${playList[index].file}.mp3`
    songName.innerText = playList[index].songName
    bandName.innerText = playList[index].artist
    numberProgressStart.innerText = '00:00'
    numberProgressEnd.innerText = playList[index].duration
};

function previousSong(){
    if(index === 0){
        index = playList.length - 1;
    } else {
        index -= 1;
    };
    initializeSong();
    playSong();
};

function nextSong(){
    if(index === playList.length - 1){
        index = 0;
    } else {
        index += 1;
    };
    initializeSong();
    playSong();
};

function updateProgressBar(){
    function readableDuration(seconds) {
        sec = Math.floor( seconds );    
        min = Math.floor( sec / 60 );
        min = min >= 10 ? min : '0' + min;    
        sec = Math.floor( sec % 60 );
        sec = sec >= 10 ? sec : '0' + sec;
        return `${min}:${sec}`
    }
    
    const barWidth = (song.currentTime / song.duration)*100
    currentProgress.style.setProperty('--progress', `${barWidth}%`) 
    
    numberProgressStart.innerText = readableDuration(song.currentTime);
    let numberProgress = song.duration - song.currentTime
    numberProgressEnd.innerText = `-${readableDuration(numberProgress)}`;
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar)