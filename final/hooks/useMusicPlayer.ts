import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'

export function useMusicPlayer(source: any) {
  const player = useAudioPlayer(source)
  const status = useAudioPlayerStatus(player)

  const isPlaying = !!status?.playing
  const position = status?.currentTime ?? 0
  const duration = status?.duration ?? 0

  const play = () => player.play()
  const pause = () => player.pause()
  const togglePlay = () => {
    isPlaying ? pause() : play()
  }
  const seekTo = (time: number) => {
    player.seekTo(time)
  }
  const skip = (offset: number) => {
    const target = Math.min(Math.max(0, position + offset), duration)
    player.seekTo(target)
  }
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? '0' + s : s}`
  }

  return {
    isPlaying,
    position,
    duration,
    togglePlay,
    skip,
    seekTo,
    formatTime,
  }
}
