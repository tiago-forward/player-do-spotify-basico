const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress')

const asSmart = {
    songName: 'Smart',
    artist: 'Lee Serafim',
    file: 'LE SSERAFIM Smart'
};

const asManiac = {
    songName: 'Maniac',
    artist: 'VIVIZ',
    file: 'VIVIZ MANIAC'
};

const asDrama = {
    songName: 'Drama',
    artist: 'Aespa',
    file: 'aespa Drama'
};

const asBornToBe = {
    songName: 'Born to be',
    artist: 'ITZY',
    file: 'ITZY BORN TO BE'
};

let isPlaying = false;
const playList = [asSmart, asManiac, asDrama, asBornToBe];
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
    // song.currentTime //tempo atual da música em segundos
    // song.duration //duração total da música em segundos
    const barWidth = (song.currentTime / song.duration)*100
    currentProgress.style.setProperty('--progress', `${barWidth}%`) 
};

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar)